import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-statement6',
  templateUrl: './statement6.component.html',
  styleUrls: ['./statement6.component.css']
})
export class Statement6Component implements OnInit {
  academicYear: string[] = [];
  terms: [];
  usn: string = "";
  email: string = "";
  user: any;
  offers:any[] = [];

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.email = localStorage.getItem("user");
    this.user = JSON.parse(this.email)

    this.analyticsService.get_academics_years().subscribe(res => {
      this.academicYear = res["year"];
      console.log(this.academicYear)

    });
    this.analyticsService.get_term().subscribe(term => {
      this.terms = term.term;

      console.log(this.terms);
    });
    this.analyticsService.get_usn_by_email(this.user.user).subscribe(res => {
      this.usn = res["usn"];
      console.log("usn", this.usn)
    })

  }
  year: string = "";
  term: string = "";
  placementdetails: [] = [];
  form1(event: any) {
    this.year = event.target.value;
  }
  form2(event: any) {
    this.term = event.target.value;
  }
  onsubmit() {
    console.log(this.year)
    console.log(this.term)
    this.analyticsService.get_placemnent_details(this.usn, this.year).subscribe(res => {
      let result = res["offers"];
      for(let res of result)
      {
        this.offers.push([res['companyName'],res['salary']])
      }
      console.log(res["offers"])
      console.log(res)
      console.log(this.placementdetails)
    })

  }
}



