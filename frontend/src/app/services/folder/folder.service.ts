import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class FolderService {

  folders = [];

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
  ) {}
}
