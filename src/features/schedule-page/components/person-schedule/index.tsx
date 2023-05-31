import React, { useCallback } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Typography } from "antd";

import { IPersonSchedule, useScheduleContext } from "features/schedule-page/context/schedule-context";
import { usePersonScheduleForm } from "./use-person-schedule-form";

interface IPersonScheduleProps extends IPersonSchedule {
  classes: {
    checked?: string;
    "line-cell"?: string;
    "person-container"?: string;
    "delete-person-icon"?: string;
  };
}

export const PersonSchedule: React.FC<IPersonScheduleProps> = ({ name, dates, classes }) => {
  usePersonScheduleForm({ personName: name });

  const { editSchedulePersonFormName, deleteSchedulePersonForm, setDutyPersonDay, schedulePersonsForm } =
    useScheduleContext();

  const changeNameHandler = useCallback(
    (value: string) => {
      editSchedulePersonFormName(name, value);
    },
    [editSchedulePersonFormName, name]
  );

  const deletePersonHandler = useCallback(() => {
    deleteSchedulePersonForm(name);
  }, [deleteSchedulePersonForm, name]);

  return (
    <>
      <span className={classes["person-container"]}>
        <MdDeleteForever className={classes["delete-person-icon"]} onClick={deletePersonHandler} />

        <Typography.Text type="secondary" editable={{ onChange: changeNameHandler }} className={classes["line-cell"]}>
          {name}
        </Typography.Text>
      </span>

      {Object.keys(dates).map((day) => (
        <div
          key={day}
          className={`${classes["line-cell"]} ${schedulePersonsForm[name]?.values[day] ? classes.checked : ""}`}
          onClick={() => setDutyPersonDay(name, day)}
        />
      ))}
    </>
  );
};
