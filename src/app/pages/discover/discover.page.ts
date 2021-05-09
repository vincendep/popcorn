import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from 'src/app/models/domain/country';
import { MovieList } from 'src/app/models/domain/list';
import { PopcornService } from 'src/app/services/popcorn.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss']
})
export class DiscoverPage implements OnInit {

  protected lists: MovieList[]
  private done$ = new Subject();

  constructor(private popcorn: PopcornService) {}

  ngOnInit(): void {
    this.popcorn.watchProviderService.getWatchProviders(Country.IT).subscribe(console.log)
  }

  ngOnDestroy() {
    this.done$.next(true);
    this.done$.complete();
  }
}
