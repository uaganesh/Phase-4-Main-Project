import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  constructor(public es:EmployeeService,public router:Router) { }
  employee:any;

  empuRef = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl()
  })

  ngOnInit(): void {
    let obj = sessionStorage.getItem("empUpd");
    if(obj != null){
        this.employee= JSON.parse(obj);
    }
  }

  ViewAll(){
    this.router.navigate(["employees"])
  }

  updateEmpDetails(){
    let employee = this.empuRef.value;
    let id = this.empuRef.value.id;
    this.es.updateEmp(id,employee).subscribe({
      next:(data:any)=>this.employee=data,
      error:(error:any)=>console.log(error),
      complete:()=>this.ViewAll()
    })
  }

}
