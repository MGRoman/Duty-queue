import React, { createContext, useCallback, useContext } from "react";
import { Moment } from "moment";

import { ICommonFormData, IDefaultComponentProps, IPerson } from "interfaces";
import { IAddScheduleForm, useScheduleForm } from "./use-schedule-form";
import { usePersons } from "./use-persons";
import { useForm } from "hooks";
import { useScheduleMonth } from "./use-schedule-month";

interface IScheduleFormContextProps {
  selectedMonth: Moment | null;
  changeMonth: (month: Moment | null) => void;
  daysInMonth: number[];

  persons: IPerson[];
  addPerson: () => void;

  schedulePesonFormData: ICommonFormData[];
  schedulePersonsForm: Record<string, ReturnType<typeof useForm>>;
  addSchedulePersonForm: ({ personName, personScheduleForm }: IAddScheduleForm) => void;

  deletePersonHandler: (personName: string) => void;
  editPersonHandler: (oldName: string, newName: string) => void;

  dutyDayHandler: (name: string, day: string) => void;

  sendScheduleValues: () => void;
  clearScheduleValues: () => void;
  autoCompleteScheduleValues: () => void;
}

const ScheduleContext = createContext<IScheduleFormContextProps>({} as IScheduleFormContextProps);

ScheduleContext.displayName = "ScheduleContext";

export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleContextProvider: React.FC<IDefaultComponentProps> = ({ children }) => {
  const { selectedMonth, changeMonth, daysInMonth } = useScheduleMonth();

  const { persons, addPerson, editPerson, deletePerson } = usePersons();

  const {
    schedulePesonFormData,
    schedulePersonsForm,
    addSchedulePersonForm,
    deleteSchedulePersonForm,
    editSchedulePersonFormName,
    dutyDayHandler,
    clearScheduleValues,
    sendScheduleValues,
    autoCompleteScheduleValues,
  } = useScheduleForm(daysInMonth, persons);

  const deletePersonHandler = useCallback(
    (personName: string) => {
      deletePerson(personName);

      deleteSchedulePersonForm(personName);
    },
    [deletePerson, deleteSchedulePersonForm]
  );

  const editPersonHandler = useCallback(
    (oldName: string, newName: string) => {
      editPerson(oldName, newName);

      editSchedulePersonFormName(oldName, newName);
    },
    [editPerson, editSchedulePersonFormName]
  );

  return (
    <ScheduleContext.Provider
      value={{
        selectedMonth,
        changeMonth,
        daysInMonth,

        persons,
        addPerson,

        schedulePesonFormData,
        schedulePersonsForm,
        addSchedulePersonForm,

        deletePersonHandler,
        editPersonHandler,

        dutyDayHandler,

        sendScheduleValues,
        clearScheduleValues,
        autoCompleteScheduleValues,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
