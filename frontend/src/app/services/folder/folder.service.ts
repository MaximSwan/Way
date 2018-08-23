import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class FolderService {

  constructor(
    private api: ApiService
  ) { }

}

export class FileFol {
  name: String;
  idParent: String;
}

export class Folder {
  name: String;
  parentId: String;
  childs = [];
  _id: String
}
