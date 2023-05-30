import { useEffect } from "react";

import { useForm } from "hooks";
import { useScheduleContext } from "features/schedule-page/context/schedule-context";

interface IUsePersonScheduleForm {
  personName?: string;
}

export const usePersonScheduleForm = ({ personName }: IUsePersonScheduleForm) => {
  const { schedulePesonFormData: formData, addSchedulePersonForm } = useScheduleContext();

  const form = useForm({ formData });

  //проверить, нет ли косяков с перетиранием
  useEffect(() => {
    if (personName) {
      addSchedulePersonForm({ personName, personScheduleForm: form });
    }
  }, [addSchedulePersonForm, form, personName]);
};
