import React, { useState } from "react";

import { IScheduleProps } from "features/schedule-page/interfaces";
import { usePersonScheduleForm } from "./use-person-schedule-form";

export const PersonSchedule: React.FC<IScheduleProps> = ({ daysInMonth }) => {
  const [personName, setPersonName] = useState<string>('sjdb')

  console.log(personName);
  
  usePersonScheduleForm({ daysInMonth, personName });

  return null;
};
