import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' }, // Home route
  { path: 'movies', component: MovieListComponent }, // Movie List route
  { path: 'movies/add', component: MovieFormComponent }, // Add Movie route
  { path: 'movies/edit/:id', component: MovieFormComponent }, // Edit Movie route
];
