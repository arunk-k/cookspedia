import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  regForm: any = {}

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private toastr:ToastrService) {
    this.regForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
    })
  }

  handleSubmit() {
    console.log(this.regForm.value)
    this.api.userRegApi(this.regForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success("Registration Successful!!")
        this.router.navigateByUrl('/log')
      },
      error: (e: any) => {
        this.toastr.error("Registration Failed")
      }
    })
  }

}
