import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AdminApiService } from '../../services/admin-api.service';
import * as Highcharts from 'highcharts';
import { text } from 'stream/consumers';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Analysis of Download Recipes Based on Cuisine',
      align: 'left'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total Download Recipe Count'
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Cuisine',
        colorByPoint: true,
        type: "bar",
        data: [
          {name:'Italian',y:4},
          {name:'Asian',y:2},
          {name:'Thai',y:1},
          {name:'Indian',y:3}

        ]
      }
    ]
  }

  recipeCount: number = 0
  userCount: number = 0
  downloadCount: number = 0
  requestCount: number = 0
  selected: Date = new Date()

  constructor(private api: ApiService, private admin: AdminApiService,private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {

    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        this.recipeCount = res?.length
      },
      error: (err: any) => {
        console.log(err);

      }
    })

    this.admin.userListApi().subscribe({
      next: (res: any) => {
        this.userCount = res?.length
      },
      error: (err: any) => {
        console.log(err);

      }
    })

    this.admin.getDownloadList().subscribe({
      next: (res: any) => {
        this.downloadCount = res.reduce((prev: any, item: any) => prev + item.count, 0)
      },
      error: (err: any) => {
        console.log(err);

      }
    })

    this.admin.getTestimonyRequestsApi().subscribe({
      next: (res: any) => {
        this.requestCount = res?.length
      },
      error: (err: any) => {
        console.log(err);

      }
    })

  }

  logout(){
    sessionStorage.clear()
    this.toastr.info("Logging Out From Admin Panel")
    this.router.navigateByUrl('/')
  }

}
