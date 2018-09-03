import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { AppComponent } from '../../app.component';
import { Folder, FolderService } from '../../services/folder/folder.service';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  @Input('myFolder') folderChild;

  @Input('folderName') folder;

  @Output() removeFolder = new EventEmitter<string>();

  @Output() deleteDropedFolder = new EventEmitter<string>();

  constructor(
    private api: ApiService,
    private folderService: FolderService
  ) {
    this.folders = folderService.foldersChild;
  }

  togglePlsMns = true;
  folders = [];
  newFoldIn;
  childs = [];
  folderChilds = [];
  toggleAdd = true;
  fileIn;
  toggleEmpty = true;
  toggleCheked = true;

  folderOnDrop(event: any) {
    if (event.dragData.name == this.folder._id) {
      return;
    }
    if (event.dragData.parentId == this.folder._id) {
      return;
    }
    this.api.renameParent(event.dragData, this.folder);
    if (event.dragData.isType) {
      this.folders.push(event.dragData);
      return this.toggleEmpty = true;
    }
    this.folders.push(event.dragData);
    this.toggleEmpty = true;

  }

  folderOnDrag(event) {
    this.deleteDropedFolder.emit(this.folder);
  }

  removeThisFolder(event) {
    this.folders.splice(this.folders.indexOf(event), 1);
  }

  async deleteCurFolder(folder) {
    let res: any = await this.api.getChildsOnName(folder);
    if (res.length != 0) {
      return this.toggleCheked = !this.toggleCheked;
    }
    this.api.deleteFolder(folder);
    this.removeFolder.emit(folder);
  }

  deleteCurFolderEmtpy(folder) {
    console.log(folder);
    this.api.deleteFolder(folder);
    this.removeFolder.emit(folder);
  }

  async addFileInFolder(folder) {
    if (!this.fileIn) {
      return alert('Введите название');
    }
    let file = new Folder(this.fileIn, folder._id, null, 'file');
    this.folderService.addNewFile(file);
    this.toggleAdd = !this.toggleAdd;
    this.fileIn = '';
    this.toggleEmpty = true;
  }

  async addChildFolder(folder) {
    if (!this.newFoldIn) {
      return alert('Введите название')
    }
    let newFolder = new Folder(this.newFoldIn, folder._id);
    this.folderService.addNewChildFolder(newFolder);
    this.toggleAdd = !this.toggleAdd;
    this.newFoldIn = '';
    this.toggleEmpty = true;
  }

  async getChildFold(folder) {
    let res: any = await this.api.getChildsOnName(folder);
    if (res.length == 0) {
      this.toggleEmpty = !this.toggleEmpty;
    }
    this.folders.splice(0, this.folders.length);
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      JSON.stringify(element);
      this.folders.push(element);
    }
    this.togglePlsMns = !this.togglePlsMns;
  }

  addFileDrop(event) {
    this.folders.push(event);
  }

  onRemoveFolder(event) {
    this.folders.splice(this.folders.indexOf(event), 1);
  }

  removeCurItem(event) {
    this.folders.splice(this.folders.indexOf(event), 1);
  }

  ngOnInit() {
  }

}