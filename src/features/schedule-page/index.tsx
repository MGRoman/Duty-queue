import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { Moment } from "moment";

import { formatLongMonthYearDate } from "consts/dateFormat";
import { DatePicker, If } from "components";
import { Schedule } from "./components";

import classes from "./schedule.module.scss";
import { BuildHoC } from "HOC";
import { IDefaultComponentProps } from "interfaces";
import { ScheduleContextProvider, useScheduleContext } from "./context/schedule-context";

const SchedulePage: React.FC = () => {
  const { selectedMonth, changeMonthHandler } = useScheduleContext();

  return (
    <Space className={classes.schedule} direction="vertical" style={{ width: "100%" }} size={[0, 50]}>
      <DatePicker
        picker="month"
        style={{ width: "300px", height: "40px" }}
        placeholder="Выберите месяц для планирования"
        format={formatLongMonthYearDate}
        value={selectedMonth}
        onChange={changeMonthHandler}
      />

      <If condition={selectedMonth}>
        <Schedule />
      </If>
    </Space>
  );
};

const Component = BuildHoC<IDefaultComponentProps, {}>(ScheduleContextProvider)(SchedulePage);

export { Component as SchedulePage };
