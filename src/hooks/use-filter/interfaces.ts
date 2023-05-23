import { Moment } from 'moment';

import { IDrawerPanelHelpers } from 'hooks/use-drawer-panel';

export type TDateBetweenFiltersDataType = { from?: Moment; to?: Moment };

export type TFiltersData = {
  [key: string]: string | number | string[] | number[] | TDateBetweenFiltersDataType | undefined;
};

export interface IApplyFilterHandlerArgs<T> {
  filterValues: T;
  helpers?: IDrawerPanelHelpers;
  isDefaultApply?: boolean;
}
