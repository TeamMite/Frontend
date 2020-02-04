import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-statement6',
  templateUrl: './statement6.component.html',
  styleUrls: ['./statement6.component.css']
})
export class Statement6Component implements OnInit {
  academicYear:string[]=[];
  terms:[];
  constructor(private analyticsService:AnalyticsService ) {
   }

  ngOnInit() {
      this.analyticsService.get_academics_years().subscribe(res=>
        {
          this.academicYear=res["year"];
          console.log(this.academicYear)

    });
      this.analyticsService.get_term().subscribe(term => {
      this.terms = term.term;

      console.log(this.terms);
    })

    }
    year:string="";
    term:string="";
    form1 (event:any){
      this.year=event.target.value;
    }
     form2 (event:any){
       this.term=event.target.value;
    }
    onsubmit(){
      console.log(this.year)
      console.log(this.term)
    }
  }



