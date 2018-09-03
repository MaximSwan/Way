import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class FolderService {

  constructor(
    private api: ApiService
  ) { }

  folders = [];

  updateFolder(dragData, folder: Folder) {
    return this.api.renameParent(dragData, folder)
      .catch(err => {
        console.error(err);
      })
  }

  async loadChilds(folder) {
    return this.api.getChildsOnName(folder)
      .catch(err => {
        console.error(err);
      })
  }

  async deleteFolder(folder: Folder) {
    return this.api.getChildsOnName(folder)
      .then(async (res: any) => {
        let deletedFolder = await this.api.deleteFolder(folder)
      })
  }

  async addNewFolder(folder: Folder) {
    return this.api.addFolder(folder)
      .catch(err => {
        console.error(err);
      })
  }

  loadFoldersNow() {
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
      .catch(err => {
        console.error(err);
      })
  }

}

export class Folder {
  constructor(
    public name: string,
    public parentId?: string,
    public _id?: string,
    public isType?: string
  ) { }
}
