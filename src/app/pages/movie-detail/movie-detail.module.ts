import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { MovieCreditsDetailPageModule } from '../movie-credits-detail/movie-credits-detail.module';
import { MovieDetailPage } from './movie-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MovieDetailPageRoutingModule,
    MovieCreditsDetailPageModule
  ],
  declarations: [MovieDetailPage]
})
export class MovieDetailPageModule {}
