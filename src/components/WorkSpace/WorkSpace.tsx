import { ChangeEvent, useCallback, useEffect, useState } from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { WEATHER_DATA_TYPES } from "constant";

import "./WorkSpace.css";

interface WorkSpaceProps {
  location: string;
  timeRange: string;
}

export const WorkSpace = ({ location, timeRange }: WorkSpaceProps) => {
  const [selectedDataType, setSelectedDataType] = useState(
    WEATHER_DATA_TYPES[0]
  );
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = useCallback(async () => {
    try {
      if (location && timeRange) {
        const headers = new Headers({
          Authorization: `Basic ${btoa("na_ehlers:6Z7jkQ8cAx")}`,
        });
        const convertedTimeRange = timeRange
          .split("--")
          .map((time) => `${time}Z`)
          .join("--");
        const response = await fetch(
          `https://api.meteomatics.com/${convertedTimeRange}:PT1H/${selectedDataType.value}/${location}/json`,
          { headers }
        );
        const jsonData = await response.json();
        if (jsonData && jsonData.status === "OK") {
          const weatherData = jsonData.data[0].coordinates[0].dates;
          setWeatherData(
            weatherData.map((data: any) => ({
              date: moment(data.date).format("MMM DD, hh:mm"),
              value: data.value,
            }))
          );
        }
      }
    } catch (err) {
      console.log("api error: ", err);
      setWeatherData([]);
    }
  }, [location, timeRange, selectedDataType]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleChangeDataType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedDataType(
      WEATHER_DATA_TYPES.find((type) => type.value === value)!
    );
  };

  return (
    <div className="workspace">
      <div className="workspace__header">
        <h3>{selectedDataType.unit}</h3>
        <select
          name="location"
          id="location"
          value={selectedDataType.value}
          onChange={handleChangeDataType}
        >
          {WEATHER_DATA_TYPES.map((dataType) => (
            <option key={dataType.value} value={dataType.value}>
              {dataType.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer height={500}>
        <AreaChart data={weatherData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={selectedDataType.color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={selectedDataType.color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={selectedDataType.color}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
