import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Observable,of} from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import * as moment from 'moment';
import {DataService} from './../../data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class TeacherDetailComponent implements OnInit {

  teacherForm = this.fb.group({
    name: ["",Validators.required],
    sex: ["",Validators.required],
    id_number:["",[Validators.required, Validators.pattern('^[0-9]{18}$|(^[0-9]{17}([0-9]|X|x))$')],this.uniqueTeacherValidator()],
    phone: ["",[Validators.required,Validators.pattern('[0-9]*')]],
    educational:["",Validators.required],
    university:["",Validators.required],
    specialty:["",Validators.required],
    enter_date:["",Validators.required],
})
uniqueTeacherValidator(): AsyncValidatorFn {
  return (control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
    if(this.teacher){ return of(null)}
    else{
    return this.dataService.isTeacherExist(control.value)
    .pipe(      
      map(teachers => {console.log(teachers[0]) 
        let isTaken
        if(teachers.length>0){
          this.errorIdNumberName=teachers[0].name
          isTaken=true}
       return isTaken ? { uniqueStudent: true } : null}
      ),
      catchError(() => of(null))
    );
    }
  }
 }
getErrorMessage(xm) {
  if(xm=="id_number"){
    let id_number=this.teacherForm.get('id_number')
    if (id_number.hasError('required')) return '必须填写身份证号码！'
    if (id_number.hasError('pattern')) return '身份证号码不符合规范！'
    if (id_number.hasError('uniqueStudent')) return '身份证号码已存在，与“'+this.errorIdNumberName+'”重复！'
  }
  if(xm=="phone"){
    let phone=this.teacherForm.get('phone')
    return phone.hasError('required') ? '必须填写联系电话！' :(phone.hasError('pattern') )? '电话号码应为数字！' :'';
  }

}




teacher
errorIdNumberName=''
status='add' //'modify','view';

onSubmit():void{
let now_teacher=this.teacherForm.value
now_teacher.enter_date=moment(now_teacher.enter_date.toISOString()).valueOf()
if(this.teacher){
  now_teacher.id=this.teacher.id
this.dataService.modifyTeacher(now_teacher)
   .subscribe(data=>{
    if (data==true){
      console.log("ok")
      this.teacherForm.reset({"enter_date":new Date()})    }
  })  
}
else{this.dataService.addTeacher(now_teacher)
    .subscribe(data=>{
      if (data==true){
        console.log("ok")
        this.teacherForm.reset({"enter_date":new Date()})    }
 })
}
}

setTeacherForm(id):void{
  if(id){
    this.status="modify"
    this.dataService.getTeacher(id)
    .subscribe(data=>{
      console.log(data)
      this.teacher=data
      let enter_date=moment(this.teacher.enter_date).local()
      this.teacherForm.setValue({"name":this.teacher.name,"sex":this.teacher.sex,"id_number":this.teacher.id_number,"phone":this.teacher.phone,"educational":this.teacher.educational,"university":this.teacher.university,"specialty":this.teacher.specialty,"enter_date":enter_date})
      this.teacherForm.get('id_number').disable()
    })
  }
  else
    {
    this.teacherForm.reset({"enter_date":new Date()})
    }
  }

constructor( private fb: FormBuilder,
private dataService :DataService,
private route: ActivatedRoute,

){ }

ngOnInit(): void {
const id = this.route.snapshot.paramMap.get('id');    
this.setTeacherForm(id)
}

}
