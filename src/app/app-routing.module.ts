import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { BlankPageComponent } from './components/blank-page/blank-page.component';


const routes: Routes = [
  { path: '', component: BlankPageComponent },
  { path: 'auto-complete', component: AutoCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
