import {Component, Inject, OnInit} from '@angular/core';
import {CheckForm} from "../checkFormUtils";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CheckService} from "../../services/check.service";
import {IResponse} from "../../../shared";
import {IAddCheckComponentData} from "../../models/interfaces/modalData";


@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrls: ['./add-check.component.css']
})
export class AddCheckComponent extends CheckForm implements OnInit {
  recipients: Set<string>;
  recipientsAfterFilter: any[];
  isEditMode: boolean;

  //region Mode Attributes
  dialogTitle: string;
  submitButtonText: string;
  serviceMethod: string;
  successMessage: string;
  errorMessage: string;

  //endregion

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAddCheckComponentData,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private checkService: CheckService,
              private dialogRef: MatDialogRef<AddCheckComponent>
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.initModeData();
    this.recipients = this.data.recipients;
    this.recipientsAfterFilter = [...this.recipients];
    this.createForm(this.data);
  }

  initModeData() {
    this.isEditMode = this.data.isEditMode;
    if (this.isEditMode) {
      this.serviceMethod = 'editCheck';
      this.dialogTitle = 'Modifier le cheque';
      this.submitButtonText = 'Modifier';
      this.successMessage = 'Cheque modifié avec succès';
      this.errorMessage = 'Erreur lors de la modification du cheque';
    } else {
      this.serviceMethod = 'addCheck';
      this.dialogTitle = 'Ajouter un cheque';
      this.submitButtonText = 'Ajouter';
      this.successMessage = 'Cheque ajouté avec succès';
      this.errorMessage = 'Erreur lors de l\'ajout du cheque';
    }
  }

  getNaiveDate(date: Date) {
    if (typeof date === 'string') return date;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(Date.UTC(year, month, day));
  }


  onSubmit() {
    let form = this.form.getRawValue()
    console.log(form)
    form.cashDate = form.cashDate = this.getNaiveDate(form.cashDate);
    form.depositDate ? form.depositDate = this.getNaiveDate(form.depositDate) : null;
    console.log(form)
    this.checkService[this.serviceMethod](form).subscribe((res: IResponse) => {
      if (res.success) {
        this.toastr.success(this.successMessage);
        this.form.reset();
        this.dialogRef.close({success: true});
      } else {
        this.toastr.error(res.message);
      }
    }, err => {
      this.toastr.error(this.errorMessage);
      this.dialogRef.close({success: false});
    });
  }

  filterRecipients(event: any) {
    const recipientsArray = Array.from(this.recipients); // Convert Set to array
    this.recipientsAfterFilter = recipientsArray
      .filter(recipient => recipient.toLowerCase().includes(event.target.value.toLowerCase()));
  }
}
