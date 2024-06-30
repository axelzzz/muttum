import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, Account, Databases, ID, Models, Query, Functions} from 'appwrite';
import { Observable } from 'rxjs';

export const PROJECT_ENDPOINT = 'https://cloud.appwrite.io/v1'; //'http://localhost/v1'
export const PROJECT_ID = '663f2e1b001c4047353b';               //'66426fca001565f70adf'
export const DATABASE_ID = '66675ea200176b0fbda8';
export const COLLECTION_ID = '66675eb4000d429d3706';

export const client = new Client()
    .setEndpoint(PROJECT_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);

export const dictionnaryEndpoint = 'https://dictionnaire.lerobert.com/definition';

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
  functions = new Functions(client);

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  public getWords(): Promise<any> {
    return this.databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID
    );
  }

  public getWordById(id: string): Promise<any> {
    return this.databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );
  }

  public getFunction(): Promise<any> {

    return this.functions.getExecution(
      '666cb2a100005fe9af61', // functionId
      '666e05cdc57e1a215e6c' // executionId
    );
  }

  public getDefinition(word: string): Observable<any> {
    const head = new HttpHeaders();
    //head.append('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any>(`${dictionnaryEndpoint}/${word}`, {
      headers: head
    });
  }

  public saveDefinition(word: Word): Promise<any> {
    return this.databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {}
      //JSON.stringify(word), // data
      //["read("any")"] // permissions (optional)
  );
  }
  
}
