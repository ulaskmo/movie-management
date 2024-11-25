import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for search functionality

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = []; // Original list of movies
  filteredMovies: any[] = []; // Filtered list of movies
  selectedMovie: any | null = null; // Selected movie for details display
  searchQuery: string = ''; // Search query for filtering movies

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  // Fetch all movies from the service
  fetchMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data; // Initialize filteredMovies with all movies
      },
      error: (err) => console.error('Error fetching movies: ', err),
    });
  }

  // Filter movies based on the search query
  searchMovies(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredMovies = this.movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query)
    );
  }

  // Show movie details
  showMovieDetails(movie: any): void {
    this.selectedMovie = movie;
  }

  // Hide movie details
  hideMovieDetails(): void {
    this.selectedMovie = null;
  }

  // Navigate to the edit movie form
  editMovie(id: string): void {
    this.router.navigate(['/movies/edit', id]);
  }

  // Delete a movie
  deleteMovie(id: string): void {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.fetchMovies(); // Refresh the movie list after deletion
        if (this.selectedMovie && this.selectedMovie._id === id) {
          this.hideMovieDetails(); // Clear selected movie if it's the one being deleted
        }
      },
      error: (err) => console.error('Error deleting movie: ', err),
    });
  }
}
