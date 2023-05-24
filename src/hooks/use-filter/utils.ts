import moment from "moment";

import { ICommonFormData } from "interfaces/";
import { TDateBetweenFiltersDataType, TFiltersData } from "./interfaces";

export const getFilteredData = (
  filteringData: Record<string, any>[],
  formData: ICommonFormData[],
  filterValues: TFiltersData
) =>
  filteringData.filter((item) =>
    formData.every(({ name: fieldName, type: fieldType }) => {
      switch (fieldType) {
        case "multi-select":
          if (!(filterValues[fieldName] as string[]).length) {
            return true;
          } else if (Array.isArray(item[fieldName])) {
            return (item[fieldName] as string[]).some((elem) =>
              (filterValues[fieldName] as string[]).includes(String(elem))
            );
          } else {
            return (filterValues[fieldName] as string[]).includes(String(item[fieldName]));
          }

        case "date-between":
          const { from: dateFrom, to: dateTo } = filterValues[fieldName] as TDateBetweenFiltersDataType;

          if (!dateFrom && !dateTo) {
            return true;
          } else if (!item[fieldName]) {
            return false;
          } else if (dateFrom && dateTo) {
            return moment(item[fieldName]).isBetween(moment(dateFrom), moment(dateTo), undefined, "[]");
          } else if (!dateFrom && dateTo) {
            return moment(item[fieldName]).isSameOrBefore(moment(dateTo));
          } else {
            return moment(item[fieldName]).isSameOrAfter(moment(dateFrom));
          }

        default:
          return true;
      }
    })
  );
