<script setup lang="ts">
// No props or state needed for now
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-container">
        <h1 class="app-title">MapBox Tile Set Demo</h1>
      </div>
      <div class="header-description">
        <p>Visualizing Large Datasets</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #234025; /* $brand-green-1 */
  color: #ffffff; /* $ui-white */
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff; /* $ui-white */
}

.header-description {
  font-size: 1rem;
  color: #d9dbe1; /* $footer-text-color-body */
}
</style>
