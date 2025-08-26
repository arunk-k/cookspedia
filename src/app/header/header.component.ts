import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string = ""

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('user'))
      this.username = sessionStorage.getItem('user') || ""
  }

  logout() {
    sessionStorage.clear()
    this.toastr.info("User Logged Out!!")
    this.router.navigateByUrl('/log')
  }
}
