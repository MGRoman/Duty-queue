import React from "react";
import { Input, Checkbox, Tag, Typography } from "antd";

import { IPersonSchedule, useScheduleContext } from "features/schedule-page/context/schedule-context";
import { usePersonScheduleForm } from "./use-person-schedule-form";

interface IPersonScheduleProps extends IPersonSchedule {
  classes: { "line-cell"?: string };
}

export const PersonSchedule: React.FC<IPersonScheduleProps> = ({ name, dates, classes }) => {
  usePersonScheduleForm({ personName: name });

  const { editSchedulePersonFormName } = useScheduleContext();

  return (
    <>
      <Typography.Text type="secondary" editable className={classes["line-cell"]}>
        {name}
      </Typography.Text>

      {Object.keys(dates).map((day) => (
        <Typography.Text key={day} className={classes["line-cell"]} />
      ))}
    </>
  );
};
