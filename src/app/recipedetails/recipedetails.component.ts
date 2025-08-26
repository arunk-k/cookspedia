import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-recipedetails',
  standalone: true,
  imports: [],
  templateUrl: './recipedetails.component.html',
  styleUrl: './recipedetails.component.css'
})
export class RecipedetailsComponent {
  recipe: any = {}
  recipeId: any = ""
  downloadCount: any = 0
  constructor(private ar: ActivatedRoute, private api: ApiService, private toastr: ToastrService) {
    this.ar.params.subscribe((res: any) => {
      this.recipeId = res.rid
      this.getData(this.recipeId)
      this.getCount()
    })
  }

  getCount() {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.getDownloadcount(this.recipeId, header).subscribe({
      next: (res: any) => {
        console.log(res)
        this.downloadCount = res.count
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  getData(id: any) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    console.log(id)

    this.api.recipeDetailsApi(id, header).subscribe({
      next: (res) => {
        console.log(res)
        this.recipe = res
        this.getCount()
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  saveRecipe() {
    const { name, cuisine, image } = this.recipe
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.saveRecipeApi({ recipeId: this.recipeId, name, cuisine, image }, header).subscribe({
      next: (res: any) => {
        this.toastr.success("Recipe Added to Saved List!!")
      },
      error: (e) => {
        console.log(e)
        if (e.error) {
          this.toastr.error(e.error.message)
        }
        else {
          this.toastr.warning("Saving Failed..Something Went Wrong!!")
        }
      }
    })
  }

  downloadRecipe() {
    const doc = new jsPDF()
    autoTable(doc, {

      startY: 30,
      head: [['', 'Details']],
      body: [
        ['NAME', this.recipe.name],
        ['MEAL TYPE', this.recipe.mealType.join(",")],
        ['CUISINE', this.recipe.cuisine],
        ['COOKING TIME(in minutes)', this.recipe.cookTimeMinutes],
        ['PREPARATION TIME(in minutes)', this.recipe.prepTimeMinutes],
        ['INGREDIENTS', this.recipe.ingredients.join('\n')],
        ['INSTRUCTIONS', this.recipe.instructions.join('\n')],
      ],
    })

    doc.text(this.recipe.name, 10, 10)
    doc.save(this.recipe.name.replace(" ", "_") + ".pdf")
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.downloadRecipeApi(this.recipe._id,{recipeName:this.recipe.name}, header).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getCount()
      },
      error: (e: any) => {
        console.log(e)

      }
    })
  }

}
