import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DataService} from './../../data.service'
import{Student,ClassModel,Attendance}from './../../model'
import * as moment from 'moment'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AttendanceComponent implements OnInit {

 
  
 attendanceForm = new FormGroup({
    selectDate: new FormControl(''),
    selectClass: new FormControl(''),
  });

  studentsInClass:Student[]=[]
  classes:ClassModel[]

async onSubmit():Promise<void>{
    let classId=this.attendanceForm.get("selectClass").value
    let selectDate=moment(this.attendanceForm.get("selectDate").value).hour(8).minute(0).second(0).millisecond(0).valueOf()
    console.log(selectDate)
    console.log(moment(this.attendanceForm.get("selectDate").value).valueOf())
 //   await   this.dataService.getAttendance({classId,selectDate})
  //      .subscribe(data=>{this.attendance=data})

    this.dataService.getStudents({"classId":classId})
        .subscribe(data=>{
          console.log(data)
          this.studentsInClass=data
          for(let student of this.studentsInClass){
            console.log(student.id)
            this.dataService.getAttendance(student.id,selectDate).subscribe(data=>
             {console.log(data)
              student.attendance=(data?"no":"yes")
          })
        }
        console.log(this.studentsInClass)
        })

  }

  saveAttendance():void{
    let attendance=[]
    let selectDate=moment(this.attendanceForm.get("selectDate").value).hour(8).minute(0).second(0).millisecond(0).valueOf()
    for(let student of this.studentsInClass ){
      attendance.push({studentId:student.id,day:selectDate,isAttendance:(student.attendance=="yes")})
    } 
    this.dataService.modifyAttendance(attendance)
      .subscribe(data=>{console.log(data)})

  }



  constructor(private dataService:DataService) { }
  ngOnInit(): void {
    this.dataService.getClasses()
      .subscribe(data=>this.classes=data)

    this.attendanceForm.get("selectDate").setValue(new Date())
}
}
