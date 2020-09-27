import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl, AbstractControlDirective} from '@angular/forms';
import { MatTableDataSource} from '@angular/material/table';
import {DataService} from './../../data.service.js'
import {Charge} from '../../model.js'
import { Observable } from 'rxjs'

import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-special-charge',
  templateUrl: './special-charge.component.html',
  styleUrls: ['./special-charge.component.css']
})
export class SpecialChargeComponent implements OnInit {
  
  chargeForm = new FormGroup({
    selectCharge: new FormControl(''),
    selectClass: new FormControl(''),
    isPaid: new FormControl('noPaid'),
  });
  onSubmit(){

    let tj={classId:this.chargeForm.get('selectClass').value,
            chargeId:this.chargeForm.get('selectCharge').value,
            isPaid:this.chargeForm.get('isPaid').value,}
            console.log(tj)
    this.dataService.getChargeOfStudents(tj)
    .subscribe((data)=>{
       console.log(data)
       let students=[]
       for(let student of data){
       students.push({id:student.id,name:student.name,shouldPay:this.selectCharge.charge,paid:student.charges.length>0?student.charges[0].student_charge.paid:0})
       }

       console.log(this.dataSource)
       this.dataSource=new MatTableDataSource<any>(students)
    })

  }

  selectCharge:Charge
  dataSource
  displayedColumns = ['position', 'name','shouldPay','paid','do']
  charges:Charge[]=[]
  classesOfCharge=[]
  allClasses=[]


  savePaid(student){
    let data={studentId:student.id,chargeId:this.selectCharge.id,paid:this.selectCharge.charge}
     console.log(data)
    let contents="确定收取"+student.name+this.selectCharge.name+this.selectCharge.charge+"元？"
    this.openDialog(contents).subscribe(result=>{
    if(result){
      this.dataService.saveSpecialPaid(data)
    .subscribe(data=>{
       if(data==true){
         contents="收款信息已保存，是否打印收据？"
        this.openDialog(contents).subscribe(result=>{
          if(result){
            this.onSubmit()
          }  
       })
      }
    })
  }})
  }
  deletePaid(student) {
    let tj={studentId:student.id,chargeId:this.selectCharge.id}
    let contents="确定删除"+student.name+this.selectCharge.name+"的缴费记录？"
    this.openDialog(contents).subscribe(result=>{
      if(result){
        this.dataService.deleteSpecialPaid(tj)
      .subscribe(data=>{
         if(data==true){
           console.log("收款信息已删除!")

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

  constructor(
    private dataService:DataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.dataService.getClasses().subscribe((data)=>this.allClasses=data)
    console.log(this.allClasses)
    this.dataService.getCharges({})
    .subscribe((data)=>{
      this.charges=data
      console.log(this.charges)
    this.chargeForm.get('selectCharge').valueChanges.
       subscribe((chargeId)=>{
      for(let charge of this.charges){
        if(charge.id==chargeId){
          this.selectCharge=charge
          this.classesOfCharge=charge.isAll=='part'?charge['Class']:this.allClasses}
      }
      })
    })
  }

}