import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, first } from 'rxjs/operators';
import {Student,Teacher,ClassModel,Attendance,Charge} from './model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient,) { }
  private dataUrl = 'http://127.0.0.1:5757'; 

getHolidayOfMonth(firstDate,lastDate):Observable<any[]>{
  let cx={ tj:{'startDate':firstDate,'endDate':lastDate}}

  return this.http.post<any[]>(this.dataUrl+'/holiday_get',cx)
  .pipe(
    catchError(this.handleError)
    
  )
}
modifyHolidayOfMonth(holidayOfMonth,firstDate,lastDate):Observable<any[]>{
  let data={dates:holidayOfMonth,
            tj:{'startDate':firstDate,'endDate':lastDate}}
  
  console.log(data)
  return this.http.post<any[]>(this.dataUrl+'/holiday_modify',data)
  .pipe(
    catchError(this.handleError)
    
  )
}

getCharges(tj):Observable<Charge[]>{
  console.log(tj)
   return this.http.post<Charge[]>(this.dataUrl+'/charges_list',tj)
   .pipe(
   catchError(this.handleError)
   
   )
   }

addChargeConfig(charge):Observable<any[]>{
  let data=charge
  console.log(data)
  return this.http.post<any[]>(this.dataUrl+'/charge_add',data)
  .pipe(
    catchError(this.handleError)
    
  )
}
modifyCharge(charge:Charge): Observable<Boolean> {
  console.log(charge)
  return this.http.post<boolean>(this.dataUrl+'/charge_modify',charge)
  .pipe(
    catchError(this.handleError)
    
  )
}
deleteCharge(id:string): Observable<Boolean> {
  console.log(id)
  return this.http.post<boolean>(this.dataUrl+'/charge_delete',{'id':id})
  .pipe(
    catchError(this.handleError)
    
  )
}


getChargeOfStudents(tj):Observable<any[]>{
  return this.http.post<any[]>(this.dataUrl+'/chargeOfStudents_list',tj)
  .pipe(
  catchError(this.handleError)
  
  )
}

saveSpecialPaid(data):Observable<any>{
  return this.http.post<any>(this.dataUrl+'/chargeOfStudent_save',data)
  .pipe(
  catchError(this.handleError)
  
  )
}
deleteSpecialPaid(tj):Observable<any>{
  return this.http.post<any>(this.dataUrl+'/chargeOfStudent_delete',tj)
  .pipe(
  catchError(this.handleError)
  
  )
}


getTuitions(studentId,month):Observable<any>{
 let tj={studentId:studentId,month:month}

  return this.http.post<any>(this.dataUrl+'/tuitions_list',tj)
  .pipe(
  catchError(this.handleError)
  
  )
  }

saveTuitionPaid(data):Observable<any>{

console.log(data)
return this.http.post<any>(this.dataUrl+'/tuition_add',data)
.pipe(
catchError(this.handleError)

)
}

deleteTuitionPaid(data):Observable<any>{

  console.log(data)
  return this.http.post<any>(this.dataUrl+'/tuition_delete',data)
  .pipe(
  catchError(this.handleError)
  
  )
  }


  addStudent(student:Student): Observable<Boolean> {
    console.log(student)
    return this.http.post<boolean>(this.dataUrl+'/student_add',student)
    .pipe(
      catchError(this.handleError)
      
    )
  }
  modifyStudent(student:Student): Observable<Boolean> {
    console.log(student)
    return this.http.post<boolean>(this.dataUrl+'/student_modify',student)
    .pipe(
      catchError(this.handleError)
      
    )
  }
  deleteStudent(id:string): Observable<Boolean> {
    console.log(id)
    return this.http.post<boolean>(this.dataUrl+'/student_delete',{'id':id})
    .pipe(
      catchError(this.handleError)
      
    )
  }

  getStudent(id:string): Observable<Student> {
    const url = `${this.dataUrl}/student_get/${id}`;
    return this.http.get<Student>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  isStudentExist(id_number:string):Observable<Student[]> {
    let cx={tj:{'id_number':id_number}}
    return this.http.post<Student[]>(this.dataUrl+'/students_list',cx)
    .pipe(     
      catchError(this.handleError)
      
    )
  }
  getAttendance(studentId,selectDate):Observable<Attendance[]>{
     let cx={tj:{'studentId':studentId,day:selectDate}}
     return this.http.post<Attendance[]>(this.dataUrl+'/attendance_get',cx)
     .pipe(
      catchError(this.handleError)    
    )
  }
 getAttendanceForMonth(studentId,startDate,endDate):Observable<any[]>{
  let cx={tj:{studentId:studentId,startDate:startDate,endDate:endDate}}
  return this.http.post<any[]>(this.dataUrl+'/attendance_list',cx)
  .pipe(
   catchError(this.handleError)     
 )
}

  modifyAttendance(attendance:any[]):Observable<string>{  
    console.log(attendance)  
    return this.http.post<string>(this.dataUrl+'/attendance_modify',attendance)
    .pipe(
      catchError(this.handleError)
      
    )
 }

  getStudents(tj:object): Observable<Student[]> {
  //  console.log(tj)
    let cx={'tj':tj}
    return this.http.post<Student[]>(this.dataUrl+'/students_list',cx)
    .pipe(
      catchError(this.handleError)
    )
  }


  getClasses (): Observable<any[]> {
    return this.http.post<[]>(this.dataUrl+'/classes_list',{})
    .pipe(
      catchError(this.handleError)
    )
  }

  addClass(n_class:ClassModel):Observable<string>{
    return this.http.post<string>(this.dataUrl+'/class_add',n_class)
    .pipe(
      catchError(this.handleError)
    )
  }
  isClassExist(name:string):Observable<ClassModel[]> {
    let cx={tj:{'name':name}}
    console.log(cx)
    return this.http.post<ClassModel[]>(this.dataUrl+'/classes_list',cx)
    .pipe(     
      catchError(this.handleError)
      
    )
  }

  getTeachers():Observable<Teacher[]> {   
    return this.http.post<Teacher[]>(this.dataUrl+'/teachers_list',{})
    .pipe(
      catchError(this.handleError)
    )
  }

  getTeacher(id:string): Observable<Teacher> {
    const url = `${this.dataUrl}/teacher_get/${id}`;
    return this.http.get<Teacher>(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  isTeacherExist(id_number:string):Observable<Teacher[]> {
    console.log(id_number)
    let cx={tj:{'id_number':id_number}}
    return this.http.post<Teacher[]>(this.dataUrl+'/Teachers_list',cx)
    .pipe(     
      catchError(this.handleError)
      
    )
  }
  addTeacher(teacher:Teacher): Observable<Boolean> {
    console.log(teacher)
    return this.http.post<boolean>(this.dataUrl+'/teacher_add',teacher)
    .pipe(
      catchError(this.handleError)
      
    )
  }
  modifyTeacher(teacher:Teacher): Observable<Boolean> {
    console.log(teacher)
    return this.http.post<boolean>(this.dataUrl+'/teacher_modify',teacher)
    .pipe(
      catchError(this.handleError)
      
    )
  }
  deleteTeacher(id:string): Observable<Boolean> {
    console.log(id)
    return this.http.post<boolean>(this.dataUrl+'/teacher_delete',{'id':id})
    .pipe(
      catchError(this.handleError)
      
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
