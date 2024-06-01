import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewWordPage } from './view-word.page';

import { IonicModule } from '@ionic/angular';

import { ViewWordPageRoutingModule } from './view-word-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWordPageRoutingModule
  ],
  declarations: [ViewWordPage]
})
export class ViewWordPageModule {}
