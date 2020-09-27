import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import {DataService} from './../../data.service.js'
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {

  year
  month
  dates=[]
  holidayOfMonth=[]

 lastMonth(){
   this.month=this.month-1
   if(this.month==0){
   this.year=this.year-1
   this.month=12
  }
  this.setCalendar(this.year,this.month)
 }
 nextMonth(){
    this.month=this.month+1
    if(this.month==13){
    this.year=this.year+1
    this.month=1
   }
   this.setCalendar(this.year,this.month)
 
  }



  setCalendar(year,month):void{
    this.dates=[]
    let last_date
    if([4,6,9,11].includes(month)){last_date=30}
    else{last_date=31}
    if(month==2){last_date=28}
    if(month==2&&moment([year]).isLeapYear()){last_date=29}
    for(let i=1;i<=last_date;i++){
    this.dates.push({value:moment().year(year).month(month-1).date(i).hour(0).minutes(0).second(0).millisecond(0).toISOString(),view:i})
  }
    var firstDay=moment(this.dates[0].value)
    for(let j=(firstDay.day()==0?6:firstDay.day()-1);j>0;j--){
      firstDay=firstDay.subtract(1, 'days')
      this.dates.unshift({value:firstDay.toISOString(),view:moment(firstDay).date()})    
    }
    var endDay=moment(this.dates[this.dates.length-1].value)
    for(let j=endDay.day()+1;j<=7&&j!=1;j++){    
      endDay=endDay.add(1, 'days')
      this.dates.push({value:endDay.toISOString(),view:moment(endDay).date()})
      } 
    console.log(this.dates)
 this.getHolidayOfMonth(this.dates[0].value,this.dates[this.dates.length-1].value)
  }

  isHoliday(date):boolean{
     return  ((moment(date).day()==0||moment(date).day()==6)&&!this.holidayOfMonth.includes(moment(date).valueOf()))||(moment(date).day()!=0&&moment(date).day()!=6&&this.holidayOfMonth.includes(moment(date).valueOf()))
  }
  changeHoliday(date):void{
    console.log(date.valueOf())
    for(let i=0;i<=this.holidayOfMonth.length;i++){
      if(i==this.holidayOfMonth.length){
        this.holidayOfMonth.push(moment(date).valueOf())
        console.log(this.holidayOfMonth)
        return
      }
      if (this.holidayOfMonth[i]==moment(date).valueOf()){
        this.holidayOfMonth.splice(i,1)
        console.log(this.holidayOfMonth)
        return
      }      
    }
    

  }
  getHolidayOfMonth(firstDate:string,lastDate:string):void{
    this.holidayOfMonth=[]
    this.dataService.getHolidayOfMonth(moment(firstDate).valueOf(),moment(lastDate).valueOf())
      .subscribe(data => {
        console.log(data)
        for(let d of data)
        this.holidayOfMonth.push(d.date)
      });
  }
  modifyHolidayOfMonth():void{
    let firstDate=this.dates[0].value
    let lastDate=this.dates[this.dates.length-1].value
    console.log(firstDate)
    console.log(lastDate)
    this.dataService.modifyHolidayOfMonth(this.holidayOfMonth,moment(firstDate).valueOf(),moment(lastDate).valueOf())
    .subscribe(data => {
     this.message=data
    });

  }

  
message


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.year=moment().year()
    this.month=moment().month()+1
    this.setCalendar(this.year,this.month)
  }


}
