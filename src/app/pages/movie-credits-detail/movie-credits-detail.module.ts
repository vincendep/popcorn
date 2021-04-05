import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieCreditsDetailPage } from '../movie-credits-detail/movie-credits-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [MovieCreditsDetailPage]
})
export class MovieCreditsDetailPageModule {}
