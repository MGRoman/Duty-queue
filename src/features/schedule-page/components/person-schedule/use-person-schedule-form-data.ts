import { useMemo } from "react";

import { ICommonFormData } from "interfaces";
import { IScheduleProps } from "features/schedule-page/interfaces";

export const usePersonScheduleFormData = ({ daysInMonth }: IScheduleProps) => {
  const days = useMemo(
    () => (daysInMonth ? Array.from({ length: daysInMonth }, (_, index) => ++index) : []),
    [daysInMonth]
  );

  return useMemo(
    () => days.map<ICommonFormData>((dayNumber) => ({
        name: String(dayNumber),
        initialValue: false,
      })),
    [days]);
};
