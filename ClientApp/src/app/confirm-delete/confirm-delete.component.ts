import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DeleteService} from "../services/delete.service";
import {IConfirmDeleteComponentData} from "../models/interfaces/modalData";
import {IResponse} from "../../shared";

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDeleteComponentData,
              private deleteService: DeleteService,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleteService[this.data.serviceName](this.data.deleteId, this.data.path).subscribe(
      (res: IResponse) => {
        if (res.success) {
          this.toastr.success(`${this.data.successMessage} supprimée avec succès`);
          this.dialogRef.close({success: true});
        } else {
          this.toastr.error(res.message);
          this.dialogRef.close({success: false});
        }
      },
      (err) => {
        this.toastr.error("Un problème est survenu. veuillez réessayer plus tard.");
        this.dialogRef.close({success: false});
      }
    )
  }

}
