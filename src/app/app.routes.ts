import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditPageComponent } from './edit-page/edit-page.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'edit/:id', component: EditPageComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: 'home' }, // Ruta por defecto para rutas desconocidas
  ];
