import {IColumn} from "./static";

export class ImportUtils {
  uniqueIndex = 0;

  constructor() {
  }

  generateUniqueHeader(header: string): string {
    let newHeader = header.replace(/\s+/g, '_').toLowerCase();
    newHeader += '_' + this.uniqueIndex++;
    return newHeader;
  }

  sortDbColumns(columns): IColumn[] {
    columns.sort((a, b) => {
      if (a.matchedColumn === null && b.matchedColumn !== null) {
        return -1; // a comes before b
      }
      if (a.matchedColumn !== null && b.matchedColumn === null) {
        return 1; // b comes before a
      }
      return 0; // no change in order
    });
    return columns;
  }
}
