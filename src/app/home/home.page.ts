import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { WordComponent } from '../word/word.component';

import { DataService, Word } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {}

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getWords(): Word[] {
    return this.data.getWords();
  }

  search(input: any) {
    const query = input.target.value.toLowerCase();
    console.log(query);
  }
}
