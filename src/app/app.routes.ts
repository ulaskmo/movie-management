import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/add', component: MovieFormComponent },
  { path: 'movies/edit/:id', component: MovieFormComponent },
  { path: 'movies/details/:id', component: MovieDetailsComponent }, // New details route
];
