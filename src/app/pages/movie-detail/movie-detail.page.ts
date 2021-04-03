import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movie$
  private watchProviders$
  private director$
  private cast$
  private recommendedMovies$

  private cSlideOpts = {
    slidesPerView: 4,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  private mSlideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  private subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService
  ) { }

  ngOnInit() {
    const movieId = +this.route.snapshot.paramMap.get("id");
    this.movie$ = this.tmdb.getMovieDetails(movieId)
    this.cast$ = this.tmdb.getMovieCredits(movieId)
      .pipe(
        map((credits: any) => credits.cast.slice(0, 25)))
    this.director$ = this.tmdb.getMovieCredits(movieId)
      .pipe(
        map((credits: any) => credits.crew.find(person => person.job === "Director")))
    this.recommendedMovies$ = this.tmdb.getMovieRecommendations(movieId)
      .pipe(
        map((res: any) => res.results))
    this.watchProviders$ = this.tmdb.getMovieWatchProviders(movieId)
      .pipe(
        map((res: any) => res.results["IT"])
      )
    this.subscription = this.movie$.subscribe(movie => console.log(movie))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
