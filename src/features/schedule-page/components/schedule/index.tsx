import React from "react";
import { Button, Row, Col, Tag } from "antd";
import { HiOutlinePlus } from "react-icons/hi";

import classes from "./schedule.module.scss";

import { useScheduleContext } from "features/schedule-page/context/schedule-context";

export const Schedule: React.FC = () => {
  const { daysInMonth } = useScheduleContext();

  return (
    <Row gutter={[0, 20]} className={classes["schedule-container"]}>
      <Col span={24}>
        <Button icon={<HiOutlinePlus />} style={{ width: "70px" }} type="dashed" />
      </Col>

      <Col
        span={24}
        className={classes.schedule}
        style={{ gridTemplateColumns: `150px repeat(${daysInMonth.length}, 1fr)` }}
      >
        <Tag className={classes["header-cell"]}>ФИО сотрудника</Tag>
        {daysInMonth && daysInMonth.map((day) => <Tag className={classes["header-cell"]}>{day}</Tag>)}
      </Col>
    </Row>
  );
};
