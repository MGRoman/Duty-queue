import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mapValues } from 'lodash';

import { ICommonFormData } from 'interfaces';
import { TFiltersData } from './interfaces';
import { IDrawerPanelHelpers } from 'hooks/use-drawer-panel';
import { firstUC, queryStringToObject } from 'utils';
import { useForm } from 'hooks';

import classes from './use-filter.module.scss';

export const useFilter = (
  applyFilterHandler: (filterValues: TFiltersData, helpers?: IDrawerPanelHelpers, isDefaultApply?: boolean) => void,
  formData: ICommonFormData[],
) => {
  const { search } = useLocation();

  const { initialValues, setValues, FormFields, SubmitButton, CancelButton, handleSubmit } = useForm({
    formData,
    onOk: applyFilterHandler,
    onClose: () => {},
    resetOnCancel: true,
    submitText: firstUC("применить"),
    cancelText: firstUC("отмена"),
    classes,
  });

  //Если в url есть параметры запроса, учесть их поверх значений filterValues
  //и вызвать обработчик применения фильтра
  useEffect(() => {
    if (search.length) {
      const searchParamsFilterObject = queryStringToObject(search);

      const newFilterObjectValues = {
        ...initialValues,
        ...mapValues(searchParamsFilterObject, (v) => [v] as TFiltersData['']),
      };

      setValues(newFilterObjectValues);

      applyFilterHandler(newFilterObjectValues, undefined, true);
    }
  }, [applyFilterHandler, formData, initialValues, search, setValues]);

  return useCallback(
    (helpers?: IDrawerPanelHelpers) => (
      <form onSubmit={(e) => handleSubmit(e, helpers)} className={classes['filter-form']}>
        {formData.map(({ name }) => (
          <div key={name} className={classes['form-field-wrapper']}>
            {FormFields[name]}
          </div>
        ))}

        <div className={classes['form-buttons-wrapper']}>
          {CancelButton}
          {SubmitButton}
        </div>
      </form>
    ),
    [CancelButton, FormFields, SubmitButton, formData, handleSubmit],
  );
};
