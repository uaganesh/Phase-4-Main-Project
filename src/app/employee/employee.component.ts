import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormGroup,FormControl } from "@angular/forms";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empRef = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl()
  })

  employees:Array<Employee>=[]

  constructor(public es:EmployeeService,public router:Router) { }

  ngOnInit(): void {
    this.loadEmpDetails();
  }

  loadEmpDetails(){
    this.es.loadEmpData().subscribe({
      next:(data:any)=>this.employees=data,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("Completed")     
    })
  }

  storeEmp(){
    let employee = this.empRef.value;
    this.es.storeEmpData(employee).subscribe({
      next:(data:any)=>console.log(data),
      error:(error:any)=>console.log(error),
      complete:()=>this.loadEmpDetails()
    })
    this.empRef.reset();
  }

  viewDetails(employee:any){
    sessionStorage.setItem("empInfo",JSON.stringify(employee));
    this.router.navigate(["employee-operation"]);
  }

}
