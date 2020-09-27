import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from './../../data.service'
import{ Charge } from './../../model'
import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';
import { Observable } from 'rxjs'
import * as moment from 'moment';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css']
})
export class ChargeListComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'charge','isAll', 'paytime','endtime','id'];
charges:any[]

getCharges():void{
    let tj={}
    this.dataService.getCharges(tj)
        .subscribe(data =>{ this.charges = data
          for (let charge of  this.charges ){
            let fw=''
            if(charge.isAll=='part'){
              for (let classI of charge['Class']){
                  fw=fw+classI['name']+" "
              }
            charge.isAll=fw}
            if(charge.isAll=="all"){charge.isAll='全部'}
            if(charge.isAll=="bySelf"){charge.isAll='自愿'}
            if(charge.isStart==true){charge.paytime='入园缴费'
             charge.endtime=""}
            else{
              charge.paytime=charge.paytime>0?moment(charge.paytime).local().format(" YYYY[年]MM[月]D[日]"):""
              charge.endtime=charge.endtime>0?moment(charge.endtime).local().format(" YYYY[年]MM[月]D[日]"):""
            }

            
          }
    console.log(this.charges)});
  }
  
  goToModify(id):void{
    this.router.navigate(['/config/charge-detail', { id: id}]);
  }

  deleteCharge(id):void{
    this.openDialog().subscribe(result=>{
    if(result){
      this.dataService.deleteCharge(id)
    .subscribe(data=>{
       if(data==true){
         this.getCharges()
       }
    })
  }})
  }
    openDialog(): Observable<boolean> {
      const dialogRef = this.dialog.open(MyDialogComponent, {
      //  width: '250px',
        data: {title: "警告", contents: '确定删除这个收费吗？'}
      });  
      return dialogRef.afterClosed()
      .pipe(result=> {
        return result        
      }
      )
    }
  

  constructor(private dataService:DataService,
    private router: Router,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.getCharges()

  }

}
