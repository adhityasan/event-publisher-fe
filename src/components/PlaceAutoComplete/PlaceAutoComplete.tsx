import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input, AutoComplete } from 'antd';

interface IPlaceAutoComplete {
  onSelect: (place: string) => void;
}

const PlaceAutoComplete: React.FC<IPlaceAutoComplete> = ({ onSelect }) => {
  const [value, setValue] = useState<string>('');
  const handleSelect = (place: string) => {
    setValue(place);
    onSelect(place);
  };
  return (
    <PlacesAutocomplete value={value} onChange={(val: string) => setValue(val)}>
      {({ getInputProps, suggestions, loading }) => (
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth
          style={{ width: '100%' }}
          options={suggestions.map((sugg) => ({ label: sugg.description, value: sugg.description }))}
          onSelect={handleSelect}
        >
          <Input.Search
            style={{ width: '100%' }}
            loading={loading}
            {...getInputProps({
              placeholder: 'Search Places...',
              className: 'location-search-input'
            })}
          />
        </AutoComplete>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutoComplete;
