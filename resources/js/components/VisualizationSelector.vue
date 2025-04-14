<script setup lang="ts">

defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ['clustered', 'unclustered', 'heatmap'].includes(value)
  }
});

const emit = defineEmits(['update:mode']);

const updateMode = (newMode) => {
  emit('update:mode', newMode);
};

const modes = [
  { id: 'unclustered', label: 'Unclustered'},
  { id: 'clustered', label: 'Clustered'},
  { id: 'heatmap', label: 'Heatmap'}
];
</script>

<template>
  <div class="visualization-selector">
    <div class="selector-container">
      <button
        v-for="modeOption in modes"
        :key="modeOption.id"
        @click="updateMode(modeOption.id)"
        class="mode-button"
        :class="[
          mode === modeOption.id
            ? 'mode-button-active'
            : 'mode-button-inactive'
        ]"
      >
        <span class="font-semibold">{{ modeOption.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.visualization-selector {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.selector-container {
  display: flex;
  gap: 0.5rem;
  background-color: #ffffff; /* $background-color-white */
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
}

.mode-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  min-width: 100px;
}

.mode-button-active {
  background-color: #029f48; /* $brand-green-2 */
  color: #ffffff; /* $ui-white */
  box-shadow: 0 2px 4px rgba(2, 159, 72, 0.2);
}

.mode-button-inactive {
  background-color: #f5f6f8; /* $background-color-default */
  color: #424540; /* $text-color-body */
}

.mode-button-inactive:hover {
  background-color: #f4fbf3; /* $background-color-green */
}

.mode-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}
</style>
