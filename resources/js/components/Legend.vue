<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    mode: {
        type: String,
        required: true,
    },
});

const clusteredLegendItems = [
    { count: '100', color: '#029f48', label: '100 points' },
    { count: '1,000', color: '#55b453', label: '1,000 points' },
    { count: '5,000', color: '#d9bd69', label: '5,000 points' },
    { count: '10,000', color: '#a4b3c9', label: '10,000 points' },
    { count: '25,000', color: '#294271', label: '25,000 points' },
    { count: '50,000', color: '#376741', label: '50,000 points' },
    { count: '100,000+', color: '#424242', label: '100,000+ points' },
];

const unclusteredLegendItems = [
    { id: 1, color: '#376741', label: 'Comparison' },
    { id: 2, color: '#d9bd69', label: 'Convenience' },
    { id: 4, color: '#294271', label: 'Leisure' },
    { id: 5, color: '#029f48', label: 'Miscellaneous' },
    { id: 6, color: '#424242', label: 'Non-retail' },
    { id: 7, color: '#a4b3c9', label: 'Service' },
];

const showLegend = computed(() => {
    return props.mode === 'clustered' || props.mode === 'unclustered';
});

const legendItems = computed(() => {
    return props.mode === 'clustered' ? clusteredLegendItems : unclusteredLegendItems;
});
</script>

<template>
    <div v-if="showLegend" class="legend-container">
        <div class="legend-content">
            <h3 class="legend-title">Legend</h3>
            <div class="legend-items">
                <div v-for="item in legendItems" :key="item.count || item.id" class="legend-item">
                    <div class="color-box" :style="{ backgroundColor: item.color }"></div>
                    <span class="legend-label">{{ item.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.legend-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1;
    max-width: 250px;
}

.legend-content {
    padding: 12px;
}

.legend-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.legend-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.color-box {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #ddd;
}

.legend-label {
    font-size: 12px;
    color: #666;
}
</style>
