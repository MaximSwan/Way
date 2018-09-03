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
    this.folderService.updateFolder(event.dragData, this.folder);
    // this.api.renameParent(event.dragData, this.folder);
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
    let res: any = await this.folderService.loadChilds(folder);
    if (res != 0) {
      return this.toggleCheked = !this.toggleCheked;
    }
    this.folderService.deleteFolder(folder);
    this.removeFolder.emit(folder);
  }

  deleteCurFolderEmtpy(folder) {
    this.folderService.deleteFolder(folder);
    this.removeFolder.emit(folder);
  }

  async addChildFolder(folder) {
    try {
      if (this.newFoldIn) {
        let newFolder = new Folder(this.newFoldIn, folder._id);
        let result = await this.folderService.addNewFolder(newFolder);
        this.folders.push(result);
      }
      if (this.fileIn) {
        let newFolder = new Folder(this.fileIn, folder._id, null, 'file');
        let result = await this.folderService.addNewFolder(newFolder);
        this.folders.push(newFolder);
      }
      this.toggleAdd = !this.toggleAdd;
      this.newFoldIn = '';
      this.toggleEmpty = true;
    } catch (err) {
      console.error(err);
    }
  }


  async getChildFold(folder) {
    try {
      let res: any = await this.folderService.loadChilds(folder);
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
    } catch (err) {
      console.error(err);
    }
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