import { ChangeEvent } from "react";

import { LOCATIONS } from "constant";

import "./LocationSelector.css";

interface LocationSelectorProps {
  location: string;
  onChangeLocation: (val: string) => void;
}

export const LocationSelector = ({
  location,
  onChangeLocation,
}: LocationSelectorProps) => {
  const handleChangeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChangeLocation(value);
  };

  return (
    <div className="location-selector">
      <p className="location-selector__title">Location</p>
      <select
        name="location"
        id="location"
        value={location}
        onChange={handleChangeLocation}
      >
        {LOCATIONS.map((location) => (
          <option key={location.value} value={location.value}>
            {location.label}
          </option>
        ))}
        <option value="saab">New York</option>
        <option value="opel">Santa Clara</option>
      </select>
    </div>
  );
};
