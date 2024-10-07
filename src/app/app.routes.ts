import { Routes } from '@angular/router';
import { LoginPageKishorComponent } from './login-page-kishor/login-page-kishor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { WearhouseComponent } from './wearhouse/wearhouse.component';
import { AddStateComponent } from './add-state/add-state.component';
import { AddWearhouseComponent } from './add-wearhouse/add-wearhouse.component';
import { AddCityComponent } from './add-city/add-city.component';


export const routes: Routes = [ 
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageKishorComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'state', component: StateComponent },
      { path: 'city', component: CityComponent },
      { path: 'warehouse', component: WearhouseComponent },
      { path: 'addstate', component: AddStateComponent },
      { path: 'addcity', component: AddCityComponent },
      { path: 'addwarehouse', component: AddWearhouseComponent },
      {path: 'addstate/:id', component: AddStateComponent},
      {path: 'addcity/:id', component: AddCityComponent},
      {path: 'addwarehouse/:id', component: AddWearhouseComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' } // Default route to home
    ]
  }
    
];


