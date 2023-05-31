import React, { useMemo } from "react";
import { Button, Row, Col } from "antd";
import { HiOutlinePlus } from "react-icons/hi";

import classes from "./schedule.module.scss";

import { useScheduleContext } from "features/schedule-page/context/schedule-context";
import { ScheduleHeader } from "../schedule-header";
import { PersonSchedule } from "../person-schedule";

export const Schedule: React.FC = () => {
  const { daysInMonth, schedulePersonsValues, addNewPerson, sendScheduleValues, resetScheduleValues } =
    useScheduleContext();

  const disabledSubmit = useMemo<boolean>(() => !Object.keys(schedulePersonsValues).length, [schedulePersonsValues]);

  return (
    <Row gutter={[0, 20]} className={classes["schedule-container"]}>
      <Col span={24} className={classes["buttons-container"]}>
        <Button icon={<HiOutlinePlus />} style={{ width: "70px" }} type="dashed" onClick={addNewPerson} />

        <span>
          <Button disabled={disabledSubmit} onClick={resetScheduleValues} style={{ marginRight: "15px" }}>
            Сбросить
          </Button>

          <Button disabled={disabledSubmit} onClick={sendScheduleValues}>
            Отправить
          </Button>
        </span>
      </Col>

      <Col
        span={24}
        className={classes["schedule-line"]}
        style={{ gridTemplateColumns: `150px repeat(${daysInMonth.length}, 1fr)` }}
      >
        <ScheduleHeader classes={classes} />
      </Col>

      <Col span={24}>
        {schedulePersonsValues.map((props) => (
          <Col
            key={props.name}
            span={24}
            className={classes["schedule-line"]}
            style={{ gridTemplateColumns: `150px repeat(${daysInMonth.length}, 1fr)` }}
          >
            <PersonSchedule classes={classes} {...props} />
          </Col>
        ))}
      </Col>
    </Row>
  );
};
