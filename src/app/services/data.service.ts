import { Injectable } from '@angular/core';

export interface Word {
  label: string;
  type: string;
  date: string;
  id: number;
  read: boolean;
  definition: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public words: Word[] = [
    {
      label: 'Word 1',
      type: 'Noun',
      date: '9:32 AM',
      id: 0,
      read: false,
      definition: 'No definition saved'
    },
    {
      label: 'Word 2',
      type: 'Verb',
      date: '6:12 AM',
      id: 1,
      read: false,
      definition: 'No definition saved'
    },
    {
      label: 'Word 3',
      type: 'Noun',
      date: '4:55 AM',
      id: 2,
      read: false,
      definition: 'No definition saved'
    }
  ];

  constructor() { }

  public getWords(): Word[] {
    return this.words;
  }

  public getWordById(id: number): Word {
    return this.words[id];
  }
}
