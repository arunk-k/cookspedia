import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.css'
})
export class DownloadsComponent implements OnInit {
  downloads: any[] = []
  constructor(private api: AdminApiService) { }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.api.getDownloadList().subscribe({
      next: (res: any) => {
        console.log(res)
        this.downloads = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
