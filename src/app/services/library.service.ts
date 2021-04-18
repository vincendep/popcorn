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
  private _watchList: BehaviorSubject<Movie[]> = new BehaviorSubject([])

  public readonly lists$: Observable<List[]> = this._lists.asObservable()
  public readonly liked$: Observable<Movie[]> = this._liked.asObservable()
  public readonly  watchList$: Observable<Movie[]> = this._watchList.asObservable()

  constructor(private storageService: StorageService) {
    this.init()
  }

  createList(aList: List): Observable<List> {
    const lists = this._lists.getValue()
    const list: List = Object.assign({}, aList)
    list.id = ((Math.max(...lists.map(l => +l.id)) || 0) + 1).toString()
    lists.push(list)
    return from(this.storageService.set("library.lists", lists)
      .then(_ => this._lists.next(lists))
      .then(_ => list)) as Observable<List>

  }

  deleteList(listId: string) {
    const lists = this._lists.getValue()
    const list = lists.find(list => list.id === listId)
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
    const list = lists.find(l => l.id === listId)
    if (list) {
      if (!list.movies.find(m => m.id === movie.id)) {
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
    const list = lists.find(l => l.id === listId)
    const movie = list.movies.find(m => m.id === movieId)
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
        map(lists => lists.filter(list => list.movies.some(m => m.id === movie.id)))
      )
  }

  addToWatchList(movie: Movie) {
    const watchlist = this._watchList.getValue()
    if (!watchlist.find(m => m.id === movie.id)) {
      watchlist.push(Movie.from(movie))
      this.storageService.set('library.watchlist', watchlist)
        .then(_ => this._watchList.next(watchlist))
    } else {
      throw `Movie with id=${movie.id} is already present in the watchlist`
    }
  }

  removeFromWatchList(movieId: string) {
    const watchlist = this._watchList.getValue()
    const movie = watchlist.find(m => m.id === movieId)
    if (movie) {
      watchlist.splice(watchlist.indexOf(movie), 1)
      this.storageService.set('library.watchlist', watchlist)
        .then(_ => this._watchList.next(watchlist))
    } else {
      throw `Movie with id=${movie.id} is not present in the watchlist`
    }
  }

  isInWatchList(movie: Movie): Observable<boolean> {
    return this._watchList
      .asObservable()
      .pipe(
        map(watchlist => watchlist.some(m => m.id === movie.id ))
      )
  }

  addToLiked(movie: Movie) {
    const liked = this._liked.getValue()
    if (!liked.find(m => m.id === movie.id)) {
      liked.push(Movie.from(movie))
      this.storageService.set('library.liked', liked)
        .then(_ => this._liked.next(liked))
    } else {
      throw `Movie with id=${movie.id} is already liked`
    }
  }

  removeFromLiked(movieId: string) {
    const liked = this._liked.getValue()
    const movie = liked.find(m => m.id === movieId)
    if (movie) {
      liked.splice(liked.indexOf(movie), 1)
      this.storageService.set('library.liked', liked)
        .then(_ => this._liked.next(liked))
    } else {
      throw `Movie with id=${movie.id} is not yet liked`
    }
  }

  isLiked(movie: Movie): Observable<boolean> {
    return this._liked
      .asObservable()
      .pipe(
        map(liked => liked.some(m => m.id === movie.id))
      )
  }

  private init() {
    this.storageService.get("library.lists")
      .then(lists => this._lists.next(lists || []))
    this.storageService.get("library.watchlist")
      .then(watchlist => this._watchList.next(watchlist || []))
    this.storageService.get("library.liked")
      .then(liked => this._liked.next(liked || []))
  }
}
