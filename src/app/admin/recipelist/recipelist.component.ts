import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit {
  recipeList: any = [] = []
  keyword: string = ""

  constructor(private api: AdminApiService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.api.recipeListApi().subscribe({
      next: (res: any) => {
        console.log(res)
        this.recipeList = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  handleDelete(id: any) {
    this.api.deleteRecipeApi(id).subscribe({
      next: (res: any) => {
        this.getData()
      },
      error: (err: any) => {
        this.toastr.error(err.error ? err.error : 'Deletion Failed!!')
      }
    })
  }

}
