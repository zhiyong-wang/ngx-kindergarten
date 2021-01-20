import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { Router} from '@angular/router';
import {DataService} from './../../data.service'
import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';
import { Observable } from 'rxjs'
import {Teacher} from './../../model.js'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements AfterViewInit,OnInit {

  displayedColumns: string[] = ['No', 'name', 'sex', 'id_number','educational','university','specialty','phone','enter_date','id'];
  teachers:Teacher[] 
  dataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  getTeachers():void{
    this.dataService.getTeachers()
    .subscribe(data =>{
      this.teachers = data
      this.dataSource = new MatTableDataSource(this.teachers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
});
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
ngAfterViewInit(): void {
  this. getTeachers()
}

}