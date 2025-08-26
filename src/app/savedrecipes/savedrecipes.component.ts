import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-savedrecipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './savedrecipes.component.html',
  styleUrl: './savedrecipes.component.css'
})
export class SavedrecipesComponent implements OnInit {
  savedList: any = [];

  constructor(private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    });

    this.api.savedRecipesListApi(header).subscribe({
      next: (res) => {
        this.savedList = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  handleDelete(id: any) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.deleteSavedRecipeApi(id, header).subscribe({
      next: (res: any) => {
        this.ngOnInit()
        this.toastr.success("Deleted SuccessFully")
      },
      error: (e) => {
        console.log(e)
        this.toastr.error("Deletion Failed!! Something Went Wrong!!")

      }
    })
  }
}
