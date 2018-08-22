import { Injectable } from '@angular/core';

@Injectable()
export class FileServiceService {

  constructor() { }

}

export class File {
  name:String;
  idParent:String;
}