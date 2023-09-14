import {Component, OnInit} from '@angular/core';
import {CheckService} from "../helpers/services/check.service";
import {IResponse} from "../../shared";
import {AccordionData, StatusFilter, TableColumn} from "./static";
import {MatDialog} from "@angular/material/dialog";
import {AddCheckComponent} from "./add-check/add-check.component";
import {ToastrService} from "ngx-toastr";
import {IFilter, IOption} from "../models/interfaces/global";
import {ImportChecksComponent} from "./import-checks/import-checks.component";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {
  checksByMonthAfterFilter = [[], [], [], [], [], [], [], [], [], [], [], []];
  globalSearchQuery = '';
  allChecks: any[];
  allChecksAfterFilter: any[] = [];
  accordionData = AccordionData;
  tableColumns = TableColumn;
  recipients: Set<string> = new Set<string>();
  tableColumnsToDisplay: string[];
  sumCashed: number;
  sumNotCashed: number;
  sumCashedByMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  sumNotCashedByMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  allFilters: IFilter = {status: StatusFilter}
  selectedFilters: { [key: string]: IOption } = {status: this.allFilters.status[0]}
  displayType = 'grouped';

  constructor(private checkService: CheckService,
              private dialog: MatDialog,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getAllChecks();
    this.tableColumnsToDisplay = this.tableColumns.map(column => column.prop)//for the angular material table
    this.tableColumnsToDisplay.push('actions');
  }

  getAllChecks() {
    this.checkService.getAllChecks().subscribe((res: IResponse) => {
      if (!res.success) {
        this.toastr.error("Une erreur est survenue lors de la récupération des chèques. Veuillez réessayer plus tard.");
        return;
      }
      this.allChecks = res.data;
      this.allChecksAfterFilter = [...this.allChecks]
      this.separateChecksByMonth();

    });
  }

  separateChecksByMonth() {
    this.checksByMonthAfterFilter = [[], [], [], [], [], [], [], [], [], [], [], []];
    this.sumCashedByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.sumNotCashedByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let check of this.allChecksAfterFilter) {
      let monthIndex = new Date(check.cashDate).getMonth();
      this.sumCashedByMonth[monthIndex] += check.isCashed ? check.amount : 0;
      this.sumNotCashedByMonth[monthIndex] += !check.isCashed ? check.amount : 0;
      this.checksByMonthAfterFilter[monthIndex].push(check);
      this.checksByMonthAfterFilter[monthIndex] = [...this.checksByMonthAfterFilter[monthIndex]];
    }
    this.calculateSums();
  }

  handleIsDepositedChange(element: any): void {
    this.checkService.setCheckDepositDate(element.checkId).subscribe((res: IResponse) => {
      if (res.success) {
        element.depositDate = res.data.depositDate;
      } else {
        this.toastr.error(res.message);
      }
    }, err => {
      this.toastr.error("Erreur lors de la modification de la date de dépôt");
    });
  }

  setCheckAsCashed(element: any): void {
    this.checkService.setCheckAsCashed(element.checkId).subscribe((res: IResponse) => {
      if (res.success) {
        element.isCashed = res.data.isCashed;
        if (res.data.depositDate) element.depositDate = res.data.depositDate;
        element.isCashed ? this.sumCashed += element.amount : this.sumCashed -= element.amount;
        element.isCashed ? this.sumNotCashed -= element.amount : this.sumNotCashed += element.amount;
        element.isCashed ? this.sumCashedByMonth[new Date(element.cashDate).getMonth()] += element.amount : this.sumCashedByMonth[new Date(element.cashDate).getMonth()] -= element.amount;
        element.isCashed ? this.sumNotCashedByMonth[new Date(element.cashDate).getMonth()] -= element.amount : this.sumNotCashedByMonth[new Date(element.cashDate).getMonth()] += element.amount;
      } else {
        this.toastr.error(res.message);
      }
    }, err => {
      this.toastr.error("Erreur lors de la modification de la date de dépôt");
    });
  }

  checksFilter(statusFilter = null): void {
    //apply global search
    let res = [...this.allChecks];
    if (this.globalSearchQuery !== '') res = this.allChecks.filter(check => this.objectSearch(check, this.globalSearchQuery));
    //apply status filter
    if (statusFilter !== null) {
      this.selectedFilters['status'] = this.allFilters['status'].find(option => option.value === statusFilter);
    }
    statusFilter = this.selectedFilters['status'].value;
    if (statusFilter !== '0') {
      statusFilter === '1' ? res = res.filter(check => check.isCashed) : res = res.filter(check => !check.isCashed);
    }

    this.allChecksAfterFilter = res;
    this.separateChecksByMonth();
  }

  objectSearch(object: any, query: string): boolean {
    for (let prop in object) {
      if (object[prop] && object[prop].toString().toLowerCase().includes(query.toLowerCase())) return true;
    }
    return false;
  }

  openCheckDialog(isEditMode: boolean, element = null): void {
    this.fillRecipients();
    const ref = this.dialog.open(AddCheckComponent, {
      width: '600px',
      height: '510px',
      data:
        {
          recipients: this.recipients,
          isEditMode: isEditMode,
          check: element,
        }
    });
    ref.afterClosed().subscribe((res: any) => {
      if (res?.success) {
        this.getAllChecks()
      }
    });
  }

  openImportCheckDialog(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const ref = this.dialog.open(ImportChecksComponent, {
      panelClass: 'fullscreen-dialog',
    });
    ref.afterClosed().subscribe((res: any) => {
      if (res?.success) {
        this.getAllChecks()
      }
    });
  }

  fillRecipients() {
    this.allChecks.forEach(check => {
      this.recipients.add(check.recipient);
    });
  }

  openDeleteCheckDialog(element: any): void {
    const ref = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      height: '150px',
      data: {
        serviceName: 'deleteCheck',
        deleteId: element.checkId,
        successMessage: 'chèque',
        path: 'checks'
      }
    });
    ref.afterClosed().subscribe((res: any) => {
      if (res?.success) {
        this.getAllChecks()
      }
    });
  }

  calculateSums() {
    this.sumCashed = this.allChecks.filter(check => check.isCashed).reduce((acc, check) => acc + check.amount, 0);
    this.sumNotCashed = this.allChecks.filter(check => !check.isCashed).reduce((acc, check) => acc + check.amount, 0);
  }
}
