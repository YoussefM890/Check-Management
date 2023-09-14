import {IOption} from "../models/interfaces/global";

interface IAccordionData {
  title?: string;
  content?: string;
  description?: string;
}

interface ITableColumn {
  prop?: string;
  name?: string;
  type?: string;
  seachable?: boolean;
}

interface ICheckForm {
  prop: string;
  name: string;
  type?: string;
  columnSpan?: number;
  rowSpan?: number;
  required?: boolean;
}

type ICheckFormRequired = Required<ICheckForm>;
export const AccordionData: IAccordionData[] = [
  {
    title: 'Janvier'
  },
  {
    title: 'Février'
  },
  {
    title: 'Mars'
  },
  {
    title: 'Avril'
  },
  {
    title: 'Mai'
  },
  {
    title: 'Juin'
  },
  {
    title: 'Juillet'
  },
  {
    title: 'Août'
  },
  {
    title: 'Septembre'
  },
  {
    title: 'Octobre'
  },
  {
    title: 'Novembre'
  },
  {
    title: 'Décembre'
  }
]
export const TableColumn: ITableColumn[] = [
  {
    prop: 'checkNumber',
    name: 'Numéro de chèque',
    type: 'text',
  },
  {
    prop: 'amount',
    name: 'Montant',
    type: 'text',
  },
  {
    prop: 'recipient',
    name: 'Bénéficiaire',
    type: 'text',
  },
  {
    prop: 'notes',
    name: 'Notes',
    type: 'text',
  },
  {
    prop: 'depositDate',
    name: 'Date de dépôt',
    type: 'date',
  },
  {
    prop: 'cashDate',
    name: 'Date d\'encaissement',
    type: 'date',
  },
  {
    prop: 'isDeposited',
    name: 'Déposé',
    type: 'checkbox'
  },
  {
    prop: 'isCashed',
    name: 'Encaissé',
    type: 'checkbox'
  },
]
export const CreateCheckForm = (optionsList: ICheckForm[] = CheckForm): ICheckFormRequired[] => {
  return optionsList.map(options => ({
    columnSpan: 2,
    rowSpan: 1,
    type: 'text',
    required: false,
    ...options,
  }));
};
const CheckForm: ICheckForm[] = [
  {
    prop: 'checkNumber',
    name: 'Numéro de chèque',
    type: 'text',
    required: false,

  },
  {
    prop: 'amount',
    name: 'Montant',
    type: 'number',
    required: true,
  },
  {
    prop: 'recipient',
    name: 'Bénéficiaire',
    type: 'autoComplete',
    required: true,
  },
  {
    prop: 'notes',
    name: 'Notes',
    columnSpan: 6,
  },
  {
    prop: 'depositDate',
    name: 'Date de dépôt',
    type: 'date',
    columnSpan: 3,
  },
  {
    prop: 'cashDate',
    name: 'Date d\'encaissement',
    columnSpan: 3,
    type: 'date',
    required: true,
  },
  {
    prop: 'isCashed',
    name: 'Encaissé',
    type: 'toggle',
    columnSpan: 3,
    required: true,
  }
];


export const StatusFilter: IOption[] = [
  {
    value: '0',
    viewValue: 'Tous les Statuts',
  },
  {
    value: '1',
    viewValue: 'Encaissé',
  },
  {
    value: '2',
    viewValue: 'Non Encaissé',
  },
]
