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
}
