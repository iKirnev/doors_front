import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DoorService } from '../../door.service';
import {TranslateService} from '@ngx-translate/core';
declare const $: any;

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
    private doorService: DoorService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('350px');
  }

  onSend(): void {
    this.phoneFormControl.markAsTouched();
    if (this.phoneFormControl.hasError('required')) return;
    this.dialogRef.close();
    this.notify();
    this.doorService.order(this.nameFormControl.value, `+7${this.phoneFormControl.value}`, window.location.href)
      .subscribe(res => {
      });
  }
  notify(): void {
    let from = 'top';
    let align = 'right';
    let type = 'info';
    let message = this.translate.instant('doors.order-dialog.sent');

    $.notify({
      message: message,
    }, {
      placement: {from, align},
      offset: {x: 20, y: 35},
      type,
      template: `<div class="alert alert-{0} alert-with-icon col-md-4">
          <i class="material-icons alert-icon">notifications</i>
          <span>{2}</span>
        </div>`
    });
  }
}