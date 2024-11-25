import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any | null = null; // Track the currently selected movie

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('Error: ', err),
    });
  }

  showMovieDetails(movie: any): void {
    this.selectedMovie = movie; // Set the selected movie
  }

  hideMovieDetails(): void {
    this.selectedMovie = null; // Clear the selected movie
  }

  editMovie(id: string): void {
    this.router.navigate(['/movies/edit', id]); // Navigate to the edit form
  }

  deleteMovie(id: string): void {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.fetchMovies();
      this.hideMovieDetails(); // Clear the details if the selected movie is deleted
    });
  }

}
