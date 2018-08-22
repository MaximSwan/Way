import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpClientModule } from '@angular/common/http';
import { Folder } from '../folder-service/folder-service.service';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:3000/'

  addFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}addNewFolder/${folder.name}/${folder.parentId}`, folder).toPromise();
  }

  getAllFolders() {
    return this.http.get(`${this.apiUrl}getAllFolders`).toPromise();
  }

}
