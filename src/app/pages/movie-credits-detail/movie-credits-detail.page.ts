import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-movie-credits-detail',
  templateUrl: './movie-credits-detail.page.html',
  styleUrls: ['./movie-credits-detail.page.scss'],
})
export class MovieCreditsDetailPage implements OnInit {

  @Input('directors') directors
  @Input('cast') cast

  constructor(
    private modalController: ModalController,
    private tmdb: TmdbService
  ) {}

  ngOnInit() {}

  getImageUrl(path: string) {
    return this.tmdb.getImage(path)
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
