import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {Papa} from "ngx-papaparse";
import {ButtonToShowEnum, Columns, IHeaderObject} from "./static";
import {CheckService} from "../../helpers/services/check.service";
import {Check} from "../../models/interfaces/check";
import {IResponse} from "../../../shared";
import {ImportUtils} from "./importUtils";
import stringSimilarity from 'string-similarity';
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-import-checks',
  templateUrl: './import-checks.component.html',
  styleUrls: ['./import-checks.component.css']
})
export class ImportChecksComponent extends ImportUtils implements OnInit {
  file: File = null;
  dataSource: MatTableDataSource<any>;
  headersObject: IHeaderObject[] = [];
  tableColumnsToDisplay: string[] = [];
  importedData: any[];
  approved = false;
  checked = false;
  buttonToShow = 'None';
  buttonToShowEnum = ButtonToShowEnum;
  dbColumns;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<ImportChecksComponent>,
              private papa: Papa,
              private checkService: CheckService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onFilechange(event: any) {
    // FIXME: Raouf: the logic can be converted to formBuilder
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
      this.toastr.error('Merci de choisir un fichier valide');
    }
  }

  handleFileInput(event: any): void {
    this.resetValues()
    const file = event.target.files[0];
    this.papa.parse(file, {
      dynamicTyping: true,
      complete: (result) => {
        [this.dataSource, this.headersObject, this.tableColumnsToDisplay] = this.parseData(result.data)
        this.buttonToShow = this.buttonToShowEnum.APPROVE;
        this.smartMatch()
      },
      error(error) {
        console.log(error);
      }
    });
  }

  removeFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    fileInput.value = null;
    this.resetValues()
  }

  resetValues() {
    this.file = null;
    this.dataSource = null;
    this.headersObject = [];
    this.tableColumnsToDisplay = [];
    this.importedData = [];
    this.approved = false;
    this.checked = false;
    this.buttonToShow = 'None';
    this.dbColumns = cloneDeep(Columns);
  }

  parseData(data: any[]): any[] {
    let propHeaders: string[] = [];
    let headersObject: any[] = [];
    let dataSource: any[] = [];
    for (let i of data[0]) {
      const header = this.generateUniqueHeader(i);
      propHeaders.push(header);
      headersObject.push({prop: header, name: i, matchedColumn: null});
    }
    for (let i = 1; i < data.length; i++) {
      let obj = {};
      for (let j = 0; j < propHeaders.length; j++) {
        obj[propHeaders[j]] = data[i][j];
      }
      dataSource.push(obj);
    }
    this.importedData = dataSource;
    return [new MatTableDataSource<any>(dataSource), headersObject, propHeaders];
  }

  assignMatchedColumn(dbCol, fileCol): void {
    if (dbCol.matchedColumn !== null) return;
    if (fileCol.matchedColumn !== null) {
      this.dbColumns.find(a => a.prop == fileCol.matchedColumn).matchedColumn = null;
    }
    if (dbCol.prop == null) {
      fileCol.matchedColumn = null;
      return;
    }
    fileCol.matchedColumn = dbCol.prop;
    dbCol.matchedColumn = fileCol.prop;
    this.dbColumns = this.sortDbColumns(this.dbColumns);
  }

  smartMatch(): void {
    this.headersObject.forEach(fileCol => {
      if (fileCol.matchedColumn === null) {
        const potentialMatches = this.dbColumns.map(dbCol => dbCol.name.toLowerCase());
        const matches = stringSimilarity.findBestMatch(fileCol.name.toLowerCase(), potentialMatches);
        const bestMatch = matches.bestMatch.target;
        if (matches.bestMatch.rating > 0.5) {
          const dbCol = this.dbColumns.find(a => a.name.toLowerCase() === bestMatch);
          this.assignMatchedColumn(dbCol, fileCol);
        }
      }
    });
  }


  approveSelectedColumns(): void {
    const matchingColumns = this.headersObject.reduce((result, item) => {
      if (item.matchedColumn !== null) {
        result[item.prop] = item.matchedColumn;
      }
      return result;
    }, {});
    const updatedImportedData = this.dataSource.data.map(item => {
      const updatedItem = {};
      for (const key in item) {
        if (matchingColumns.hasOwnProperty(key)) {
          updatedItem[matchingColumns[key]] = item[key];
        }
      }
      return updatedItem;
    });
    let displayedColumns = []

    let updatedHeadersObject: IHeaderObject[] = []
    for (let item of this.headersObject) {
      if (item.matchedColumn !== null) {
        let res = {};
        displayedColumns.push(item.matchedColumn)
        res['prop'] = item.matchedColumn;
        res['name'] = item.name;
        res['matchedColumn'] = this.dbColumns.find(a => a.prop == item.matchedColumn).name;
        updatedHeadersObject.push(res as IHeaderObject)
      }

    }
    this.headersObject = updatedHeadersObject;
    this.tableColumnsToDisplay = displayedColumns;
    this.dataSource = new MatTableDataSource<any>(updatedImportedData);
    this.approved = true;
    this.buttonToShow = this.buttonToShowEnum.SUBMIT;
  }

  submit(): void {
    for (let check of this.dataSource.data) {
      check.userId = 4;
      this.checkService.addCheck(check as Check).subscribe((res: IResponse) => {
        if (res.success) {
          // this.toastr.success("");
        } else {
          // this.toastr.error(res.message);
        }
      }, err => {
        // this.toastr.error(this.errorMessage);
      });
    }
  }
}
