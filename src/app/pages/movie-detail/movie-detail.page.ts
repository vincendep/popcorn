import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TmdbMovieService } from 'src/app/services/tmdb/tmdb-movie.service';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { MovieCreditsDetailPage } from '../movie-credits-detail/movie-credits-detail.page';
import { Movie } from 'src/app/models/domain/movie';
import { Page } from 'src/app/models/page';
import { MovieStreamingProviders, StreamingProvider } from 'src/app/models/domain/streaming-provider';
import { TmdbStreamingProviderService } from 'src/app/services/tmdb/tmdb-streaming-provider.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movie$: Observable<Movie>
  private streamingProviders$: Observable<MovieStreamingProviders>
  private recommendedMovies$: Observable<Page<Movie>>
  private movieCredits$
  private directors
  private cast

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private movieService: TmdbMovieService,
    private watchProviderService: TmdbStreamingProviderService
  ) { }

  ngOnInit() {
    const movieId = +this.route.snapshot.paramMap.get("id");
    this.movie$ = this.movieService.getMovieDetails(movieId)
    this.recommendedMovies$ = this.movieService.getMovieRecommendations(movieId)
    this.streamingProviders$ = this.watchProviderService.getMovieWatchProviders(movieId)
    this.movieService.getMovieCredits(movieId)
      .pipe(
        tap((credits: any) => this.cast = credits.cast.slice(0, 25)),
        tap((credits: any) => this.directors = credits.crew.filter(person => person.job === "Director")))
      .subscribe()
  }

  async showMovieCredits() {
    const modal = await this.modalController.create({
      component: MovieCreditsDetailPage,
      componentProps: {
        directors: this.directors,
        cast: this.cast
      }
    });
    return await modal.present();
  }
}
