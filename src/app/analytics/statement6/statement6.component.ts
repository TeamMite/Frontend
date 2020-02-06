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
  scores:any[]=[];
  isPlacementOn=false;
  selectedyear:any;
  

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
  
  placementdetails: [] = [];
  
  onsubmit() {
    if(!this.isPlacementOn){
      this.getPlacementdetails()
      this.getScores()
      console.log(this.selectedyear)
    }
    
  }
  getPlacementdetails(){
    this.analyticsService.get_placemnent_details(this.usn, this.selectedyear).subscribe(res => {
      let result = res["offers"];
      for(let res of result)
      {
        this.offers.push([res['companyName'],res['salary']])
      }
     
    })
    this.isPlacementOn=true;
  }
  getScores(){
    this.analyticsService.get_scores(this.usn).subscribe(res=>{
      let result=res["scores"];
      for(let res of result)
      {
        this.scores.push([res['qualification'],res['result']])
    
      }
      console.log(this.scores)
      
    })}

 
}



