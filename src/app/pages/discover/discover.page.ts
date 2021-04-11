import { Component, OnInit } from '@angular/core';
import { TmdbMovieService } from 'src/app/services/tmdb/tmdb-movie.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage implements OnInit {

  constructor(
    private tmdb: TmdbMovieService
  ) {}

  ngOnInit(): void {
    this.tmdb.getMovieGenresList().subscribe(list => console.log(list))
  }
}
