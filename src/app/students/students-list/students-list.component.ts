import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from './../../data.service'
import{ Student } from './../../model'
import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = ['No', 'name', 'sex', 'id_number','con1_name','con1_phone','className','id'];
  students:Student[] 

  getStudents():void{
    this.dataService.getStudents({})
    .subscribe(data =>{ this.students = data
    console.log(this.students)});
  }
  goToModify(id):void{
    this.router.navigate(['/detail', { id: id}]);
  }

  deleteStudent(id):void{
    this.openDialog().subscribe(result=>{
    if(result){
      this.dataService.deleteStudent(id)
    .subscribe(data=>{
       if(data==true){
         this.getStudents()
       }
    })
  }})
  }
    openDialog(): Observable<boolean> {
      const dialogRef = this.dialog.open(MyDialogComponent, {
      //  width: '250px',
        data: {title: "警告", contents: '确定删除这个学生的信息？'}
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
