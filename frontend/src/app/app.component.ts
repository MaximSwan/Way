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
  folders = [];
  toggle = true;
  folderNameInput;

  loadFolders() {
    this.folders.splice(0, this.folders.length);
    return this.api.getAllFolders()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          JSON.stringify(element);
          if (element.parentName) {
            return;
          }
          this.folders.push(element);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  postNewFolder() {
    if (!this.folderNameInput) {
      return alert('Введите название');
    }
    this.api.getAllFolders()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const elem = res[i];
          if (elem.name == this.folderNameInput) {
            return alert('Такая папка уже существует')
          }
        }
        let folder = new Folder();
        folder.name = this.folderNameInput;
        this.folders.push(folder);
        this.api.addFolderOnHigt(folder);
        this.folderNameInput = '';
      })
      .catch(err => {
        console.error(err);
      })
  }

  onRemoveFolder(event) {
    this.folders.splice(event, 1);
  }

}
