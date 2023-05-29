import { useEffect } from "react";

import { IScheduleProps } from "features/schedule-page/interfaces";
import { useForm } from "hooks";
import { usePersonScheduleFormData } from "./use-person-schedule-form-data";
import { useScheduleContext } from "features/schedule-page/context/schedule-context";

interface IUsePersonScheduleForm extends IScheduleProps {
  personName?: string;
}

export const usePersonScheduleForm = ({ daysInMonth, personName }: IUsePersonScheduleForm) => {
  const { addScheduleForm } = useScheduleContext();

  const formData = usePersonScheduleFormData({ daysInMonth });

  const form = useForm({ formData });

  useEffect(() => {
    if (personName) {      
      addScheduleForm({ personName, personScheduleForm: form });
    }
  }, [addScheduleForm, form, personName]);
};
