import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../models/domain/list';
import { Movie } from '../models/domain/movie';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private _lists: BehaviorSubject<List[]> = new BehaviorSubject([])
  private _liked: BehaviorSubject<Movie[]> = new BehaviorSubject([])
  private _disliked: BehaviorSubject<Movie[]> = new BehaviorSubject([])
  private _watchList: BehaviorSubject<Movie[]> = new BehaviorSubject([])

  public readonly lists$: Observable<List[]> = this._lists.asObservable()
  public readonly liked$: Observable<Movie[]> = this._liked.asObservable()
  public readonly disliked$: Observable<Movie[]> = this._disliked.asObservable()
  public readonly  watchList$: Observable<Movie[]> = this._watchList.asObservable()

  constructor(private storageService: StorageService) {
    this.init()
  }

  async createList(aList: List) {
    const lists = this._lists.getValue()
    const list: List = Object.assign({}, aList)
    list.id = ((Math.max(...lists.map(l => +l.id)) || 0) + 1).toString()
    lists.push(list)
    return this.storageService.set("library.lists", lists)
      .then(_ => this._lists.next(lists))
      .then(_ => list)

  }

  deleteList(listId: string) {
    const lists = this._lists.getValue()
    const list = lists.find(list => list.id == listId)
    if (list) {
      lists.splice(lists.indexOf(list), 1)
      this.storageService.set("library.lists", lists)
        .then(_ => this._lists.next(lists))
    } else {
      throw `Cannot find a list with id=${listId}`
    }
  }

  addToList(movie: Movie, listId: string) {
    const lists = this._lists.getValue()
    const list = lists.find(l => l.id == listId)
    if (list) {
      if (!list.movies.find(m => m.id == movie.id)) {
        list.movies.push(Movie.from(movie))
        this.storageService.set('library.lists', lists)
          .then(_ => this._lists.next(lists))
      } else {
        throw `Movie with id=${movie.id} is already present in list with id=${listId}`
      }
    } else {
      throw `Cannot find a list with id=${listId}`
    }
  }

  removeFromList(movieId: string, listId: string) {
    const lists = this._lists.getValue()
    const list = lists.find(l => l.id == listId)
    const movie = list.movies.find(m => m.id == movieId)
    if (movie) {
      list.movies.splice(list.movies.indexOf(movie), 1)
      this.storageService.set('library.lists', lists)
        .then(_ => this._lists.next(lists))
    } else {
      throw `Movie with id=${movie.id} is not present in list with id=${listId}`
    }
  }

  getListsEnclosedIn(movie: Movie): Observable<List[]> {
    return this._lists
      .asObservable()
      .pipe(
        map(lists => lists.filter(list => list.movies.some(m => m.id == movie.id)))
      )
  }

  async addToWatchList(movie: Movie) {
    const watchlist = this._watchList.getValue()
    if (!watchlist.find(m => m.id == movie.id)) {
      watchlist.push(Movie.from(movie))
      return this.storageService.set('library.watchlist', watchlist)
        .then(_ => this._watchList.next(watchlist))
    } else {
      throw `Movie with id=${movie.id} is already present in the watchlist`
    }
  }

  async removeFromWatchList(movieId: string) {
    const watchlist = this._watchList.getValue()
    const movie = watchlist.find(m => m.id == movieId)
    if (movie) {
      watchlist.splice(watchlist.indexOf(movie), 1)
      return this.storageService.set('library.watchlist', watchlist)
        .then(_ => this._watchList.next(watchlist))
    } else {
      throw `Movie with id=${movie.id} is not present in the watchlist`
    }
  }

  isInWatchList(movieId: string): Observable<boolean> {
    return this._watchList
      .asObservable()
      .pipe(
        map(watchlist => watchlist.some(m => m.id == movieId ))
      )
  }

  async addToLiked(movie: Movie) {
    const liked = this._liked.getValue()
    if (!liked.find(m => m.id == movie.id)) {
      const wasDisliked = this._disliked.getValue().some(m => m.id == movie.id)
      if (wasDisliked) {
        await this.removeFromDisliked(movie.id)
      }
      liked.push(Movie.from(movie))
      return this.storageService.set('library.liked', liked)
        .then(_ => this._liked.next(liked))
    } else {
      throw `Movie with id=${movie.id} is already liked`
    }
  }

  async addToDisliked(movie: Movie) {
    const disliked = this._disliked.getValue()
    if (!disliked.find(m => m.id === movie.id)) {
      const wasLiked = this._liked.getValue().some(m => m.id == movie.id)
      if (wasLiked) {
        await this.removeFromLiked(movie.id)
      }
      disliked.push(Movie.from(movie))
      return this.storageService.set('library.disliked', disliked)
        .then(_ => this._disliked.next(disliked))
    } else {
      throw `Movie with id=${movie.id} is already liked`
    }
  }

  removeFromLiked(movieId: string) {
    const liked = this._liked.getValue()
    const movie = liked.find(m => m.id == movieId)
    if (movie) {
      liked.splice(liked.indexOf(movie), 1)
      return this.storageService.set('library.liked', liked)
        .then(_ => this._liked.next(liked))
    } else {
      throw `Movie with id=${movie.id} is not yet liked`
    }
  }

  removeFromDisliked(movieId: string) {
    const disliked = this._disliked.getValue()
    const movie = disliked.find(m => m.id == movieId)
    if (movie) {
      disliked.splice(disliked.indexOf(movie), 1)
      return this.storageService.set('library.disliked', disliked)
        .then(_ => this._disliked.next(disliked))
    } else {
      throw `Movie with id=${movie.id} is not yet disliked`
    }
  }

  isLiked(movieId: string): Observable<boolean> {
    return this._liked
      .asObservable()
      .pipe(
        map(liked => liked.some(m => m.id == movieId))
      )
  }

  isDisliked(movieId: string): Observable<boolean> {
    return this._disliked
      .asObservable()
      .pipe(
        map(disliked => disliked.some(m => m.id == movieId))
      )
  }

  private init() {
    this.storageService.get("library.lists")
      .then(lists => this._lists.next(lists || []))
    this.storageService.get("library.watchlist")
      .then(watchlist => this._watchList.next(watchlist || []))
    this.storageService.get("library.liked")
      .then(liked => this._liked.next(liked || []))
    this.storageService.get("library.disliked")
      .then(disliked => this._disliked.next(disliked || []))
  }
}
