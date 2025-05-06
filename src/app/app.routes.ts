import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RickMortyListComponent } from './components/rick-morty-list/rick-morty-list.component';
import { NasaDataComponent } from './components/nasa-data/nasa-data.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { 
    path: 'rick-morty', 
    component: RickMortyListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'nasa', 
    component: NasaDataComponent,
    canActivate: [authGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/rick-morty', pathMatch: 'full' },
  { path: '**', redirectTo: '/rick-morty' }
];