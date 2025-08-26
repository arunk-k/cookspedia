import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../model/recipe.model';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent implements OnInit {

  cuisineList: any[] = []
  mealTypeList: any[] = []

  instructionSet: any[] = []
  ingredientSet: any[] = []
  mealtypeSet: any[] = []

  recipeData: RecipeModel = {}

  rid: any = ""

  ngOnInit(): void {
    this.getData()
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    this.api.recipeDetailsApi(this.rid, header).subscribe({
      next: (res: any) => {
        console.log(res)
        this.recipeData = res
        this.instructionSet=res?.instructions
        this.ingredientSet=res?.ingredients
        this.mealtypeSet=res?.mealType
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }


  constructor(private api: ApiService,private admin: AdminApiService,  private toastr: ToastrService, private router: Router, private ar: ActivatedRoute) {
    this.ar.params.subscribe({
      next: (res: any) => {
        this.rid = res.rid
      }
    })
  }
  getData() {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        console.log(res)
        res.map((item: any) => item.cuisine).forEach((item: any) => {
          if (!this.cuisineList.includes(item)) {
            this.cuisineList.push(item)
          }
        })
        console.log(this.cuisineList)


        res.map((item: any) => item.mealType).flat().forEach((item: any) => {
          if (!this.mealTypeList.includes(item)) {
            this.mealTypeList.push(item)
          }
        })
        console.log(this.mealTypeList)


      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  addInstructions(instructionInput: any) {
    if (instructionInput.value) {
      this.instructionSet?.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructionSet)
    }
  }

  removeInstructions(val: any) {
    if (val) {
      this.instructionSet = this.instructionSet.filter((item: any) => item != val)
    }
  }

  addIngredients(input: any) {
    if (input.value) {
      this.ingredientSet?.push(input.value)
      input.value = ""
      console.log(this.ingredientSet)
    }
  }

  removeIngredients(val: any) {
    if (val) {
      this.ingredientSet = this.ingredientSet.filter((item: any) => item != val)
    }
  }

  handleMealType(event: any) {
    if (event.target.checked) {
      this.mealtypeSet?.push(event.target.name)
    } else {
      this.mealtypeSet = this.mealtypeSet.filter((item: any) => item != event.target.name)
    }
    console.log(this.mealtypeSet);

  }
  handleSubmit() {
    this.recipeData.ingredients = this.ingredientSet
    this.recipeData.instructions = this.instructionSet
    this.recipeData.mealType = this.mealtypeSet
    console.log(this.recipeData)
    this.admin.updateRecipeApi(this.rid,this.recipeData).subscribe({
      next: (res: any) => {
        this.toastr.success("Recipe Updated!!")
        this.router.navigateByUrl('/admin/recipelist')
      },
      error: (err: any) => {
        this.toastr.error(err.error ? err.error : "Updating recipe Failed!!")
      }
    })

  }
}

