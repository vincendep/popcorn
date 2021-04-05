import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { MovieCreditsDetailPage } from '../movie-credits-detail/movie-credits-detail.page';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  private movie$
  private movieCredits$
  private watchProviders$
  private directors
  private cast
  private recommendedMovies$

  constructor(
    private route: ActivatedRoute,
    private modalController: ModalController,
    private tmdb: TmdbService
  ) { }

  ngOnInit() {
    const movieId = +this.route.snapshot.paramMap.get("id");
    this.movie$ = this.tmdb.getMovieDetails(movieId)
    this.recommendedMovies$ = this.tmdb.getMovieRecommendations(movieId)
      .pipe(
        map((res: any) => res.results))
    this.watchProviders$ = this.tmdb.getMovieWatchProviders(movieId)
      .pipe(
        map((res: any) => res.results["IT"]))
    this.tmdb.getMovieCredits(movieId)
      .pipe(
        tap((credits: any) => this.cast = credits.cast.slice(0, 25)),
        tap((credits: any) => this.directors = credits.crew.filter(person => person.job === "Director")))
      .subscribe()
  }

  getImageUrl(path: string) {
    return this.tmdb.getImageUrl(path)
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
