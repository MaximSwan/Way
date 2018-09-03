import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class FolderService {

  foldersChild = [];
  folders = [];
  toggleEmpty = true;
  toggleCheked = true;

  async deleteFolder(folder: Folder) {
    try {
      let res: any = await this.api.getChildsOnName(folder);
      if (res.length != 0) {
        return this.toggleCheked = !this.toggleCheked;
      }
      let deletedFolder = await this.api.deleteFolder(folder);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewChildFolder(folder: Folder) {
    try {
      let folderRes = await this.api.addFolder(folder);
      console.log(folderRes);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewFolder(folder: Folder) {

    if (!folder.parentId) {
      let res: any = await this.api.addFolder(folder);
      this.folders.push(res);
    }

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
          console.log(this.folders);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  constructor(
    private api: ApiService
  ) { }

}

export class Folder {
  constructor(
    public name: string,
    public parentId?: string,
    public _id?: string,
    public isType?: string
  ) { }
}
