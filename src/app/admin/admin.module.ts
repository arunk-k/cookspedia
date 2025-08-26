import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { RequestsComponent } from './requests/requests.component';
import { UserlistComponent } from './userlist/userlist.component';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HighchartsChartModule} from 'highcharts-angular';
import { MatAnchor } from "@angular/material/button";


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'recipelist', component: RecipelistComponent },
  { path: 'addrecipe', component: AddrecipeComponent },
  { path: 'editrecipe/:rid', component: EditrecipeComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'requests', component: RequestsComponent },
]


@NgModule({
  declarations: [
    DashboardComponent,
    AddrecipeComponent,
    DownloadsComponent,
    EditrecipeComponent,
    RecipelistComponent,
    RequestsComponent,
    UserlistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterLink,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    HighchartsChartModule,
    MatAnchor
]
})
export class AdminModule { }
