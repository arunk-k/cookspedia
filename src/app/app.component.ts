import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cookspedia';
  constructor(private router: Router) { }
  hideUpandDown() {
    const hiddenRoutes: any = ['/log', '/reg','/admin','/admin/userlist','/admin/recipelist','/admin/addrecipe','/admin/editrecipe','/admin/downloads','/admin/requests']
    return hiddenRoutes.includes(this.router.url)
  }
}
