import { useCallback, useMemo, useState } from "react";
import { mapKeys } from "lodash";
import { Moment } from "moment";

import { ICommonFormData, IPerson, IPersonSchedule } from "interfaces";
import { getDateStringByDay } from "../utils";
import { useForm } from "hooks";

export interface IAddScheduleForm {
  personName: string;
  personScheduleForm: ReturnType<typeof useForm>;
}

export const useScheduleForm = (persons: IPerson[], daysInMonth: number[], month: Moment | null) => {
  const schedulePesonFormData = useMemo(
    () =>
      daysInMonth
        ? daysInMonth.map<ICommonFormData>((dayNumber) => ({
            name: String(dayNumber),
            initialValue: false,
          }))
        : [],
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

  const autoCompleteScheduleValues = useCallback(() => {
    Object.keys(schedulePersonsForm).forEach((name, personIndex) => {
      const values = daysInMonth.reduce<Record<string, any>>(
        (acc, dayNumber, dayIndex) => ({
          ...acc,
          [String(dayNumber)]: (dayIndex - personIndex) % persons.length === 0 ? true : false,
        }),
        {} as Record<string, any>
      );

      schedulePersonsForm[name].setValues(values);
    });
  }, [daysInMonth, persons.length, schedulePersonsForm]);

  const sendScheduleValues = useCallback(() => {
    const values: IPersonSchedule[] = Object.keys(schedulePersonsForm).map((name) => {
      const dates: Record<string, any> = mapKeys(schedulePersonsForm[name].values, (_, k) =>
        getDateStringByDay(month, k)
      );

      return { name, dates };
    });

    console.log(values);
  }, [month, schedulePersonsForm]);

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
    autoCompleteScheduleValues,
  };
};
