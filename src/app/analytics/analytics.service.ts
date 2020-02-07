import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) {
   }

   get_academics_years():Observable<any>{
     let url=`${this.baseUrl}academicyear`;
     return this.http.get(url);
   }

   get_term():Observable<any>{
     let url=`${this.baseUrl}term`;
     return this.http.get(url);
   }
   get_usn_by_email(email):Observable<any>{
     let url=`${this.baseUrl}get-usn/${email}`;
     return this.http.get(url)
   }
   get_placemnent_details(usn,term):Observable<any>{
     let url=`${this.baseUrl}placement/${usn}/${term}`
     console.log(url)
     return this.http.get(url);
   }
   get_scores(usn):Observable<any>{
     let url=`${this.baseUrl}${usn}/score`
     return this.http.get(url)
   }
   get_dept_faculties(dept):Observable<any>{
     let url=`${this.baseUrl}${dept}/dept`
     return this.http.get(url)
   }
   get_all_depts():Observable<any>{
     let url=`${this.baseUrl}dept`
     return this.http.get(url) 
   }
   get_emp_id(email):Observable<any>{
     let url=`${this.baseUrl}${email}/empid`
     return this.http.get(url)
   }

}
