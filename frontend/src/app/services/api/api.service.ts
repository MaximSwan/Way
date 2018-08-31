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
    return this.http.get(`${this.apiUrl}folders`).toPromise();
  }

  addFolder(folder: Folder) {
    return this.http.post(`${this.apiUrl}folder`, folder).toPromise();
  }

  deleteOneFolder(folder: Folder) {
    return this.http.delete(`${this.apiUrl}folder/${folder._id}`).toPromise();
  }

  addNewFile(file) {  
    return this.http.post(`${this.apiUrl}file`, file).toPromise();
  }

  deleteFile(file) {
    return this.http.delete(`${this.apiUrl}file/${file._id}`, file).toPromise();
  }

  renameParent(folder: Folder, parent: Folder) {
    return this.http.put(`${this.apiUrl}folder`, [parent, folder]).toPromise();
  }

  getChildsOnName(folder: Folder) {
    return this.http.get(`${this.apiUrl}folder/childs/${folder._id}`).toPromise();
  }

} 