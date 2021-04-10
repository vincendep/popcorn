import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage implements OnInit {

  constructor(
    private tmdb: TmdbService
  ) {}

  ngOnInit(): void {
    this.tmdb.getMovieGenresList().subscribe(list => console.log(list))
  }
}
