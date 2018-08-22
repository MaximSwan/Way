import { Injectable } from '@angular/core';

@Injectable()
export class FolderServiceService {

  constructor() { }

}

export class Folder {
  name:String;
  parentId:String;
  childs = [];
}
