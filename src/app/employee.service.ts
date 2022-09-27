import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

  loadEmpData():Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:3000/employees")
  }

  storeEmpData(employee:any):Observable<Employee>{
    return this.http.post<Employee>("http://localhost:3000/employees",employee)
  }

  delete(id:any):Observable<any>{
    return this.http.delete<any>("http://localhost:3000/employees/"+id);
  }

  updateEmp(id:any,employee:any):Observable<Employee>{
    return this.http.put<Employee>("http://localhost:3000/employees/"+id,employee);
  }

}
