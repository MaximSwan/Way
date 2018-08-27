import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpClientModule } from '@angular/common/http';
import { Folder, FolderService, FileFol } from '../folder/folder.service';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = 'http://localhost:3000/'

  addFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}addNewFolder/${folder.name}/${folder.parentId}`, folder).toPromise();
  }

  getAllFolders() {
    return this.http.get(`${this.apiUrl}getAllFolders`).toPromise();
  }

  addFolderOnHigt(folder: Folder) {
    return this.http.post(`${this.apiUrl}addNewFolderHight/${folder.name}/`, folder).toPromise();
  }

  getChildsOfFolder(folder: Folder) {
    return this.http.get(`${this.apiUrl}getChildFolders/${folder._id}`).toPromise();
  }

  deleteOneFolder(folder: Folder) {
    return this.http.delete(`${this.apiUrl}deleteFolder/${folder._id}`).toPromise();
  }
 
  addNewFile(file:FileFol, folder:Folder) {
    return this.http.post(`${this.apiUrl}addNewFile/${file.name}/${folder._id}`,file).toPromise();
  }

  deleteFile(file:FileFol) {
    return this.http.delete(`${this.apiUrl}deleteFile/${file._id}`).toPromise();
  }
}