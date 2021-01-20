import { Component, OnInit ,AfterViewInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup ,FormControl,Validators,AsyncValidatorFn,ValidationErrors,AbstractControl} from '@angular/forms';
import { DataService} from './../../data.service'
import { Student ,ClassModel} from './../../model'
import {MatDialog} from '@angular/material/dialog';
import {MyDialogComponent} from './../../my-dialog/my-dialog.component';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements AfterViewInit,OnInit {
  findForm = new FormGroup({
    name: new FormControl(''),
    selectClass: new FormControl(''),
  });
  classes:ClassModel[]

  dataSource: MatTableDataSource<Student>;
  students:Student[] 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  async onSubmit():Promise<void>{
    this.getStudents()
  }
 
  displayedColumns: string[] = ['No', 'name', 'sex', 'id_number','con1_name','con1_phone','class.name','id'];

  getStudents():void{
    let classId=this.findForm.get("selectClass").value
    let tj={}
    if(classId!=""){
      tj={"classId":classId}
    }
    console.log(tj)
    this.dataService.getStudents(tj)
    .subscribe(data =>{ this.students = data
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource)});
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
    public dialog: MatDialog){

    }

  ngOnInit(): void {
    this.dataService.getClasses()
    .subscribe(data=>this.classes=data)
  }
  ngAfterViewInit(): void {
    this. getStudents()
  }


}
