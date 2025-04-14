<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import Map from '@/components/Map.vue';
import VisualizationDetails from '@/components/VisualizationDetails.vue';

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const currentMode = ref({ id: 'unclustered', label: 'Unclustered' });

const handleModeChange = (mode) => {
  currentMode.value = mode;
};
</script>

<template>
    <Head title="Mapbox Clustering Demo" />

    <div class="min-h-screen bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="bg-white rounded-lg shadow">
                    <Map :access-token="mapboxAccessToken" @mode-changed="handleModeChange" />
                </div>
                
                <!-- Visualization Mode Information Section -->
                <VisualizationDetails :current-mode="currentMode" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.map-container {
    position: relative;
    width: 100%;
    border: 1px solid #ccd3de;
}
</style>
