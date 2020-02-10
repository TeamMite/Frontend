import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';
import { ChartSelectEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

declare var $:any;
@Component({
  selector: 'app-statement6',
  templateUrl: './statement6.component.html',
  styleUrls: ['./statement6.component.css']
})
export class Statement6Component implements OnInit {
  academicYear: string[] = [];
  sems: [];
  selectedSem: any;
  usn: string = "";
  email: string = "";
  user: any;
  offers: any[] = [];
  scores: any[] = [];
  isPlacementOn = false;
  selectedyear: any;
  userRoles: any[] = [];
  selectDepartment: any;
  faculties: any;
  allFaculties: string[] = [];
  empID: any;
  clicked : any
  depts: string[] = [];
  selectedSubject: any;
  showSpinner: boolean;
  firstLevelChart : GoogleChartInterface;
  chart_visibility: boolean;
  title: string;
  xPercentage;
  xiiPercentage;
  totalStudents;
  placedStudents;
  totalPositions;
  selectedEmp : any;
  graph_error = false;


  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.email = localStorage.getItem("user");
    this.user = JSON.parse(this.email)
    this.userRoles = this.user.roles;
    this.email = this.user.user

    this.analyticsService.get_academics_years().subscribe(res => {
      this.academicYear = res["year"];
      //console.log(this.academicYear)

    });
    if (this.userRoles.includes("STUDENT")) {
      this.analyticsService.get_usn_by_email(this.user.user).subscribe(res => {
        this.usn = res["usn"];
        //console.log("usn", this.usn)
      })
    }
    else {
      this.analyticsService.get_emp_id(this.email).subscribe(res => {
        this.empID = res["empid"];
        //console.log("empID", this.empID)
      })
    }
    if (this.userRoles.includes("PRINCIPAL")) {
      this.analyticsService.get_all_depts().subscribe(res => {
        this.depts = res["depts"]
        let data = []
        for (let a of this.depts) {
          data.push(a)
        }
        this.depts = data
      })
    }
    this.analyticsService.get_term().subscribe(term => {
      this.sems = term.term;
      //console.log(this.sems);
    });
  }

  placementdetails: [] = [];

  onsubmit() {
    if (this.userRoles.includes("STUDENT")) {
      if (!this.isPlacementOn) {
        this.getPlacementdetails()
        this.getScores()
        //console.log(this.selectedyear)
      }

    }
    else if (this.userRoles.includes("PRINCIPAL")) {
      this.faculties = [];
      this.analyticsService.get_dept_faculties(this.selectDepartment).subscribe(res => {
        let f = res["facs"]
        //console.log(f)
        let data = []
        for (let a of f) {
          data.push(a)
        }
        this.faculties = data
      })
      //console.log(this.faculties)

    }
    else if (this.userRoles.includes("HOD")) {
      let str = this.empID;
      let patt = new RegExp("[a-zA-Z]*");
      let res = patt.exec(str)
      this.selectDepartment = res[0]
      this.analyticsService.get_dept_faculties(this.selectDepartment).subscribe(res => {
        let f = res["facs"]
        //console.log(f)
        let data = []
        for (let a of f) {
          data.push(a)
        }
        this.faculties = data
      })
    }
    else if (this.userRoles.includes("FACULTY")) {
      this.getEmpChart(this.empID)
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
      //console.log(this.scores)
    })
  }

  getEmpChart(empID){
    this.selectedEmp = empID
    let data = [["Subject","%X Marks","%XII Marks","%Placement"]]
    let details = []
    this.analyticsService.get_emp_subjects(empID,this.selectedyear,this.selectedSem).subscribe(res=>{
      details = res['subs']
    },
    err=>{},
    ()=>{
      for(let d of details){
        data.push([d["courseName"],d["xPercentage"],d["xiiPercentage"],d["placePercentage"]])
      }
      if(data.length > 1)
      {
      this.graph_data(data)
      this.graph_error = false
      }
      else{
        this.graph_error = true
      }
    })
  }
  graph_data(data) {
    console.log(data)
    this.showSpinner = false
    this.chart_visibility = true
    this.title = 'Course-wise X & XII Marks vs Placement %',
      this.firstLevelChart = {
        chartType: "ComboChart",
        dataTable: data,
        options: {
          focusTarget: 'datum',
          bar: { groupWidth: "20%" },
          vAxis: {
            title: "Percentage",
            maxValue : 100,
            minValue : 0 
          },

          height: 800,
          hAxis: {
            title: "Courses",
            titleTextStyle: {
            }
          },
          chartArea: {
            left: 80,
            right: 100,
            top: 100,
          },
          legend: {
            position: "top",
            alignment: "end"
          },
          seriesType: "bars",
          colors: ["#d3ad5d", "#789d96"],
          fontName: "Times New Roman",
          fontSize: 13,
        }

      }
  }
  second_level(event: ChartSelectEvent) {
    if (event.selectedRowValues[0]) {
      this.selectedSubject = event.selectedRowValues[0]
      console.log(this.selectedSubject)
      let data = []
      this.analyticsService.get_emp_sub_detail(this.selectedEmp,this.selectedyear,this.selectedSem,this.selectedSubject).subscribe(res=>{
        data = res["sub"]
      },
      err=>{},
      ()=>{
        let d = data[0];
        this.xPercentage = d['xPercentage']
        this.xiiPercentage = d['xiiPercentage']
        this.analyticsService.get_emp_sub_placement(this.selectedEmp,this.selectedSem,this.selectedSubject).subscribe(res=>{
          this.totalStudents = res["numofStudent"]
          this.placedStudents = res["placed"]
          this.totalPositions = res["positions"]
          $('#exampleModal').modal('toggle')
        })
      })
    }
    else if(this.selectedSubject){
      $('#exampleModal').modal('toggle')
    }
  }
}



