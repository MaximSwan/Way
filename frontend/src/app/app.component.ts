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
    folderService.loadFoldersNow();
    this.folders = folderService.folders;
  }
  folders = [];
  toggle = true;
  folderNameInput;

  async postNewFolder() {
    if (!this.folderNameInput) {
      return alert('Введите название');
    }
    let folder = new Folder(this.folderNameInput);
    let newFold = await this.folderService.addNewFolder(folder);
    this.folders.push(newFold);
    this.folderNameInput = '';
  }

  onRemoveFolder(event) {
    this.folders.splice(this.folders.indexOf(event), 1);
  }

}
