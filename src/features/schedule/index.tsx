import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { Moment } from "moment";

import { formatLongMonthYearDate } from "consts/dateFormat";
import { DatePicker } from "components";

import classes from "./schedule.module.scss";

export const Schedule: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<Moment | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [daysInMonthCount, setDaysInMonthCount] = useState<number>();

  useEffect(() => {
    if (selectedMonth) {
      setDaysInMonthCount(selectedMonth.daysInMonth());
    } else {
      setDaysInMonthCount(undefined);
    }
  }, [selectedMonth]);

  return (
    <Space className={classes.schedule} direction="vertical" style={{ width: "100%" }}>
      <DatePicker
        picker="month"
        style={{ width: "300px", height: "40px" }}
        placeholder="Выберите месяц для планирования"
        format={formatLongMonthYearDate}
        value={selectedMonth}
        onChange={setSelectedMonth}
      />
    </Space>
  );
};
