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
  words: Word[] = [];

  constructor() {
    this.getWords();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getWords(): void {
    this.data.getWords().then(response => {
      this.words = this.parseResponse(response);
      
    }, function (error) {
      console.log(error);
    });
  }
  
  private parseResponse(response: any): Word[] {
    const resultats = response.documents;
    const result: Word[] = [];
    for(let i=0 ; i < resultats.length ; i++) {
      const resultat = resultats[i];
      result.push({
        label: resultat.libelle,
        type: resultat.type,
        definition: resultat.definition,
        id: resultat.$id,
      } as Word);
    }
    
    return result;
  }

  search(input: any) {
    const query = input.target.value.toLowerCase();
    console.log(query);
  }
}
