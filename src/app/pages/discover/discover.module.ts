import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';

import { DiscoverRoutingModule } from './discover-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DiscoverRoutingModule
  ],
  declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
