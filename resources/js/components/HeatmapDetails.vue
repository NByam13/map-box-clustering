<script setup lang="ts">
// No props needed for this component
</script>

<template>
  <div class="mt-6 space-y-6">
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Heatmap Vector Tileset Technology</h4>
      <p class="text-gray-600 mt-2">
        Heatmaps in Mapbox are created using the same underlying vector tileset technology as other 
        visualizations, but with specialized rendering techniques. The vector data points are processed 
        and rendered as a continuous surface of color intensity rather than discrete points or clusters.
      </p>
      <p class="text-gray-600 mt-2">
        Unlike clustered or unclustered views that directly represent individual properties, heatmaps 
        transform the point data into a density visualization. The vector tileset stores the original 
        point data, which is then processed on the client side using Mapbox GL JS to generate the 
        heatmap effect based on configurable parameters like radius, intensity, and color gradients.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Dynamic Styling and Data Transformation</h4>
      <p class="text-gray-600 mt-2">
        One of the key advantages of using vector tiles for heatmaps is the ability to dynamically 
        adjust the visualization without reloading the underlying data. The same vector tileset can 
        be styled in multiple ways:
      </p>
      <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
        <li>Adjusting the heatmap radius to show broader or more focused density patterns</li>
        <li>Changing the color gradient to emphasize different aspects of the data</li>
        <li>Modifying the intensity to highlight or downplay certain density levels</li>
        <li>Combining the heatmap with other layers like property points or boundaries</li>
      </ul>
      <p class="text-gray-600 mt-2">
        This flexibility allows users to explore different aspects of the same dataset without 
        requiring multiple data sources or server-side processing.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Multi-Purpose Data Utilization</h4>
      <p class="text-gray-600 mt-2">
        The vector tileset used for heatmap visualization can be leveraged for multiple purposes 
        beyond just displaying property density:
      </p>
      <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
        <li>Identifying property hotspots and market concentration areas</li>
        <li>Analyzing spatial patterns and trends in property distribution</li>
        <li>Comparing density across different regions or time periods</li>
        <li>Supporting decision-making for property investment or development</li>
        <li>Providing context for individual property evaluations</li>
      </ul>
      <p class="text-gray-600 mt-2">
        By using the same underlying data with different styling approaches, the heatmap 
        visualization can serve both analytical and exploratory purposes, helping users 
        gain insights from different perspectives.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Pros and Cons of Heatmap Visualization</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h5 class="font-medium text-gray-700">Advantages</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Provides an intuitive visualization of property density</li>
            <li>Efficiently handles large datasets with many overlapping points</li>
            <li>Allows for dynamic styling without data reloading</li>
            <li>Supports multiple analytical perspectives with the same data</li>
            <li>Works well at various zoom levels to show both local and regional patterns</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Limitations</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Does not show individual property details directly</li>
            <li>May be less precise than point-based visualizations for specific locations</li>
            <li>Requires careful parameter tuning for optimal visualization</li>
            <li>Can be computationally intensive for very large datasets</li>
            <li>May not effectively represent discrete property boundaries or classifications</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 