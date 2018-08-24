import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { AppComponent } from '../../app.component';
import { Folder, FileFol } from '../../services/folder/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  @Input('myFolder') folderChild;

  @Input('folderName') folder;
  constructor(
    private api: ApiService,
  ) { }
  toggle2 = true;
  folders = [];
  newFoldIn;
  childs = [];
  folderChilds = [];
  toggle = true;
  fileIn;

  addFileInFolder(folder) {
    let file = new FileFol();
    file.name = this.fileIn;
    file.idParent = folder._id;
    this.api.addNewFile(file, folder)
  }

  deleteCurFolder(folder) {
    this.api.deleteOne(folder);
    this.folders.splice(folder, 1);
  }

  addChildFolder(folder) {
    let newFolder = new Folder();
    newFolder.name = this.newFoldIn;
    newFolder.parentId = folder._id;
    this.api.addFolder(newFolder);
  }

  getChildFold(folder) {
    this.api.getChildsOfFolder(folder)
      .then((res: any) => {
        this.folders.splice(0, this.folders.length)
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          JSON.stringify(element);
          this.folders.push(element);
        }
        this.toggle2 = !this.toggle2;
      })
  }

  ngOnInit() {
  }

}
