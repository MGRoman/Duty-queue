import { useCallback, useMemo, useState } from "react";

import { ICommonFormData } from "interfaces";
import { useScheduleContext } from "./schedule-context";
import { useForm } from "hooks";

export interface IAddScheduleForm {
  personName: string;
  personScheduleForm: ReturnType<typeof useForm>;
}

export const useScheduleForm = () => {
  const { daysInMonth } = useScheduleContext();

  const schedulePesonFormData = useMemo(
    () =>
    daysInMonth ? daysInMonth.map<ICommonFormData>((dayNumber) => ({
        name: String(dayNumber),
        initialValue: false,
      })) : [],
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

  const dutyDayHandler = useCallback(
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
    console.log(schedulePersonsForm);
  }, [schedulePersonsForm]);

  const clearScheduleValues = useCallback(() => {
    Object.keys(schedulePersonsForm).forEach((name) => {
      schedulePersonsForm[name].clearForm();
    });
  }, [schedulePersonsForm]);

  return {
    schedulePesonFormData,
    schedulePersonsForm,
    addSchedulePersonForm,
    deleteSchedulePersonForm,
    editSchedulePersonFormName,
    dutyDayHandler,
    sendScheduleValues,
    clearScheduleValues,
  };
};
