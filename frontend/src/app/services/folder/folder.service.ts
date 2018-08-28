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
  parentName: String;
  _id: String;
}

export class Folder {
  name: String;
  parentName: String;
  _id: String;
}
