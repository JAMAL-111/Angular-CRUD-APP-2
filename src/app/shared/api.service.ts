import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../Models/Teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl="http://localhost:3000/teachers";

  GetAllTeachers(): Observable<Teacher[]>{
      return this.http.get<Teacher[]>(this.apiurl);
  }

  GetTeacherById(id:any): Observable<Teacher>{
    return this.http.get<Teacher>(this.apiurl+'/'+id);
  }

  DeleteTeacherById(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }

  UpdateTeacher(id:any,teacherdata: any) {
    return this.http.put(this.apiurl+'/'+id, teacherdata);
  }

  AddTeacher(teacherdata: any){
    return this.http.post(this.apiurl, teacherdata);
  }
}
