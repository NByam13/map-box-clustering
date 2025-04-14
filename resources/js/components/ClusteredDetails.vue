<script setup lang="ts">
// No props needed for this component
</script>

<template>
  <div class="mt-6 space-y-6">
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Clustered Tileset Technology</h4>
      <p class="text-gray-600 mt-2">
        In Mapbox, a clustered tileset is a specialized vector tileset that groups nearby points 
        into clusters based on proximity and zoom level. Unlike unclustered tilesets that preserve 
        individual points, clustered tilesets aggregate points into a hierarchical structure.
      </p>
      <p class="text-gray-600 mt-2">
        The clustered data is stored in Mapbox as a vector tileset with special properties. Each 
        cluster contains metadata about the number of points it represents, and at higher zoom 
        levels, clusters break apart to reveal smaller clusters or individual points. This 
        hierarchical structure is pre-computed during the tiling process and stored in the tileset.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Mapbox Clustering Algorithm</h4>
      <p class="text-gray-600 mt-2">
        Mapbox uses a hierarchical clustering algorithm based on the Supercluster library. The 
        algorithm works by:
      </p>
      <ol class="list-decimal pl-5 text-gray-600 mt-2 space-y-1">
        <li>Dividing the world into a grid of cells at each zoom level</li>
        <li>Grouping points that fall within the same cell into clusters</li>
        <li>Creating a tree structure where parent clusters at lower zoom levels contain 
            child clusters at higher zoom levels</li>
        <li>Pre-computing this entire hierarchy during the tiling process</li>
      </ol>
      <p class="text-gray-600 mt-2">
        The algorithm optimizes for both performance and visual clarity, ensuring that clusters 
        are meaningful and that the transition between zoom levels is smooth. The clustering 
        radius can be adjusted to control how aggressively points are grouped together.
      </p>
    </div>
    
    <div>
      <h4 class="text-lg font-semibold text-gray-700">Pros and Cons of Clustered Vector Tiles</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h5 class="font-medium text-gray-700">Advantages</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Significantly reduces visual clutter in dense areas</li>
            <li>Improves performance by reducing the number of rendered objects</li>
            <li>Provides a hierarchical view of data density</li>
            <li>Enables meaningful interaction at different zoom levels</li>
            <li>Works well with extremely large datasets (millions of points)</li>
          </ul>
        </div>
        <div>
          <h5 class="font-medium text-gray-700">Limitations</h5>
          <ul class="list-disc pl-5 text-gray-600 mt-2 space-y-1">
            <li>Loss of individual point precision at lower zoom levels</li>
            <li>Limited ability to style individual points within clusters</li>
            <li>Fixed clustering boundaries that may not align with meaningful geographic regions</li>
            <li>Requires additional client-side logic to handle cluster expansion</li>
            <li>May not be suitable for applications requiring precise point-level interaction</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 