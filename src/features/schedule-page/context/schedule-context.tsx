import React, { createContext, useCallback, useContext, useState, useEffect, useMemo } from "react";
import { Moment } from "moment";

import { ICommonFormData, IDefaultComponentProps } from "interfaces";
import { useForm } from "hooks";

export interface IPersonSchedule {
  name: string;
  // dates: string[];
  dates: Record<string, boolean>;
}

interface IAddScheduleForm {
  personName: string;
  personScheduleForm: ReturnType<typeof useForm>;
}

interface IScheduleFormContextProps {
  selectedMonth: Moment | null;
  changeMonth: (month: Moment | null) => void;
  daysInMonth: number[];

  schedulePersonsValues: IPersonSchedule[];
  addNewPerson: () => void;
  sendScheduleValues: () => void;
  resetScheduleValues: () => void;

  schedulePesonFormData: ICommonFormData[];
  schedulePersonsForm: Record<string, ReturnType<typeof useForm>>;
  addSchedulePersonForm: ({ personName, personScheduleForm }: IAddScheduleForm) => void;
  deleteSchedulePersonForm: (personName: string) => void;
  editSchedulePersonFormName: (oldName: string, newName: string) => void;
  setDutyPersonDay: (name: string, day: string) => void;
}

const ScheduleContext = createContext<IScheduleFormContextProps>({} as IScheduleFormContextProps);

ScheduleContext.displayName = "ScheduleContext";

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleContextProvider: React.FC<IDefaultComponentProps> = ({ children }) => {
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

  const [schedulePersonsValues, setSchedulePersonsValues] = useState<IPersonSchedule[]>([]);

  const [newPersonsCount, setNewpersonsCount] = useState(0);

  const addNewPerson = useCallback(() => {
    setSchedulePersonsValues((prev) => [...prev, { name: `Сотрудник-${newPersonsCount + 1}`, dates: {} }]);

    setNewpersonsCount((prev) => prev + 1);
  }, [newPersonsCount]);

  const schedulePesonFormData = useMemo(
    () =>
      daysInMonth.map<ICommonFormData>((dayNumber) => ({
        name: String(dayNumber),
        initialValue: false,
      })),
    [daysInMonth]
  );

  const [schedulePersonsForm, setSchedulePersonsForm] = useState<Record<string, ReturnType<typeof useForm>>>({});

  const addSchedulePersonForm = useCallback(({ personName, personScheduleForm }: IAddScheduleForm) => {
    setSchedulePersonsForm((prev) => ({
      ...prev,
      [personName]: personScheduleForm,
    }));
  }, []);

  const deleteSchedulePersonForm = useCallback((personName: string) => {
    setSchedulePersonsForm((prev) =>
      Object.keys(prev).reduce<Record<string, ReturnType<typeof useForm>>>(
        (acc, name) => (name === personName ? { ...acc } : { ...acc, [name]: prev[name] }),
        {} as Record<string, ReturnType<typeof useForm>>
      )
    );
  }, []);

  const editSchedulePersonFormName = useCallback((oldName: string, newName: string) => {
    setSchedulePersonsForm((prev) =>
      Object.keys(prev).reduce<Record<string, ReturnType<typeof useForm>>>(
        (acc, name) => (name === oldName ? { ...acc, [newName]: prev[name] } : { ...acc, [name]: prev[name] }),
        {} as Record<string, ReturnType<typeof useForm>>
      )
    );
  }, []);

  const togleDutyPersonDay = useCallback(
    (name: string, day: string) => {
      schedulePersonsForm[name].setFieldValue(day, !schedulePersonsForm[name].values[day]);
    },
    [schedulePersonsForm]
  );

  const setDutyPersonDay = useCallback(
    (name: string, day: string) => {
      const personToClearDutyDay = Object.keys(schedulePersonsForm).find(
        (personName) => schedulePersonsForm[personName].values[day]
      );

      personToClearDutyDay && togleDutyPersonDay(personToClearDutyDay, day);

      togleDutyPersonDay(name, day);
    },
    [schedulePersonsForm, togleDutyPersonDay]
  );

  const sendScheduleValues = useCallback(() => {
    console.log(schedulePersonsValues);
  }, [schedulePersonsValues]);

  const resetScheduleValues = useCallback(() => {
    Object.keys(schedulePersonsForm).forEach((name) => {
      schedulePersonsForm[name].resetForm();
    });
  }, [schedulePersonsForm]);

  useEffect(() => {
    setSchedulePersonsValues(
      Object.keys(schedulePersonsForm).reduce<IPersonSchedule[]>(
        (acc, name) => [...acc, { name, dates: schedulePersonsForm[name].values as Record<string, boolean> }],
        [] as IPersonSchedule[]
      )
    );
  }, [schedulePersonsForm]);

  return (
    <ScheduleContext.Provider
      value={{
        selectedMonth,
        changeMonth,
        daysInMonth,

        schedulePersonsValues,
        addNewPerson,
        sendScheduleValues,
        resetScheduleValues,

        schedulePesonFormData,
        schedulePersonsForm,
        addSchedulePersonForm,
        deleteSchedulePersonForm,
        editSchedulePersonFormName,
        setDutyPersonDay,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
