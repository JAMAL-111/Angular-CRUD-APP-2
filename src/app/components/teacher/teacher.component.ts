import { Component, OnInit, inject } from '@angular/core';
import { Teacher } from 'src/app/Models/Teacher';
import { PopupComponent } from '../popup/popup.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{

  constructor(private dialog:MatDialog, private api:ApiService){}
  //defining the datasource
  teacherdata!:Teacher[];

  ngOnInit():void{
    this.LoadTeacher();
  }

  //columns to display
  displayColumns :string[]=["id","firstName","middleName", "lastName", "gender","phoneNumber","email","address","action"];

  Openpopup(id:any){
    const _popup = this.dialog.open(PopupComponent,{
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        id:id
      }
    })
    _popup.afterClosed().subscribe(r=>{
      this.LoadTeacher();
    })
  }

  LoadTeacher(){
    this.api.GetAllTeachers().subscribe(response=>{
      this.teacherdata = response;
    })
  }

  EditTeacher(id:any){
    //opening popup
    this.Openpopup(id);
  }

  RemoveTeacher(id:any){
    this.api.DeleteTeacherById(id).subscribe(res=>{
      this.LoadTeacher();
    });
  }
}
