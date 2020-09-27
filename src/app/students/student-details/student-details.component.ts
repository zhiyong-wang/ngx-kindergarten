import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Observable,of} from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import * as moment from 'moment'
import {DataService} from './../../data.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class StudentDetailsComponent implements OnInit { 

    studentForm = this.fb.group({
        name: ["",Validators.required],
        sex: ["",Validators.required],
        id_number:["",[Validators.required, Validators.pattern('^[0-9]{18}$|(^[0-9]{17}([0-9]|X|x))$')],this.uniqueStudentValidator()],
        address: ["",Validators.required],
        contacts1:["",Validators.required],
        con1_name:["",Validators.required],
        con1_phone:["",[Validators.required,Validators.pattern('[0-9]*')]],
        contacts2:[""],
        con2_name:[""],
        con2_phone:["",Validators.pattern('[0-9]*')],      
        tuition:["",[Validators.required,Validators.pattern('[0-9]*')]],
        deposit:["",[Validators.required,Validators.pattern('[0-9]*')]],
        enter_date:["",Validators.required],
        classId:[""],
    })
  uniqueStudentValidator(): AsyncValidatorFn {
      return (control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
        if(this.student['id']){ return of(null)}
        else{
        return this.dataService.isStudentExist(control.value)
        .pipe(      
          map(students => {console.log(students[0]) 
            let isTaken
            if(students.length>0){
              this.errorIdNumberName=students[0].name
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
      let id_number=this.studentForm.get('id_number')
      if (id_number.hasError('required')) return '必须填写身份证号码！'
      if (id_number.hasError('pattern')) return '身份证号码不符合规范！'
      if (id_number.hasError('uniqueStudent')) return '身份证号码已存在，与“'+this.errorIdNumberName+'”重复！'
    }
    if(xm=="con1_phone"){
      let con1_phone=this.studentForm.get('con1_phone')
      return con1_phone.hasError('required') ? '必须填写联系人电话！' :(con1_phone.hasError('pattern') )? '电话号码应为数字！' :'';
    }
    if(xm=="con2_phone"){
      let con2_phone=this.studentForm.get('con2_phone')
      return con2_phone.hasError('pattern')? '电话号码应为数字！' :'';
    }
    if(xm=="tuition"){
      let tuition=this.studentForm.get('tuition')
      return tuition.hasError('required') ? '必须填写学费！' :(tuition.hasError('pattern') )? '学费应为数字！' :'';
    }
    if(xm=="deposit"){
      let deposit=this.studentForm.get('deposit')
      return deposit.hasError('required') ? '必须填写入园押金！' :(deposit.hasError('pattern') )? '入园押金应为数字！' :'';
    }
  }



classes=[]
student
errorIdNumberName=''
status='add' //'modify','view';

onSubmit():void{
  let now_student=this.studentForm.value
  now_student.enter_date=moment(now_student.enter_date.toISOString()).valueOf()
  if(this.student['id']){
    now_student.id=this.student.id
    this.dataService.modifyStudent(now_student)
       .subscribe(data=>{
        if (data==true){
          console.log("ok")
          this.studentForm.reset({"enter_date":new Date(),"classId":"000000"})    }
      })  
  }
  else{this.dataService.addStudent(now_student)
        .subscribe(data=>{
          if (data==true){
            console.log("ok")
            this.studentForm.reset({"enter_date":new Date(),"classId":"000000"})    }
     })
   }
}
 

 getClasses():void{
  this.dataService.getClasses()
  .subscribe(data =>{ this.classes = data
});
}



setStudentForm(id):void{
  if(id){
    this.status="modify"
    this.dataService.getStudent(id)
    .subscribe(data=>{
      console.log(data)
      this.student=data
      let enter_date=moment(this.student.enter_date).local()
      this.studentForm.setValue({"name":this.student.name,"sex":this.student.sex,"id_number":this.student.id_number,"address":this.student.address,"contacts1":this.student.contacts1,"con1_name":this.student.con1_name,"con1_phone":this.student.con1_phone,"contacts2":this.student.contacts2,"con2_name":this.student.con2_name,"con2_phone":this.student.con2_phone,"tuition":this.student.tuition,"deposit":this.student.deposit,"enter_date":enter_date,"classId":this.student.classId})
      this.studentForm.get('id_number').disable()
    }     
    )
  }
  else
  {
  this.studentForm.reset({"enter_date":new Date(),"classId":"000000"})
  }
}

  constructor( private fb: FormBuilder,
    private dataService :DataService,
    private route: ActivatedRoute,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.getClasses()
    const id = this.route.snapshot.paramMap.get('id');    
    this.setStudentForm(id)
  }

}
