import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { DataService, Word } from '../services/data.service';

@Component({
  selector: 'app-view-word',
  templateUrl: './view-word.page.html',
  styleUrls: ['./view-word.page.scss'],
})
export class ViewWordPage implements OnInit {
  public word!: Word;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.data.getWordById(id).then(response => {
      this.word = this.parseResponse(response);
    });

    this.data.getFunction().then(response => {
      console.log(`reponse: ${response}`);
    })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  private parseResponse(response: any): Word {
    return {
      label: response.libelle,
      type: response.type,
      definition: response.definition,
      id: response.$id,
    } as Word;
  }
}
