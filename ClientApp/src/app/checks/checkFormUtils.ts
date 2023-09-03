import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateCheckForm} from "./static";
import {IAddCheckComponentData} from "../models/interfaces/modalData";

export class CheckForm {
  formInputs = CreateCheckForm();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  createForm(data: IAddCheckComponentData = null) {
    const check = data ? data.check : null;
    this.form = this.fb.group({
      checkNumber: [{value: check ? check.checkNumber : null, disabled: data.isEditMode}, [Validators.required]],
      amount: [check ? check.amount : null, [Validators.required, Validators.min(0)]],
      recipient: [check ? check.recipient : null, [Validators.required]],
      notes: [check ? check.notes : null],
      depositDate: [check ? check.depositDate : null],
      cashDate: [check ? check.cashDate : null, [Validators.required]],
      isCashed: [check ? check.isCashed : false, [Validators.required]],
      userId: [check ? 4 : null, [Validators.required]],
    });
    this.formInputs = CreateCheckForm();
  }
}
