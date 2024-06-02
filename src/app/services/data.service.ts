import { Injectable } from '@angular/core';
import { Client, Account, Databases, ID, Models, Query} from 'appwrite';

export const client = new Client().setEndpoint('http://localhost/v1')
    //.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66426fca001565f70adf'); // Replace with your project ID

export const account = new Account(client);


export interface Word {
  label: string;
  type: string;
  id: number;
  definition: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  databases = new Databases(client);  

  constructor() {}

  public getWords(): Promise<any> {
    return this.databases.listDocuments(
      'muttum-db',
      'mot'
    );
  }

  public getWordById(id: string): Promise<any> {
    return this.databases.getDocument(
      'muttum-db',
      'mot',
      id
    );
  }

  
}
