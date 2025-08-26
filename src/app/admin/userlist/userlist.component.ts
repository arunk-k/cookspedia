import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  userlist: any = [] = []
  constructor(private api: AdminApiService) { }
  ngOnInit(): void {
    this.getData()
  }
    getData() {
    this.api.userListApi().subscribe({
      next: (res: any) => {
        console.log(res)
        this.userlist = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
