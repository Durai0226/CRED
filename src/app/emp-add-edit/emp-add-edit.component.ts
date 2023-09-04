import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../core/service.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['Metric', 'Diploma', 'Degree'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _core:ServiceService,
    @Inject(MAT_DIALOG_DATA ) public data:any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this._empService.editEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._core.openSnackBar('Employee Edited', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
      else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._core.openSnackBar('Employee Added', 'done')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
   
    }
  }
  onClose() {
    this._dialogRef.close();
  }
}
