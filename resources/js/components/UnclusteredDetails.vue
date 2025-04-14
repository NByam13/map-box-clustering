<script setup lang="ts">
// No props needed for this component
</script>

<template>
  <div class="mt-6 space-y-6">
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Vector Tileset Technology</h4>
      <p class="text-gray-600 mt-2">
        The unclustered view uses Mapbox Vector Tiles, a compact binary format that efficiently 
        encodes geographic data. Each tile contains vector data (points, lines, polygons) rather 
        than pre-rendered images, allowing for dynamic styling and interaction on the client side.
      </p>
      <p class="text-gray-600 mt-2">
        In this implementation, the unclustered data is stored as a vector tileset in Mapbox, 
        where each point represents a single property with its associated attributes. The tileset 
        is optimized for rendering individual points without clustering, providing precise 
        location data at all zoom levels.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">From GeoJSON to Tilesets</h4>
      <p class="text-gray-600 mt-2">
        Mapbox transforms raw GeoJSON data into optimized vector tiles through a process called 
        tiling. The original GeoJSON data, which might contain millions of points, is processed 
        and divided into a pyramid of tiles at different zoom levels.
      </p>
      <p class="text-gray-600 mt-2">
        For unclustered data, Mapbox preserves individual points across zoom levels, ensuring 
        that each property remains as a distinct entity. This is different from clustered 
        tilesets, where points are aggregated based on proximity and zoom level.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Tileset Delivery and Map Interaction</h4>
      <p class="text-gray-600 mt-2">
        Vector tiles are served to the client in small, rectangular sections that correspond to 
        the current map viewport. As users pan and zoom the map, new tiles are requested and 
        loaded dynamically, ensuring efficient data transfer.
      </p>
      <p class="text-gray-600 mt-2">
        The Mapbox GL JS library handles the rendering of these tiles, applying the styling 
        defined in the map configuration. For unclustered points, each feature can be styled 
        individually based on its properties, and interactive features like hover effects and 
        popups can be implemented for each point.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Pros and Cons of Vector Tiles for Large Datasets</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h5 class="font-medium text-gray-700">Advantages</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Efficient data transfer - only visible tiles are loaded</li>
            <li>Dynamic styling without reloading data</li>
            <li>Interactive features like hover and click events</li>
            <li>Precise rendering at all zoom levels</li>
            <li>Reduced server load compared to rendering on the server</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Challenges</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Performance issues with extremely large datasets</li>
            <li>Visual clutter when many points overlap</li>
            <li>Increased client-side processing for rendering</li>
            <li>Limited by browser memory constraints</li>
            <li>May require simplification at lower zoom levels</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 