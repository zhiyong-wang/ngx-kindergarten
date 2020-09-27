import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl,ValidatorFn,FormGroup} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {DataService} from '../../data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-charge-detail',
  templateUrl: './charge-detail.component.html',
  styleUrls: ['./charge-detail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class ChargeDetailComponent implements OnInit {

  identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const isAll = control.get('isAll');
    const selectClass = control.get('selectClass');  
    return isAll.value=='part' && selectClass.value=='' ? { 'identityRevealed': true } : null;
  };
  startTimeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const isStart = control.get('isStart');
    const paytime = control.get('paytime');  
    const endtime = control.get('endtime');  
    return isStart.value=='false' && (paytime.value==''||paytime.value==null||endtime.value==''||endtime.value==null) ? { 'startTimeValidator': true } : null;
  };


  chargeForm = this.fb.group({
    name: ["",Validators.required],
    isAll: ["all",Validators.required],
    selectClass:["",],
    isStart: ["",Validators.required],
    charge: ["",[Validators.required,Validators.pattern('[0-9]*')]],
    paytime:[""],
    endtime:[""],
}, { validators: [this.startTimeValidator,this.identityRevealedValidator,]});


getErrorMessage(xm) {
  if(xm=="charge"){
    let charge=this.chargeForm.get('charge')
    return charge.hasError('required') ? '必须填写缴费标准！' :(charge.hasError('pattern') )? '缴费标准应为数字！' :'';
  }

}

onSubmit(){
  let data=this.chargeForm.value
 if(data.isStart=="false"){data.paytime=moment(data.paytime.toISOString()).valueOf()}else{data.paytime=null}
 if(data.isStart=="false"){data.endtime=moment(data.endtime.toISOString()).valueOf()}else{data.endtime=null}
 if(data.isAll!='part'){data.classes=[]}else{data.classes=data.selectClass}
 delete data.selectClass
  if(this.chargeId!=""){
    data.id=this.chargeId
    this.dataService.modifyCharge(data)
  .subscribe((data)=>{
    this.chargeForm.reset();})
  }
  this.dataService.addChargeConfig(data)
  .subscribe((data)=>{
    this.chargeForm.reset();})

}

classes=[]
chargeId=''

setChargeForm(id):void{
  if(id){
    this.chargeId=id
    this.dataService.getCharges({id:id})
    .subscribe(data=>{
      console.log(data)
      let charge=data[0]
      let paytime=moment(charge.paytime).local()
      let endtime=moment(charge.endtime).local()
      let selectClasses=[]
      for (let selectClass of charge['Class']){selectClasses.push(selectClass.id)}
      console.log(charge)
      this.chargeForm.reset({"name":charge.name,"isAll":charge.isAll,"isStart":charge.isStart.toString(),"charge":charge.charge,"paytime":paytime,"endtime":endtime,"selectClass":selectClasses})
     // this.teacherForm.get('id_number').disable()
    })
  }
  this.dataService.getClasses()
    .subscribe((data)=>{this.classes=data})
  }

  constructor( 
    private fb: FormBuilder,
    private dataService :DataService,
    private route: ActivatedRoute,
  ){   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');    
    this.setChargeForm(id)
  }

}
