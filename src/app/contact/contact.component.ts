import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) { }

  handleSubmit(data: any) {
    console.log(data)
    this.api.addTestimony(data).subscribe({
      next: (res: any) => {
        this.toastr.success("Testimony added")
        this.router.navigateByUrl('/')

      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error("Adding Failed")
      }
    })
  }

}
