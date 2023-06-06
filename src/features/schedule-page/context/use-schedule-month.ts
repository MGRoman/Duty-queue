import { useCallback, useEffect, useState } from "react";
import { Moment } from "moment";

export const useScheduleMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState<Moment | null>(null);

  const changeMonth = useCallback((month: Moment | null) => {
    setSelectedMonth(month);
  }, []);

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  useEffect(() => {
    if (selectedMonth) {
      const days = Array.from({ length: selectedMonth.daysInMonth() }, (_, index) => ++index);
      setDaysInMonth(days);
    } else {
      setDaysInMonth([]);
    }
  }, [selectedMonth]);

  return { selectedMonth, changeMonth, daysInMonth };
};
