import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpClientModule } from '@angular/common/http';
import { Folder, FolderService } from '../folder/folder.service';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = 'http://localhost:3000/'

  addFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}folder/child`, folder).toPromise();
  }

  getAllFolders() {
    return this.http.get(`${this.apiUrl}folders`).toPromise();
  }

  addFolderOnHigt(folder: Folder) {
    return this.http.post(`${this.apiUrl}folder`, folder).toPromise();
  }

  deleteOneFolder(folder: Folder) {
    return this.http.delete(`${this.apiUrl}folder/${folder.name}`).toPromise();
  }

  addNewFile(file) {
    return this.http.post(`${this.apiUrl}file`, file).toPromise();
  }

  deleteFile(file) {
    return this.http.delete(`${this.apiUrl}file/${file.name}`).toPromise();
  }

  renameParent(folder: Folder, parent: Folder) {
    return this.http.put(`${this.apiUrl}folderRenameParent/${folder.name}/${parent.name}`, folder).toPromise();
  }

  getChildsOnName(folder: Folder) {
    return this.http.get(`${this.apiUrl}folder/childs/${folder.name}`).toPromise();
  }

} 