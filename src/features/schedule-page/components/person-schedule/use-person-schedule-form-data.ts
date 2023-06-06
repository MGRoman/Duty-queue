import { useMemo } from "react";

import { ICommonFormData } from "interfaces";
import { useScheduleContext } from "features/schedule-page/context/schedule-context";

export const usePersonScheduleFormData = () => {
  const { daysInMonth } = useScheduleContext();

  return useMemo(
    () =>
      daysInMonth.map<ICommonFormData>((dayNumber) => ({
        name: String(dayNumber),
        initialValue: false,
      })),
    [daysInMonth]
  );
};
