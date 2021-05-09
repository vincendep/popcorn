import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TmdbMovieService } from 'src/app/services/tmdb/tmdb-movie.service';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { tap, map, filter, take, takeUntil } from 'rxjs/operators';
import { MovieCreditsDetailPage } from '../movie-credits-detail/movie-credits-detail.page';
import { Movie } from 'src/app/models/domain/movie';
import { Page } from 'src/app/models/common/page';
import { MovieWatchAvailability, WatchProvider } from 'src/app/models/domain/watch-provider';
import { LibraryService } from 'src/app/services/library.service';
import { MovieList } from 'src/app/models/domain/list';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit, OnDestroy {

  protected movie$: Observable<Movie>
  private isLiked: boolean;
  private isDisliked: boolean;
  private isInWatchList: boolean;
  protected streamingProviders$: Observable<MovieWatchAvailability>
  protected recommendedMovies$: Observable<Page<Movie>>
  protected movieCredits$
  private directors
  private cast
  private done$ = new Subject();

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private movieService: TmdbMovieService,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get("id");
    this.movie$ = this.movieService.getMovieDetails(+movieId)
    this.recommendedMovies$ = this.movieService.getMovieRecommendations(+movieId)
    this.streamingProviders$ = this.movieService.getMovieWatchProviders(+movieId)
    this.movieService.getMovieCredits(+movieId)
      .pipe(
        takeUntil(this.done$),
        tap((credits: any) => this.cast = credits.cast.slice(0, 25)),
        tap((credits: any) => this.directors = credits.crew.filter(person => person.job === "Director")))
      .subscribe()
    this.libraryService.isLiked(movieId)
      .pipe(takeUntil(this.done$))
      .subscribe(isLiked => this.isLiked = isLiked)
    this.libraryService.isDisliked(movieId)
      .pipe(takeUntil(this.done$))
      .subscribe(isDisliked => this.isDisliked = isDisliked)
    this.libraryService.isInWatchList(movieId)
        .pipe(takeUntil(this.done$))
        .subscribe(isInWatchList => this.isInWatchList = isInWatchList)
  }

  ngOnDestroy() {
    this.done$.next(true)
    this.done$.complete();
  }

  toggleLike(movie: Movie) {
    if (this.isLiked) {
      this.libraryService.removeFromLiked(movie.id)
    } else {
      this.libraryService.addToLiked(movie)
    }
  }

  toggleDislike(movie: Movie) {
    if (this.isDisliked) {
      this.libraryService.removeFromDisliked(movie.id)
    } else {
      this.libraryService.addToDisliked(movie)
    }
  }

  toggleWatchList(movie: Movie) {
    if (this.isInWatchList) {
      this.libraryService.removeFromWatchList(movie.id)
    } else {
      this.libraryService.addToWatchList(movie)
    }
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

  async showNewListAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Create a new list!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'List name'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'List description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss()
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            alert.dismiss({
              id: null,
              name: data.name,
              description:
              data.description,
              movies: []
            })
          }
        }
      ]
    });
    alert.present();
    return await alert.onDidDismiss<MovieList>().then(event => event.data)
  }
}
