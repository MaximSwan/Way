import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { Folder, FolderService } from './services/folder/folder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private api: ApiService,
    private folderService: FolderService
  ) {
    this.loadFolders();
  }

  toggle = true;
  folderNameInput;

  loadFolders() {
    this.folders.splice(0, this.folders.length);
    return this.api.getAllFolders()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          JSON.stringify(element);
          if (element.parentId) {
            return; 
          }
          this.folders.push(element);
        }
      })

  }
  
  postNewFolder() {
    let folder = new Folder();
    folder.name = this.folderNameInput;
    this.folders.push(folder);
    this.api.addFolderOnHigt(folder);
  }

  folders = [];

}
