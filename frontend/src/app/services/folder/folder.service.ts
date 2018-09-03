import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class FolderService {

  folders = [];
  toggleEmpty = true;

  async addNewFolder(folder: Folder) {
    let res: any = await this.api.addFolder(folder);
    this.folders.push(res);
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
