import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  href:string 
}
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  student_manage: Section[] = [
    {
      name: '入园管理',
      href: "students/detail",
    },
    {
      name: '学生信息',
      href: "students/list",
    },
    {
      name: '点名',
      href: 'students/attendance',
    },
    {
      name: '出勤信息',
      href: 'students/attendance-list',
    }
  ];
  class_manage: Section[] = [
    {
      name: '建立班级',
      href: 'class-and-teacher/classCreate',
    },
    {
      name: '班级管理',
      href: 'class-and-teacher/classManage',
    },
    {
      name: '加入教师',
      href: 'class-and-teacher/teacherDetail',
    },
    {
      name: '教师信息',
      href: 'class-and-teacher/teacherList',
    }
  ];
  charge_manage: Section[] = [
    {
      name: '收取学费',
      href: 'charge/tuition',
    },
    {
      name: '费用管理',
      href: 'charge/special-charge',
    },

  ];
  config_manage: Section[] = [
    {
      name: '增加缴费项目',
      href: 'config/chargeDetail',
    },
    {      
      name: '缴费项目管理',
      href: 'config/chargeList',
    },
    {
      name: '假期管理',
      href: 'config/holiday',
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
