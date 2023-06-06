import { useEffect, useMemo } from "react";

import { IPerson } from "interfaces";
import { useForm } from "hooks";
import { useScheduleContext } from "features/schedule-page/context/schedule-context";

export const usePersonScheduleForm = ({ name }: IPerson) => {
  const { addSchedulePersonForm, schedulePersonsForm, schedulePesonFormData: formData } = useScheduleContext();

  const initial = useMemo(() => schedulePersonsForm?.[name]?.values, [name, schedulePersonsForm]);
  
  const form = useForm({ formData, initialValues: initial });

  useEffect(() => {
    addSchedulePersonForm({ personName: name, personScheduleForm: form });
  }, [addSchedulePersonForm, form, name]);
};
