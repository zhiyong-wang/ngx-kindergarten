import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl, AbstractControlDirective} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import { Moment} from 'moment';
import { MatTableDataSource} from '@angular/material/table';
import {DataService} from './../../data.service'



export const MY_FORMATS = {  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AttendanceListComponent implements OnInit {
  
  attendanceForm = new FormGroup({
    selectMonth: new FormControl(moment()),
    selectClass: new FormControl(''),
  });


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.attendanceForm.get('selectMonth').value;
    ctrlValue.year(normalizedYear.year());
    this.attendanceForm.get('selectMonth').setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.attendanceForm.get('selectMonth').value;
    ctrlValue.year(normlizedMonth.year()); 
    ctrlValue.month(normlizedMonth.month());
    this.attendanceForm.get('selectMonth').setValue(ctrlValue);
    datepicker.close();
   
  }
  
holidayOfMonth=[]
async onSubmit():Promise<void>{
  let classId=this.attendanceForm.get("selectClass").value
  let selectDate=moment(this.attendanceForm.get("selectMonth").value)
  console.log(selectDate)
  let startDate=moment(this.attendanceForm.get("selectMonth").value).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()
  let endDate=moment(this.attendanceForm.get("selectMonth").value).date(31).hour(24).minute(0).second(0).millisecond(0).valueOf()
 console.log(startDate)
 console.log(endDate)
 let studentsInClass
  this.holidayOfMonth=[]
  await this.dataService.getHolidayOfMonth(startDate,endDate)
    .subscribe(data => {
      console.log(data)
      for(let d of data){
      this.holidayOfMonth.push(d.date)}
    }

    )
console.log(this.holidayOfMonth)
  await  this.dataService.getStudents({"classId":classId})
      .subscribe(data=>{
      //  console.log(data)
        studentsInClass=data   
        for(let student of studentsInClass){
          student.absence=[]
          this.dataService.getAttendanceForMonth(student.id,startDate,endDate)
          .subscribe(list=>{   
               for(let att of list){  
                student.absence.push(moment(att.day).date().toString()) 
            }
          }          
        )
      } 
      this.dataSource=new MatTableDataSource<any>(studentsInClass);   
      })  
      this.setDateCol(selectDate)    
}


  dataSource=new MatTableDataSource<any>();
  classes=[]
  dateCol:string[]=[]
  displayedColumns: string []
  week=['日','一','二','三','四','五','六']
  weekday=[]

  setDateCol(date:Moment):void{
    this.dateCol=[]
    this.weekday=[]
    let selectDate=date
    let year=selectDate.year()
    let month=selectDate.month()+1
    let days
    if([4,6,9,11].includes(month)){days=30}else{days=31}
    if(month==2){days=28}
    if(month==2&&selectDate.isLeapYear()){days=29}
    for(let i=1;i<=days;i++){
      this.dateCol.push(i.toString())

      this.weekday.push(this.week[(moment().set({"year":year,"month":month-1,"date":i})).day()])
    }
    console.log(this.weekday)
    this.displayedColumns = ['position', 'name'] .concat(this.dateCol)


  }

  isHoliday(ri):boolean{
    let selectDate=moment(this.attendanceForm.get("selectMonth").value)
    let year=selectDate.year()
    let month=selectDate.month()+1
    let date=moment().set({"year":year,"month":month-1,"date":ri,"hour":0,"minute":0,"second":0,"millisecond":0})
    return  ((moment(date).day()==0||moment(date).day()==6)&&!this.holidayOfMonth.includes(moment(date).valueOf()))||(moment(date).day()!=0&&moment(date).day()!=6&&this.holidayOfMonth.includes(moment(date).valueOf()))
 }


  constructor(private dataService:DataService) { }
  ngOnInit(): void {
    this.dataService.getClasses().subscribe(data=>this.classes=data)
    this.setDateCol(moment())
  
  }

}
