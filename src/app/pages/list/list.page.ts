import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Observable, Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {

    private list$
    
    constructor(
      private route: ActivatedRoute,
      private modalController: ModalController,
      private tmdb: TmdbService
    ) { }
  
    ngOnInit() {
      this.tmdb.getAccount().subscribe((account: any) => {
        console.log(account)
        this.list$ = this.tmdb.getAllLists(account.id)
          .pipe(
            tap(res => console.log(res)),
            map((res: any) => res.results))
      })
    }
  
    getImageUrl(path: string) {
      return this.tmdb.getImageUrl(path)
    }
  }
