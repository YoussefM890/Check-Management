enum ConstraintEnum {
  REQUIRED = 'required',
  NUMBER = 'number',
  MAX_LENGTH = 'maxLength',
  MIN_LENGTH = 'minLength',
  LENGTH = 'length',
  UNIQUE = 'unique',
  DATE_ORDER = 'dateOrder',
  Email_Exists = 'emailExists',
  CHOICE = 'choice',
}

export interface IColumn {
  prop: string;
  name: string;
  matchedColumn: string | null;
  constraints?: ConstraintEnum[];
  required?: boolean;
}

export const Columns: IColumn[] = [
  {
    prop: null,
    name: '',
    matchedColumn: null,
  },
  {
    prop: 'checkNumber',
    name: 'Numéro',
    matchedColumn: null,
  },
  {
    prop: 'amount',
    name: 'Montant',
    matchedColumn: null,
    required: true,
  },
  {
    prop: 'recipient',
    name: 'Bénéficiaire',
    matchedColumn: null,
    required: true,
  },
  {
    prop: 'notes',
    name: 'Notes',
    matchedColumn: null,
  },
  {
    prop: 'depositDate',
    name: 'Date de dépôt',
    matchedColumn: null,
  },
  {
    prop: 'cashDate',
    name: 'Date d\'encaissement',
    matchedColumn: null,
    required: true,
  },
  {
    prop: 'isCashed',
    name: 'Encaissé',
    matchedColumn: null,
    required: true,
  },
]

export interface IHeaderObject {
  name: string;
  prop: string;
  matchedColumn: string | null;
}

export interface IApprovedHeaderObject {
  prop: string;
  dbName: string;
  fileName: string;
}

export enum ButtonToShowEnum {
  APPROVE = 'Approve',
  CHECK = 'Check',
  SUBMIT = 'Submit',
}
