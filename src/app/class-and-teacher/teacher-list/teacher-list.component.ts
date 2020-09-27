import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from './../../data.service'
import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';
import { Observable } from 'rxjs'
import {Teacher} from './../../model.js'

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'sex', 'id_number','educational','university','specialty','phone','enter_date','id'];
  teachers:Teacher[] 

  getTeachers():void{
    this.dataService.getTeachers()
    .subscribe(data =>{ this.teachers = data
    console.log(this.teachers)});
  }
  goToModify(id):void{
    this.router.navigate(['/detail', { id: id}]);
  }

  deleteTeacher(id):void{
    this.openDialog().subscribe(result=>{
    if(result){
      this.dataService.deleteTeacher(id)
    .subscribe(data=>{
       if(data==true){
         this.getTeachers()
       }
    })
  }})
  }
    openDialog(): Observable<boolean> {
      const dialogRef = this.dialog.open(MyDialogComponent, {
      //  width: '250px',
        data: {title: "警告", contents: '确定删除这位教师的信息？'}
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
}

}