import moment, { Moment } from "moment";

import { formatBasicFullDateTime } from "consts/dateFormat";

export const getMomentCurrentOffset = (dateZeroOffset?: string | Moment | Date) => {
  if (!dateZeroOffset) return;

  const clientOffset = moment().utcOffset();

  const dateOffset = moment(dateZeroOffset)
    .utcOffset(clientOffset + clientOffset)
    .format(formatBasicFullDateTime);

  return moment(dateOffset);
};

export const getMomentZeroOffset = (
  dateCurrentOffset?: string | Moment | Date,
  regionToUse?: "filter-date-from" | "filter-date-to"
) => {
  if (!dateCurrentOffset) return;

  const dateMoment = moment(dateCurrentOffset);
  let dateZeroOffset: string = "";

  switch (regionToUse) {
    case "filter-date-from":
      dateZeroOffset = dateMoment.startOf("day").utcOffset(0).format(formatBasicFullDateTime);
      break;

    case "filter-date-to":
      dateZeroOffset = dateMoment.endOf("day").utcOffset(0).format(formatBasicFullDateTime);
      break;

    default:
      dateZeroOffset = dateMoment.utcOffset(0).format(formatBasicFullDateTime);
      break;
  }

  return moment(dateZeroOffset);
};
