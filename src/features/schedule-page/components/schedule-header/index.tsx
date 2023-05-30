import React from "react";
import { Typography } from "antd";

import { useScheduleContext } from "features/schedule-page/context/schedule-context";

interface IScheduleHeaderProps {
  classes: { "line-cell"?: string };
}

export const ScheduleHeader: React.FC<IScheduleHeaderProps> = ({ classes }) => {
  const { daysInMonth } = useScheduleContext();
  return (
    <>
      <Typography.Title level={5} type="secondary" className={classes["line-cell"]}>
        ФИО сотрудника
      </Typography.Title>

      {daysInMonth.map((day) => (
        <Typography.Title key={day} level={5} type="secondary" className={classes["line-cell"]}>
          {day}
        </Typography.Title>
      ))}
    </>
  );
};
