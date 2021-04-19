import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { primary } from '../../assets/theme/colors';

interface IPlaceAutoComplete {
  value?: {
    label: string;
    value: any;
  };
  onSelect: (place: any) => void;
}

const PlaceAutoComplete: React.FC<IPlaceAutoComplete> = ({ onSelect, value }) => {
  return (
    <GooglePlacesAutocomplete
      selectProps={{
        value: value,
        onChange: (option: any) => {
          onSelect(option);
        },
        isClearable: true,
        styles: {
          control: (provided: any) => ({
            ...provided,
            borderRadius: '0px',
            boxShadow: 'none',
            ':hover': {
              borderColor: primary,
              boxShadow: '0 0 0 2px rgb(102 93 245 / 20%)'
            }
          })
        },
        placeholder: 'Search Place'
      }}
    />
  );
};

export default PlaceAutoComplete;
