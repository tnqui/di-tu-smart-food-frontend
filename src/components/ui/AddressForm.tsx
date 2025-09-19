'use client';

import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {Input} from '@/components/ui/input';

type Suggestion = {
    id: string;
    place_name: string;
    center: [number, number];
    [key: string]: any;
};

interface AddressAutocompleteProps {
    onSelect?: (place: Suggestion) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({onSelect}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(false);

    // ✅ Debounced API call
    const fetchSuggestions = useCallback(
        debounce(async (input: string) => {
            if (input.trim().length < 3) {
                setSuggestions([]);
                return;
            }

            setIsLoading(true);
            try {
                const {data} = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json`,
                    {
                        params: {
                            access_token: MAPBOX_TOKEN,
                            autocomplete: true,
                            limit: 5,
                            language: 'vi',
                        },
                    }
                );
                setSuggestions(data.features || []);
            } catch (error) {
                console.error('Lỗi khi fetch gợi ý:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    // ✅ Trigger fetchSuggestions when input changes and not selected
    useEffect(() => {
        if (!selected && query.trim()) {
            fetchSuggestions(query);
        } else if (!query.trim()) {
            setSuggestions([]);
            fetchSuggestions.cancel();
        }

        return () => {
            fetchSuggestions.cancel(); // cleanup
        };
    }, [query, selected, fetchSuggestions]);

    // ✅ Khi chọn một gợi ý
    const handleSelect = (place: Suggestion) => {
        setQuery(place.place_name);
        setSuggestions([]);
        setSelected(true);
        onSelect?.(place);
    };

    // ✅ Khi người dùng nhập
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Reset selected state when user modifies the input
        if (selected) {
            setSelected(false);
        }
    };

    // Handle clicking outside to close suggestions
    const handleBlur = () => {
        // Delay hiding suggestions to allow for click events
        setTimeout(() => {
            setSuggestions([]);
        }, 150);
    };

    return (
        <div style={{position: 'relative'}}>
            <Input
                type="text"
                placeholder="Nhập địa chỉ..."
                value={query}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />

            {isLoading && query.trim() && !selected && (
                <div
                    className="absolute left-0 top-full mt-1 text-sm text-gray-500 bg-white px-2 py-1 border border-gray-300 rounded shadow-sm">
                    Đang tải...
                </div>
            )}

            {!selected && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-auto rounded shadow-lg">
                    {suggestions.map((place) => (
                        <li
                            key={place.id}
                            onClick={() => handleSelect(place)}
                            className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            {place.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;