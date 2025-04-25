<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import VisualizationSelector from './VisualizationSelector.vue';
import Header from './Header.vue';
import Legend from './Legend.vue';

const props = defineProps({
    accessToken: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['mode-changed']);

const mapContainer = ref<HTMLElement|null>(null);
const map = ref<mapboxgl.Map|null>(null);
const visualizationMode = ref('unclustered'); // 'clustered', 'unclustered', or 'heatmap'
const currentZoom = ref(3); // Track current zoom level

// Function to update visualization mode
const updateVisualizationMode = (newMode: string) => {
    if (!map.value) return;

    visualizationMode.value = newMode;
    updateLayerVisibility();

    // Emit the mode change to the parent component
    const modeLabel = visualizationMode.value === 'clustered' ? 'Clustered' :
                      visualizationMode.value === 'unclustered' ? 'Unclustered' : 'Heatmap';
    emit('mode-changed', { id: visualizationMode.value, label: modeLabel });
};

// Function to update layer visibility based on current zoom and visualization mode
const updateLayerVisibility = () => {
    if (!map.value) return;

    const isHighZoom = currentZoom.value >= 10;

    if (visualizationMode.value === 'clustered') {
        if (isHighZoom) {
            // At high zoom, use unclustered data for clustered view
            map.value.setLayoutProperty('clustered-points', 'visibility', 'none');
            map.value.setLayoutProperty('unclustered-point', 'visibility', 'visible');
            map.value.setLayoutProperty('heatmap-layer', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-clustered', 'visibility', 'visible');
            map.value.setLayoutProperty('high-zoom-heatmap', 'visibility', 'none');
        } else {
            // At low zoom, use clustered data
            map.value.setLayoutProperty('clustered-points', 'visibility', 'visible');
            map.value.setLayoutProperty('unclustered-point', 'visibility', 'none');
            map.value.setLayoutProperty('heatmap-layer', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-clustered', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-heatmap', 'visibility', 'none');
        }
    } else if (visualizationMode.value === 'unclustered') {
        // Always show unclustered points for unclustered mode
        map.value.setLayoutProperty('clustered-points', 'visibility', 'none');
        map.value.setLayoutProperty('unclustered-point', 'visibility', 'visible');
        map.value.setLayoutProperty('heatmap-layer', 'visibility', 'none');
        map.value.setLayoutProperty('high-zoom-clustered', 'visibility', 'none');
        map.value.setLayoutProperty('high-zoom-heatmap', 'visibility', 'none');
    } else if (visualizationMode.value === 'heatmap') {
        if (isHighZoom) {
            // At high zoom, use unclustered data for heatmap
            map.value.setLayoutProperty('clustered-points', 'visibility', 'none');
            map.value.setLayoutProperty('unclustered-point', 'visibility', 'none');
            map.value.setLayoutProperty('heatmap-layer', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-clustered', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-heatmap', 'visibility', 'visible');
        } else {
            // At low zoom, use clustered data for heatmap
            map.value.setLayoutProperty('clustered-points', 'visibility', 'none');
            map.value.setLayoutProperty('unclustered-point', 'visibility', 'none');
            map.value.setLayoutProperty('heatmap-layer', 'visibility', 'visible');
            map.value.setLayoutProperty('high-zoom-clustered', 'visibility', 'none');
            map.value.setLayoutProperty('high-zoom-heatmap', 'visibility', 'none');
        }
    }

    // Force a repaint of the map
    map.value.triggerRepaint();
};

// Initialize map when component is mounted
onMounted(() => {
    const username = import.meta.env.VITE_MAPBOX_USERNAME
    mapboxgl.accessToken = props.accessToken;

    const mapbox = new mapboxgl.Map({
        container: mapContainer.value ?? '',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 54], // Center on UK
        zoom: 4,
        projection: 'mercator',
    });

    // Wait for the map to load before adding the data layer
    mapbox.on('load', () => {
        if (!mapbox) {
            return
        }
        // Add the clustered vector tileset source
        mapbox.addSource('vector-points', {
            type: 'vector',
            url: `mapbox://${username}.data`, // Clustered tileset ID
            minzoom: 0,
            maxzoom: 16,
            promoteId: 'id', // Ensure unique IDs for features,
        });

        // Add the unclustered vector tileset source
        mapbox.addSource('unclustered-points', {
            type: 'vector',
            url: `mapbox://${username}.unclustered`, // Unclustered tileset ID
            minzoom: 0,
            maxzoom: 16,
            promoteId: 'id', // Ensure unique IDs for features
        });

        // Add the clustered points layer from the tileset
        mapbox.addLayer({
            id: 'clustered-points',
            type: 'circle',
            source: 'vector-points',
            'source-layer': 'properties',
            filter: ['has', 'count'],
            paint: {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'count'],
                    100,
                    '#029f48',
                    1000,
                    '#55b453',
                    5000,
                    '#d9bd69',
                    10000,
                    '#a4b3c9',
                    25000,
                    '#294271',
                    50000,
                    '#376741',
                    100000,
                    '#424242',
                ],
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'count'],
                    1, 10,
                    100, 10,
                    1000, 12,
                    5000, 16,
                    10000, 22,
                    25000, 28,
                    50000, 32,
                ],
                'circle-opacity': 0.7,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        });

        // Add the unclustered points layer from the tileset
        mapbox.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'unclustered-points',
            'source-layer': 'properties',
            filter: ['!', ['has', 'count']],
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'classification_id'],
                    1,
                    '#376741',
                    2,
                    '#d9bd69',
                    4,
                    '#294271',
                    5,
                    '#029f48',
                    6,
                    '#424242',
                    7,
                    '#a4b3c9',
                    '#808080', // default color
                ],
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    1,
                    2, // At zoom level 1, size is 2px
                    5,
                    4, // At zoom level 5, size is 4px
                    10,
                    6, // At zoom level 10, size is 6px
                    15,
                    8, // At zoom level 15, size is 8px
                ],
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff',
                'circle-opacity': 0.7,
            },
            layout: {
                visibility: 'none', // Initially hidden
            },
        });

        // Add high-zoom clustered layer (using unclustered data)
        mapbox.addLayer({
            id: 'high-zoom-clustered',
            type: 'circle',
            source: 'unclustered-points',
            'source-layer': 'properties',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'classification_id'],
                    1,
                    '#376741',
                    2,
                    '#d9bd69',
                    4,
                    '#294271',
                    5,
                    '#029f48',
                    6,
                    '#424242',
                    7,
                    '#a4b3c9',
                    '#808080', // default color
                ],
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    4,
                    12,
                    6,
                    14,
                    8,
                    16,
                    10,
                ],
                'circle-opacity': 0.7,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff',
            },
            layout: {
                visibility: 'none', // Initially hidden
            },
        });

        // Add heatmap layer
        mapbox.addLayer({
            id: 'heatmap-layer',
            type: 'heatmap',
            source: 'vector-points',
            'source-layer': 'properties',
            paint: {
                // Increase the heatmap weight based on point count
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'count'],
                    0, 0,
                    100, 0.5,
                    1000, 1,
                    5000, 2,
                    10000, 3,
                    25000, 4,
                    50000, 5,
                    100000, 6
                ],
                // Increase the heatmap color weight by zoom level
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 0.5,
                    5, 1,
                    10, 1.5,
                    15, 2
                ],
                // Color ramp for heatmap. Domain is 0 (low) to 1 (high).
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0, 10,
                    5, 40,
                    10, 50,
                    15, 60
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': 0.6
            },
            layout: {
                visibility: 'none', // Initially hidden
            }
        });

        // Add high-zoom heatmap layer (using unclustered data)
        mapbox.addLayer({
            id: 'high-zoom-heatmap',
            type: 'heatmap',
            source: 'unclustered-points',
            'source-layer': 'properties',
            paint: {
                // Set a constant weight for all points at high zoom
                'heatmap-weight': 1,
                // Increase the heatmap color weight by zoom level
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10, 1,
                    12, 1.5,
                    14, 2,
                    16, 2.5
                ],
                // Color ramp for heatmap. Domain is 0 (low) to 1 (high).
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10, 15,
                    12, 20,
                    14, 25,
                    16, 30
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': 0.6
            },
            layout: {
                visibility: 'none', // Initially hidden
            }
        });

        // Add click handlers for clusters
        mapbox.on('click', 'clustered-points', (e) => {
            const features = mapbox.queryRenderedFeatures(e.point, {
                layers: ['clustered-points'],
            });

            if (features.length > 0) {
                const coordinates = features[0].geometry.coordinates.slice();
                const pointCount = features[0].properties?.count;

                // Create popup content
                const popupContent = document.createElement('div');
                popupContent.innerHTML = `
                    <div class="p-3 bg-white rounded shadow">
                        <h3 class="font-bold text-lg text-gray-900 mb-2">Cluster Information</h3>
                        <div class="space-y-1">
                            <p class="text-gray-800"><span class="font-semibold">Points in cluster:</span> ${pointCount}</p>
                        </div>
                    </div>
                `;

                // Create and show popup
                new mapboxgl.Popup().setLngLat(coordinates).setDOMContent(popupContent).addTo(mapbox);
            }
        });

        // Add click handlers for unclustered points
        mapbox.on('click', 'unclustered-point', (e) => {
            const coordinates = e.features?.[0].geometry.coordinates.slice();
            const classification = e.features?.[0].properties?.classification;

            // Create popup content
            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
                <div class="p-3 bg-white rounded shadow">
                    <h3 class="font-bold text-lg text-gray-900 mb-2">Point Information</h3>
                    <div class="space-y-1">
                        <p class="text-gray-800"><span class="font-semibold">Classification:</span> ${classification}</p>
                    </div>
                </div>
            `;

            // Create and show popup
            new mapboxgl.Popup().setLngLat(coordinates).setDOMContent(popupContent).addTo(mapbox);
        });

        // Add click handlers for high-zoom clustered points
        mapbox.on('click', 'high-zoom-clustered', (e) => {
            const coordinates = e.features?.[0].geometry.coordinates.slice();
            const classification = e.features?.[0].properties?.classification;

            // Create popup content
            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
                <div class="p-3 bg-white rounded shadow">
                    <h3 class="font-bold text-lg text-gray-900 mb-2">Point Information</h3>
                    <div class="space-y-1">
                        <p class="text-gray-800"><span class="font-semibold">Classification ID:</span> ${classification}</p>
                    </div>
                </div>
            `;

            // Create and show popup
            new mapboxgl.Popup().setLngLat(coordinates).setDOMContent(popupContent).addTo(mapbox);
        });

        // Change cursor to pointer when hovering over clusters or points
        mapbox.on('mouseenter', 'clustered-points', () => {
            mapbox.getCanvas().style.cursor = 'pointer';
        });
        mapbox.on('mouseleave', 'clustered-points', () => {
            mapbox.getCanvas().style.cursor = '';
        });

        mapbox.on('mouseenter', 'unclustered-point', () => {
            mapbox.getCanvas().style.cursor = 'pointer';
        });
        mapbox.on('mouseleave', 'unclustered-point', () => {
            mapbox.getCanvas().style.cursor = '';
        });

        mapbox.on('mouseenter', 'high-zoom-clustered', () => {
            mapbox.getCanvas().style.cursor = 'pointer';
        });
        mapbox.on('mouseleave', 'high-zoom-clustered', () => {
            mapbox.getCanvas().style.cursor = '';
        });

        // Listen for zoom changes to update layer visibility
        mapbox.on('zoom', () => {
            currentZoom.value = mapbox.getZoom();
            updateLayerVisibility();
        });

        map.value = mapbox

        // Initialize layer visibility based on current zoom
        updateLayerVisibility();
    });
});

// Clean up when component is unmounted
onUnmounted(() => {
    if (map.value) {
        map.value.remove();
    }
});
</script>

<template>
    <div class="app-container">
        <Header />
        <div class="content-container">
            <div class="map-wrapper">
                <div ref="mapContainer" class="map-container"></div>
                <VisualizationSelector v-model:mode="visualizationMode" @update:mode="updateVisualizationMode" />
                <Legend :mode="visualizationMode" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
}

.content-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.map-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 600px;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #ffffff; /* $background-color-white */
}

.map-container {
    width: 100%;
    height: 100%;
}
</style>
