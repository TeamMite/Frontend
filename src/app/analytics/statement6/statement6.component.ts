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
  offers: any[] = [];
  scores: any[] = [];
  isPlacementOn = false;
  selectedyear: any;
  userRoles: any[] = [];
  selectDepartment: any;
  faculties:any;
  empID:any;
  depts:any;


  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.email = localStorage.getItem("user");
    this.user = JSON.parse(this.email)
    this.userRoles = this.user.roles;
    this.email = this.user.user

    this.analyticsService.get_academics_years().subscribe(res => {
      this.academicYear = res["year"];
      console.log(this.academicYear)

    });
    if(this.userRoles.includes("STUDENT")){
      this.analyticsService.get_usn_by_email(this.user.user).subscribe(res => {
        this.usn = res["usn"];
        console.log("usn", this.usn)
      })
    }
    else{
      this.analyticsService.get_emp_id(this.email).subscribe(res=>
        {
          this.empID=res["empid"];
          console.log("empID",this.empID)
        })
    }
    if(this.userRoles.includes("PRINCIPAL")){
      this.analyticsService.get_all_depts().subscribe(res=>
        {
          this.depts=res["depts"]
        })
    }
    this.analyticsService.get_term().subscribe(term => {
      this.terms = term.term;

      console.log(this.terms);
    });
    

  }

  placementdetails: [] = [];

  onsubmit() {
    if (this.userRoles.includes("STUDENT")) {
      if (!this.isPlacementOn) {
        this.getPlacementdetails()
        this.getScores()
        console.log(this.selectedyear)
      }

    }
    else if (this.userRoles.includes("PRINCIPAL")) {
      this.analyticsService.get_dept_faculties(this.selectDepartment).subscribe(res => {
        let f = res["facs"]
        console.log(f)
        let data = []
        for (let a of f) {
          data.push(a)
        }
        this.faculties=data
      })
      console.log(this.faculties)

    }
    else if (this.userRoles.includes("HOD")) {
      let str=this.empID;
      let patt=new RegExp("[a-zA-Z]*");
      let res=patt.exec(str)
      this.selectDepartment=res[0]
      this.analyticsService.get_dept_faculties(this.selectDepartment).subscribe(res=>
        {
          let f=res["facs"]
          let data=[]
          for(let a of f){
            data.push(a)
          }
          this.faculties=data
        })
        console.log(this.faculties)

    }
    else if (this.userRoles.includes("FACULTY")) {

      //load
    }


  }
  getPlacementdetails() {
    this.analyticsService.get_placemnent_details(this.usn, this.selectedyear).subscribe(res => {
      let result = res["offers"];
      for (let res of result) {
        this.offers.push([res['companyName'], res['salary']])
      }

    })
    this.isPlacementOn = true;
  }
  getScores() {
    this.analyticsService.get_scores(this.usn).subscribe(res => {
      let result = res["scores"];
      for (let res of result) {
        this.scores.push([res['qualification'], res['result']])

      }
      console.log(this.scores)

    })
  }


}



