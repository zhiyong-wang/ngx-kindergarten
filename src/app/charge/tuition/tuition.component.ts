import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl, AbstractControlDirective} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Observable } from 'rxjs'

import * as moment from 'moment';
import { Moment} from 'moment';
import { MatTableDataSource} from '@angular/material/table';
import {DataService} from './../../data.service'

import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';



const startOfMonth=1

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
  selector: 'app-tuition',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TuitionComponent implements OnInit {

    tuitionForm = new FormGroup({
    selectMonth: new FormControl(moment()),
    selectClass: new FormControl(''),
  });


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.tuitionForm.get('selectMonth').value;
    ctrlValue.year(normalizedYear.year());
    this.tuitionForm.get('selectMonth').setValue(ctrlValue);
    this.getCountOfWorkDays(ctrlValue)
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.tuitionForm.get('selectMonth').value;
    ctrlValue.year(normlizedMonth.year()); 
    ctrlValue.month(normlizedMonth.month());
    this.tuitionForm.get('selectMonth').setValue(ctrlValue);
    datepicker.close();
    this.getCountOfWorkDays(ctrlValue)
   
  }
  
  getDaysOfMonth(year:number,month:number):number{
    if([4,6,9,11].includes(month)){return 30}
    if([1,3,7,8,10,12].includes(month)){return 31}
    if(month==2&&moment([year]).isLeapYear()){return 29}
    else{return 28}
    
  }


  async onSubmit():Promise<void>{
    let classId=this.tuitionForm.get("selectClass").value
    let selectDate=moment(this.tuitionForm.get("selectMonth").value)
    console.log(selectDate)
    let year=selectDate.year()
    let month=selectDate.month()

    let startDate=moment().year(year).month(month).date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()
    let endDate=moment().year(year).month(month+1).date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()
   console.log(startDate)
   console.log(endDate)
   

    let studentsInClass
    this.dataService.getStudents({ "classId": classId })
      .subscribe(data =>{
        //  console.log(data)
        studentsInClass = data;
        for (let student of studentsInClass) {
           student.countOfAbsence=[]
           student.paid=0
           student.tuitionOfBack=0
           student.meals=this.meals
           student.mealsOfBack=0
          this.dataService.getTuitions(student.id,startDate)
              .subscribe(data=>{
                 for(let item of data){
                 console.log(item)
                 if(item.chargename=='tuition'){student.tuition=item.paid}
                 if(item.chargename=='tuitionOfBack'){student.tuitionOfBack=item.paid}
                 if(item.chargename=='meals'){student.meals=item.paid}
                 if(item.chargename=='mealsOfBack'){student.mealsOfBack=item.paid}
                 student.paid=student.paid+item.paid
                 }

              })


          this.dataService.getAttendanceForMonth(student.id,startDate,endDate)
              .subscribe(list=>{   
                student.countOfAbsence=list.length
                if(student.paid==0){
                student.mealsOfBack=-(this.mealsOfDay*student.countOfAbsence)
                if(student.mealsOfBack>student.meals){student.mealsOfBack=student.meals}
                if(student.countOfAbsence>this.countOfWorkDays){
                  console.log('countOfWorkDays'+this.countOfWorkDays)
                  student.tuitionOfBack=-student.tuition/2
                }
                else{student.tuitionOfBack=0}  
              }
                student.shouldPay=student.tuition+student.meals+student.tuitionOfBack+student.mealsOfBack

            }   
                
            )
        }
        this.dataSource = new MatTableDataSource<any>(studentsInClass);
      })  
  
  }
  countOfWorkDays=0
  classes=[]
  dataSource
  displayedColumns = ['position', 'name','workdays','countOfAbsence','tuition','meals','tuitionOfBack','mealsOfBack','shouldPay','paid','do']
  meals=310
  mealsOfDay=14.5

getCountOfWorkDays(selectDate):void{
  let date=moment(selectDate)
  console.log(selectDate)
  let year=date.year()
  let month=date.month()

  let startDate=moment().year(year).month(month).date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()
  let endDate=moment().year(year).month(month+1).date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()

    let millisecondsOfDay=86400000
    console.log(millisecondsOfDay)
    this.countOfWorkDays=0
    var d=0
    for(let date=startDate;date<endDate;date=date+millisecondsOfDay)
      { d=d+1
        if(moment(date).day()!=0&&moment(date).day()!=6){
          this.countOfWorkDays=this.countOfWorkDays+1

        }
      }
      console.log("d="+d)

 //   console.log(countOfWorkDays)
  this.dataService.getHolidayOfMonth(startDate, endDate)
    .subscribe((holidays) => {
      console.log(holidays)
      for (let holiday of holidays) {
        console.log(moment(holiday.date).day());
        if (moment(holiday.date).day() != 0 && moment(holiday.date).day() != 6) {
          this.countOfWorkDays = this.countOfWorkDays - 1;
        }
        else {
          this.countOfWorkDays = this.countOfWorkDays + 1;
        }
      }
    })
    
 }


 saveTuitionPaid(student):void{
  let selectDate=moment(this.tuitionForm.get("selectMonth").value)

  let month=selectDate.date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()
  let {id,tuition,tuitionOfBack,mealsOfBack}=student
  let data={studentId:id,tuition:tuition,tuitionOfBack:tuitionOfBack,meals:this.meals,mealsOfBack:mealsOfBack,month:month}
   console.log(data)
  let contents="确定收取"+name+"学费"+(data.tuition+data.tuitionOfBack)+"元,餐费"+(data.meals+data.mealsOfBack)+"元，共"+(data.tuition+data.tuitionOfBack+this.meals+data.mealsOfBack)+"元？"
  this.openDialog(contents).subscribe(result=>{
  if(result){
    this.dataService.saveTuitionPaid(data)
  .subscribe(data=>{
     if(data==true){
       contents="收款信息已保存，是否打印收据？"
      this.openDialog(contents).subscribe(result=>{
        if(result){}

     })
    }
  })
}})
}

deleteTuitionPaid(student):void{
  let selectDate=moment(this.tuitionForm.get("selectMonth").value)

  let month=selectDate.date(startOfMonth).hour(0).minute(0).second(0).millisecond(0).valueOf()
   let data={studentId:student.id,month:month}
   console.log(data)
  let contents="确定删除"+name+"本月缴费信息？"
  this.openDialog(contents).subscribe(result=>{
  if(result){
    this.dataService.deleteTuitionPaid(data)
  .subscribe(data=>{
     if(data==true){
        contents="收款信息已删除。"
        console.log("content")
        this.onSubmit()
    }
  })
}})
}

  openDialog(contents): Observable<boolean> {
    const dialogRef = this.dialog.open(MyDialogComponent, {
    //  width: '250px',
      data: {title: "提示", contents: contents}
    });  
    return dialogRef.afterClosed()
    .pipe(result=> {
      return result        
    }
    )
  }




  constructor(private dataService:DataService,

    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.getClasses().subscribe(data=>this.classes=data)
    const ctrlValue = this.tuitionForm.get('selectMonth').value;
    this.getCountOfWorkDays(ctrlValue)

  }

}
