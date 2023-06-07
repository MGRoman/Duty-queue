import React from "react";
import { Space } from "antd";

import { formatLongMonthYearDate } from "consts/dateFormat";
import { DatePicker, If } from "components";
import { Schedule } from "./components";

import classes from "./schedule.module.scss";
import { BuildHoC } from "HOC";
import { IDefaultComponentProps } from "interfaces";
import { ScheduleContextProvider, useScheduleContext } from "./context/schedule-context";

const SchedulePage: React.FC = () => {
  const { selectedMonth, changeMonth } = useScheduleContext();

  return (
    <Space className={classes.schedule} direction="vertical" size={[0, 50]}>
      <DatePicker
        picker="month"
        className={classes["month-picker"]}
        placeholder="Выберите месяц для планирования"
        format={formatLongMonthYearDate}
        value={selectedMonth}
        onChange={changeMonth}
      />

      <If condition={selectedMonth}>
        <Schedule />
      </If>
    </Space>
  );
};

const Component = BuildHoC<IDefaultComponentProps, {}>(ScheduleContextProvider)(SchedulePage);

export { Component as SchedulePage };
