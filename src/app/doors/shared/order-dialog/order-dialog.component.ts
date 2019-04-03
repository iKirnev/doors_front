import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DoorService } from '../../door.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}


@Component({
  selector: 'order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  nameFormControl = new FormControl();
  phoneFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private doorService: DoorService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('350px');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSend(): void {
    this.phoneFormControl.markAsTouched();
    if (this.phoneFormControl.hasError('required')) return;
    this.dialogRef.close();
    this.doorService.order(this.nameFormControl.value, `+7${this.phoneFormControl.value}`, window.location.href)
      .subscribe(res => {

      });
  }
}