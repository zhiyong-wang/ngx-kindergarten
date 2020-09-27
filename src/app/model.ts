export  interface Student{
    id?:string,
    name:string,
    sex:string,
    id_number:string,
    address:string,
    contacts1:string,
    con1_name:string,
    con1_phone:string,
    contacts2:string,
    con2_name:string,
    con2_phone:string,               
    tuition:number,
    deposit:number,
    enter_date:Date,
    exist?:boolean,
    image?:string,
    classId:string,
    className?:string,
    attendance?:any,
   
}
export  interface Teacher{
    name:string,
    sex:string,
    id_number:string,
    educational:string,
    university:string,
    specialty:string,
    phone:string,
    enter_date:Date,
    image?:string
};
export  interface ClassModel{
    id?:string,
    name:string,
    primary_teacher:string,
    teachers:string,
};
export interface Attendance{
    id?:string,
    name?:string,
    studentId:string,
    day:number
    absence?:Array<number>
}

export interface Charge{
    id?:string,
    name:string,
    charge:number,
    paytime:number,
    endtime:number,
    isAll:string,
    isStart:boolean,
    classes:[]
    
}
