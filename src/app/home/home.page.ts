import { Component, ViewChild, inject } from '@angular/core';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { WordComponent } from '../word/word.component';
import { OverlayEventDetail } from '@ionic/core/components';

import { DataService, Word } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private data = inject(DataService);
  words: Word[] = [];

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

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

  search(input: any): void {
    const query = input.target.value.toLowerCase();
    console.log(query);
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const wordToSearch = ev.detail.data;
      if (!wordToSearch) {
        console.log('No word in input !');
      }
      this.data.getDefinition(wordToSearch!).subscribe(response => {

        this.message = response;
        const definition = this.parseHtmlDefinitions(response);
        console.log(`Response, ${response}`);

      }, err => {
        console.log(`Error ${err}`)
      });
    
    }
  }

  parseHtmlDefinitions(response: Document): string[] {
    var pele = response.getElementsByTagName('d_dfn');
    let definitions: string[] = [];

    for(var i=0;i< pele.length;i++) {
      console.log(pele[i].innerHTML);
      definitions.push(pele[i].innerHTML);
    }
    return definitions;
  }
}
