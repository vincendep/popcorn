import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { MovieDetailPage } from './movie-detail.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MovieCreditsDetailPage } from '../movie-credits-detail/movie-credits-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MovieDetailPageRoutingModule
  ],
  declarations: [MovieDetailPage, MovieCreditsDetailPage]
})
export class MovieDetailPageModule {}
