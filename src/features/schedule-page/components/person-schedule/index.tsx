import React, { useCallback } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Typography } from "antd";

import { IPerson } from "interfaces";
import { useScheduleContext } from "features/schedule-page/context/schedule-context";
import { usePersonScheduleForm } from "./use-person-schedule-form";

interface IPersonScheduleProps extends IPerson {
  classes: {
    checked?: string;
    "line-cell"?: string;
    "person-container"?: string;
    "delete-person-icon"?: string;
  };
}

export const PersonSchedule: React.FC<IPersonScheduleProps> = ({ name, classes }) => {
  usePersonScheduleForm({ name });

  const { editPersonHandler, deletePersonHandler, dutyDayHandler, schedulePersonsForm, daysInMonth } =
    useScheduleContext();

  const changeNameHandler = useCallback(
    (value: string) => {
      editPersonHandler(name, value);
    },
    [editPersonHandler, name]
  );

  const deleteHandler = useCallback(() => {
    deletePersonHandler(name);
  }, [deletePersonHandler, name]);

  return (
    <>
      <span className={classes["person-container"]}>
        <MdDeleteForever className={classes["delete-person-icon"]} onClick={deleteHandler} />

        <Typography.Text type="secondary" editable={{ onChange: changeNameHandler }} className={classes["line-cell"]}>
          {name}
        </Typography.Text>
      </span>

      {daysInMonth.map((day) => (
        <div
          key={String(day)}
          className={`${classes["line-cell"]} ${schedulePersonsForm[name]?.values[day] ? classes.checked : ""}`}
          onClick={() => dutyDayHandler(name, String(day))}
        />
      ))}
    </>
  );
};
