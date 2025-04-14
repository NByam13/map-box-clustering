<script setup lang="ts">
import UnclusteredDetails from './UnclusteredDetails.vue';
import ClusteredDetails from './ClusteredDetails.vue';
import HeatmapDetails from './HeatmapDetails.vue';

defineProps({
  currentMode: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value.id === 'string' && typeof value.label === 'string';
    }
  }
});
</script>

<template>
  <div class="mt-6 bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ currentMode.label }} Visualization
    </h2>
    
    <div class="prose max-w-none">
      <p class="text-gray-600">
        This visualization displays property data using the {{ currentMode.label.toLowerCase() }} view. 
        The map shows the distribution of properties across different regions, with each point 
        representing a property location.
      </p>
      
      <div v-if="currentMode.id === 'clustered'" class="mt-4">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">About Clustered View</h3>
        <p class="text-gray-600">
          The clustered view groups nearby properties together to reduce visual clutter. 
          The size and color of each cluster indicate the number of properties it contains. 
          Click on a cluster to see more details about the properties within it.
        </p>
        
        <ClusteredDetails />
      </div>
      
      <div v-if="currentMode.id === 'unclustered'" class="mt-4">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">About Unclustered View</h3>
        <p class="text-gray-600">
          The unclustered view shows each property as an individual point on the map. 
          This provides a detailed view of property locations, though it may become crowded 
          in areas with many properties. Each point is color-coded based on its classification.
        </p>
        
        <UnclusteredDetails />
      </div>
      
      <div v-if="currentMode.id === 'heatmap'" class="mt-4">
        <h3 class="text-xl font-semibold text-gray-700 mb-2">About Heatmap View</h3>
        <p class="text-gray-600">
          The heatmap view visualizes property density using color intensity. Areas with 
          higher property concentrations appear as "hotter" (more red), while areas with 
          fewer properties appear as "cooler" (more blue). This helps identify property 
          hotspots at a glance.
        </p>
        
        <HeatmapDetails />
      </div>
    </div>
  </div>
</template> 