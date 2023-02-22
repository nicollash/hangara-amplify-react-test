import { ChangeEvent, useMemo } from "react";
import moment from "moment";

import "./DateRanger.css";

interface DateRangerProps {
  timeRange: string;
  onChangeTimeRange: (val: string) => void;
}

export const DateRanger = ({
  timeRange,
  onChangeTimeRange,
}: DateRangerProps) => {
  const [startDate, endDate] = useMemo(() => {
    if (timeRange && timeRange.includes("--")) {
      const [startDateStr, endDateStr] = timeRange.split("--");

      return [
        startDateStr ? moment(startDateStr).format("yyyy-MM-DDThh:mm") : "",
        endDateStr ? moment(endDateStr).format("yyyy-MM-DDThh:mm") : "",
      ];
    }

    return ["", ""];
  }, [timeRange]);

  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const startDateStr = moment(value).format("yyyy-MM-DDThh:mm");

    if (!endDate || new Date(endDate) < new Date(startDateStr)) {
      return onChangeTimeRange(`${startDateStr}--${startDateStr}`);
    }

    onChangeTimeRange(`${startDateStr}--${endDate}`);
  };

  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const endDateStr = moment(value).format("yyyy-MM-DDThh:mm");

    if (!startDate || new Date(endDateStr) < new Date(startDate)) {
      return onChangeTimeRange(`${endDateStr}--${endDateStr}`);
    }

    onChangeTimeRange(`${startDate}--${endDateStr}`);
  };

  return (
    <div className="date-ranger">
      <p className="date-ranger__title">Date or Date Range</p>
      <div className="date-ranger__selectors">
        <input
          type="datetime-local"
          id="start_date"
          value={startDate}
          onChange={handleChangeStartDate}
        />
        <input
          type="datetime-local"
          id="end_date"
          value={endDate}
          onChange={handleChangeEndDate}
        />
      </div>
    </div>
  );
};
