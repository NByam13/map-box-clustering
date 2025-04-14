import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Welcome from './Welcome.vue';

// Mock mapbox-gl
vi.mock('mapbox-gl', () => ({
    default: {
        accessToken: '',
        Map: vi.fn().mockImplementation(() => ({
            addControl: vi.fn(),
        })),
        NavigationControl: vi.fn(),
        Marker: vi.fn().mockImplementation(() => ({
            setLngLat: vi.fn().mockReturnThis(),
            addTo: vi.fn(),
        })),
    },
}));

describe('Welcome.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        const wrapper = mount(Welcome, {
            props: {
                canLogin: true,
                canRegister: true,
                laravelVersion: '10.0.0',
                phpVersion: '8.2.0',
            },
        });

        expect(wrapper.find('h1').text()).toBe('MapBox Clustering Demo');
        expect(wrapper.find('h2').text()).toBe('About This Demo');
    });

    it('contains a map container', () => {
        const wrapper = mount(Welcome, {
            props: {
                canLogin: true,
                canRegister: true,
                laravelVersion: '10.0.0',
                phpVersion: '8.2.0',
            },
        });

        const mapContainer = wrapper.find('.map-container');
        expect(mapContainer.exists()).toBe(true);
    });
});
