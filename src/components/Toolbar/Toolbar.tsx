import { DateRanger } from "./DateRanger";
import { LocationSelector } from "./LocationSelector";

import "./Toolbar.css";

interface ToolbarProps {
  location: string;
  timeRange: string;
  onChangeLocation: (val: string) => void;
  onChangeTimeRange: (val: string) => void;
}

export const Toolbar = ({
  location,
  timeRange,
  onChangeLocation,
  onChangeTimeRange,
}: ToolbarProps) => {
  return (
    <div className="toolbar">
      <DateRanger onChangeTimeRange={onChangeTimeRange} timeRange={timeRange} />
      <LocationSelector
        onChangeLocation={onChangeLocation}
        location={location}
      />
    </div>
  );
};
