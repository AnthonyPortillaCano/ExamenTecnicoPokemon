import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PokemondetalleComponent} from './pokemondetalle/pokemondetalle.component';
const routes: Routes = [{path:'login',component:LoginComponent},{path:'',redirectTo:'login',pathMatch:'full'},{ path:'home', component: HomeComponent },
{ path:'pokemondetalle/:id/:name', component: PokemondetalleComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
