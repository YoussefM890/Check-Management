export interface IOption {
  value: string;
  viewValue: string;
}

export interface IFilter {
  [key: string]: IOption[];
}
