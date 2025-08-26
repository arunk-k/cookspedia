import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit {

  requestsList: any[] = []
  constructor(private api: AdminApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.api.getTestimonyRequestsApi().subscribe({
      next: (res: any) => {
        this.requestsList = res
      },
      error: (err: any) => {
        console.log(err)

      }
    })
  }

  updateRequests(id: any, status: any) {
    this.api.updateRequestApi(id, { status }).subscribe({
      next: (res: any) => {
        this.getData()
      },
      error: (err: any) => {
        this.toastr.error(err.error ? err.error : 'Updation Failed!!')
      }
    })
  }

}
