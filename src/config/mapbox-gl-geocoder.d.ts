declare module '@mapbox/mapbox-gl-geocoder' {
    import {Control, Map, MapboxOptions, LngLatLike, Popup} from 'mapbox-gl';

    interface GeocoderOptions {
        accessToken: string | null | undefined;
        mapboxgl?: typeof import('mapbox-gl');
        marker?: boolean | object;
        placeholder?: string;
        proximity?: LngLatLike;
        flyTo?: boolean | object;
        minLength?: number;
        countries?: string;
        language?: string;
        limit?: number;
        filter?: (item: any) => boolean;
        localGeocoder?: (query: string) => any[];
        reverseGeocode?: boolean;
        trackProximity?: boolean;
        render?: (item: any) => HTMLElement;
        getItemValue?: (item: any) => string;
    }

    class MapboxGeocoder extends Control {
        constructor(options: GeocoderOptions);

        on(type: string, callback: (event: any) => void): this;

        off(type: string, callback: (event: any) => void): this;

        addTo(map: Map): this;

        clear(): this;

        query(value: string): this;

        setProximity(lnglat: LngLatLike): this;

        setLanguage(language: string): this;

        setCountries(countries: string): this;
    }

    export default MapboxGeocoder;
}
