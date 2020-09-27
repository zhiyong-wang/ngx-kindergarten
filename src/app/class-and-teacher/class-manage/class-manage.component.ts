import { Component, OnInit } from '@angular/core';

import { DataService } from './../../data.service'
import {ClassModel} from './../../model.js'
@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.css']
})
export class ClassManageComponent implements OnInit {
  classes:ClassModel[]


  panelOpenState = false

  getClasses():void{
    this.dataService.getClasses()
    .subscribe(data =>{ 
      this.classes = data      
      this.getStudents()
  });
  }



  getStudents(): void{
    for(let cl of this.classes){
    this.dataService.getStudents({'classId':cl.id})
    .subscribe(data=>{
      cl['students']=data
    })
  }
 console.log(this.classes)
  }

  constructor(private dataService:DataService) { }
  ngOnInit(): void {
    this.getClasses()
  }


}
