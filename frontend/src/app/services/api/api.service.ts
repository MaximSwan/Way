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
    return this.http.post(`${this.apiUrl}addNewFolder/${folder.name}/${folder.parentName}`, folder).toPromise();
  }

  getAllFolders() {
    return this.http.get(`${this.apiUrl}getAllFolders`).toPromise();
  }

  addFolderOnHigt(folder: Folder) {
    return this.http.post(`${this.apiUrl}addNewFolderHight/${folder.name}/`, folder).toPromise();
  }

  deleteOneFolder(folder: Folder) {
    return this.http.delete(`${this.apiUrl}deleteFolder/${folder.name}`).toPromise();
  }

  addNewFile(file: FileFol, folder: Folder) {
    return this.http.post(`${this.apiUrl}addNewFile/${file.name}/${folder.name}`, file).toPromise();
  }

  deleteFile(file: FileFol) {
    return this.http.delete(`${this.apiUrl}deleteFile/${file.name}`).toPromise();
  }

  renameParent(folder: Folder, parent: Folder) {
    return this.http.post(`${this.apiUrl}folderRenameParent/${folder.name}/${parent.name}`, folder).toPromise();
  }

  getChildsOnName(folder: Folder) {
    return this.http.get(`${this.apiUrl}getChildFoldersOnName/${folder.name}`).toPromise();
  }

} 