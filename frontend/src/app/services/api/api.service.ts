import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpClientModule } from '@angular/common/http';
import { Folder, FolderService } from '../folder/folder.service';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = 'http://localhost:3000/'

  getAllFolders() {
    return this.http.get(`${this.apiUrl}nodes`).toPromise();
  }

  addFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}node`, folder).toPromise();
  }

  deleteOneFolder(folder: Folder) {
    return this.http.delete(`${this.apiUrl}node/${folder._id}`).toPromise();
  }

  renameParent(folder: Folder, parent: Folder) {
    return this.http.put(`${this.apiUrl}node`, [parent, folder]).toPromise();
  }

  getChildsOnName(folder: Folder) {
    return this.http.get(`${this.apiUrl}node/${folder._id}/childs`).toPromise();
  }

} 