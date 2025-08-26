import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  sampleRecipes: any = []
  testimonyList: any[] = []

  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        console.log(res)
        this.sampleRecipes = res.slice(0, 3)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    this.api.getTestimonies().subscribe({
      next: (res: any) => {
        console.log(res)
        this.testimonyList = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
