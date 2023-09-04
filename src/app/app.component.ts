import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from './core/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _core:ServiceService
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  openAddDialog() {
    const dialogRef= this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getEmployees()
        }
      }
    })
  }
  getEmployees() {
    this._empService.getEmployees().subscribe({
      next: (res) => {
  this.dataSource=new MatTableDataSource(res);
  this.dataSource.sort=this.sort
  this.dataSource.paginator=this.paginator
  
      },
      error: () => {},
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
  this._empService.deleteEmployee(id).subscribe({
    next:(res)=> {
this._core.openSnackBar('Employee Deleted', 'done')
this.getEmployees()
    },
    error:(err)=>{

    }
  })
  }

  openEditDialog(data:any) {
   const dialogRef= this._dialog.open(EmpAddEditComponent,{
    data,
   });
   dialogRef.afterClosed().subscribe({
    next: (val:any) =>{
      if(val){
this.getEmployees()
      }
    }
   })
  
  }

}

