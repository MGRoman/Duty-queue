import moment, { Moment } from "moment";

import { formatBasicFullDateTime } from "consts/dateFormat";
import { getMomentZeroOffset } from "utils";

export const getDateStringByDay = (month: Moment | null, day: string) =>
  getMomentZeroOffset(moment(month).date(Number(day)), "filter-date-from")?.format(formatBasicFullDateTime);
