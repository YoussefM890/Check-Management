import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateCheckForm} from "./static";
import {IAddCheckComponentData} from "../models/interfaces/modalData";
import {CheckFormErrors} from "../models/form-errors";
import {CheckValidationMessages} from "../models/validation-messages";

export class CheckForm {
  formInputs = CreateCheckForm();
  form: FormGroup;
  formErrors = CheckFormErrors;
  validationMessages = CheckValidationMessages;

  constructor(private fb: FormBuilder) {
  }

  createForm(data: IAddCheckComponentData = null) {
    const check = data ? data.check : null;
    this.form = this.fb.group({
      checkId: [check ? check.checkId : null],
      checkNumber: [check ? check.checkNumber : null, [Validators.pattern('^[0-9]*$'), Validators.min(0)]],
      amount: [check ? check.amount : null, [Validators.required, Validators.min(0)]],
      recipient: [check ? check.recipient : null, [Validators.required]],
      notes: [check ? check.notes : null],
      depositDate: [check ? check.depositDate : null],
      cashDate: [check ? check.cashDate : null, [Validators.required]],
      isCashed: [check ? check.isCashed : false, [Validators.required]],
      userId: [check ? check.userId : null],
    });
    this.form.valueChanges.pipe().subscribe((data) => {
      this.onValueChanged();
    });
    this.formInputs = CreateCheckForm();
  }

  onValueChanged() {
    if (!this.form) {
      return;
    }
    const form = this.form;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.touched && !control.valid) {
          // console.log("field " ,field)
          const messages = this.validationMessages[field];
          // console.log("messages " ,messages)
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              // console.log("key" ,key)
              this.formErrors[field] += messages[key] + ' ';
              // console.log("formErrors" ,this.formErrors)
            }
          }
        }
      }
    }
    if (this.form.valid) {
      console.log('form valid')
    }
  }
}
