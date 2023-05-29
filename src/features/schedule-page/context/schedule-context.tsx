import React, { createContext, useCallback, useContext, useState, useEffect } from "react";
import { Moment } from "moment";

import { IDefaultComponentProps } from "interfaces";
import { useForm } from "hooks";

interface IPersonSchedule {
  name: string;
  dates: string[];
}

interface IAddScheduleForm {
  personName: string;
  personScheduleForm: ReturnType<typeof useForm>;
}

interface IScheduleFormContextProps {
  selectedMonth: Moment | null;
  changeMonthHandler: (month: Moment | null) => void;
  daysInMonth: number[];

  scheduleValues: IPersonSchedule[];
  scheduleForm: Record<string, ReturnType<typeof useForm>>;
  addScheduleForm: ({ personName, personScheduleForm }: IAddScheduleForm) => void;
  deleteScheduleForm: (personName: string) => void;
}

const ScheduleContext = createContext<IScheduleFormContextProps>({} as IScheduleFormContextProps);

ScheduleContext.displayName = "ScheduleContext";

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleContextProvider: React.FC<IDefaultComponentProps> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState<Moment | null>(null);

  const changeMonthHandler = useCallback((month: Moment | null) => {
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

  const [scheduleValues, setScheduleValues] = useState<IPersonSchedule[]>([]);

  const [scheduleForm, setScheduleForm] = useState<Record<string, ReturnType<typeof useForm>>>({});

  const addScheduleForm = useCallback(({ personName, personScheduleForm }: IAddScheduleForm) => {
    setScheduleForm((prev) => ({
      ...prev,
      [personName]: personScheduleForm,
    }));
  }, []);

  const deleteScheduleForm = useCallback((personName: string) => {
    setScheduleForm((prev) =>
      Object.keys(prev).reduce<Record<string, ReturnType<typeof useForm>>>(
        (acc, name) => (name === personName ? { ...acc } : { [name]: prev[name] }),
        {} as Record<string, ReturnType<typeof useForm>>
      )
    );
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        selectedMonth,
        changeMonthHandler,
        daysInMonth,

        scheduleValues,
        scheduleForm,
        addScheduleForm,
        deleteScheduleForm,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
