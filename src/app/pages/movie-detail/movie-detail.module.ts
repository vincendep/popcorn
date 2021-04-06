import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { MovieCreditsDetailPageModule } from '../movie-credits-detail/movie-credits-detail.module';
import { MovieDetailPage } from './movie-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailPageRoutingModule,
    MovieCreditsDetailPageModule
  ],
  declarations: [MovieDetailPage]
})
export class MovieDetailPageModule {}
