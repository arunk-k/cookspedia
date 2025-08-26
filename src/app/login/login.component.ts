import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logForm: any = {}

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router) {
    this.logForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  handleSubmit() {
    console.log(this.logForm.value)
    this.api.userLoginApi(this.logForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('user', res.user)
        sessionStorage.setItem('profile', res.profile)
        this.toastr.success("Login successful!!!")
        if (res.userType == 'admin')
          this.router.navigateByUrl('/admin')
        else
          this.router.navigateByUrl('/')

      },
      error: (err: any) => {
        console.log(err)
        this.toastr.error("Login Failed...Inavlid Email or Password!!")
      }
    })
  }

}
