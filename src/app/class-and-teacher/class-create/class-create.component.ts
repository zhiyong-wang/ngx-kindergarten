import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,AsyncValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';
import {DataService} from './../../data.service'
import {Teacher,Student, ClassModel} from './../../model';
import {Observable,of}from 'rxjs'
import { map,catchError} from 'rxjs/operators';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})

export class ClassCreateComponent implements OnInit {

  formGroup = new FormGroup({
    classGroup: new FormGroup({
       className: new FormControl('',Validators.required,this.uniqueClassValidator())
    }),
    primaryTeacher: new FormControl(''),
    other_teachers:new FormControl('')

  });
  getErrorMessage(xm):string{
    if(xm=="className"){
      let className=this.formGroup.get('classGroup').get("className")
      if (className.hasError('required')) return '必须填写班级名称！'
      if (className.hasError('uniqueClass')) return '班级名称已存在，不可重复！'
    }
  }

  uniqueClassValidator(): AsyncValidatorFn {
    return (control: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
      if(this.class!=null){ return of(null)}
      else{
      return this.dataService.isClassExist(control.value)
      .pipe(      
        map(classes => {console.log(classes[0]) 
          let isTaken
          if(classes.length>0){
           isTaken=true}
         return isTaken ? { uniqueClass:true } : null}
        ),
        catchError(() => of(null))
      );
      }
    }
   }

class:ClassModel=null


teachers:Teacher[]
studentsNoClass:Student[]
studentsInClass:Student[]=[]

addToClass(student){
  this.studentsInClass.unshift(student)
  for (let i=0;i<this.studentsNoClass.length;i++){
    if(this.studentsNoClass[i]==student)
    {this.studentsNoClass.splice(i,1)}
  }


}
removeFromClass(student){
  this.studentsNoClass.unshift(student)

  for (let i=0;i<this.studentsInClass.length;i++){
    if(this.studentsInClass[i]==student)
    {this.studentsInClass.splice(i,1)}
  }


}


onSubmit():void{
  
  let className=this.formGroup.get("classGroup").get("className").value


  let now_class={name:className,primary_teacher:this.formGroup.get("primaryTeacher").value
,teachers: this.formGroup.get("other_teachers").value}
  console.log(now_class)

  if(now_class['id']){}
  else{this.dataService.addClass(now_class)
        .subscribe(data=>{
          console.log(data)
           let new_classId=data
           for(let student of this.studentsInClass){   
            student.classId=new_classId     
            this.dataService.modifyStudent(student)
            .subscribe()
           }
        })
  }
}
  constructor(private dataService:DataService) {}
  ngOnInit() {
    this.dataService.getTeachers().subscribe(data=>{
      this.teachers=data
    })
    this.dataService.getStudents({classId:"000000"}).subscribe(data=>{
      this.studentsNoClass=data
      console.log(this.studentsNoClass)
    })
    
  }
}
