import { DatePicker } from "antd";
import type { Moment } from "moment";
import momentGenerateConfig from "rc-picker/lib/generate/moment";

const DatePickerWithMoment = DatePicker.generatePicker<Moment>(momentGenerateConfig);

export { DatePickerWithMoment as DatePicker };
