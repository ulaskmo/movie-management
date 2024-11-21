import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  movieForm!: FormGroup;
  movieId!: string;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    this.initializeForm();

    if (this.movieId) {
      this.loadMovieData();
    }
  }

  initializeForm(): void {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      rentalPrice: [null, Validators.required],
      availableCopies: [null, [Validators.required, Validators.min(1)]],
    });
  }

  loadMovieData(): void {
    this.movieService.getMovies().subscribe((movies) => {
      const movie = movies.find((m) => m._id === this.movieId);
      if (movie) {
        this.movieForm.patchValue(movie);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movie = this.movieForm.value;
      if (this.movieId) {
        this.movieService.updateMovie(this.movieId, movie).subscribe(() => {
          this.router.navigate(['/movies']);
        });
      } else {
        this.movieService.addMovie(movie).subscribe(() => {
          this.router.navigate(['/movies']);
        });
      }
    }
  }
}
