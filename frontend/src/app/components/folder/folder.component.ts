import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() removeFolder = new EventEmitter<string>();

  constructor(
    private api: ApiService,
  ) { }

  files = [];
  togglePlsMns = true;
  folders = [];
  newFoldIn;
  childs = [];
  folderChilds = [];
  toggleAdd = true;
  fileIn;
  toggleEmpty = true;
  toggleCheked = true;

  drag() {
    console.log('fawefj');
  }

  deleteCurFolder(folder) {
    this.api.getChildsOnName(folder)
      .then((res: any) => {
        if (res.length != 0) {
          return this.toggleCheked = !this.toggleCheked;
        }
        this.api.deleteOneFolder(folder);
        this.removeFolder.emit(folder);
      })
  }

  deleteCurFolderEmtpy(folder) {
    console.log(folder);
    this.api.deleteOneFolder(folder);
    this.removeFolder.emit(folder);
  }

  addFileInFolder(folder) {
    if (!this.fileIn) {
      return alert('Введите название');
    }
    this.api.getAllFolders()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const elem = res[i];
          if (elem.isType) {
            let fileCur = elem;
            if (this.fileIn == fileCur.name) {
              return alert('Такой файл уже есть');
            }
          }
        }
        let file = new FileFol();
        file.name = this.fileIn;
        file.parentName = folder.name;
        this.api.addNewFile(file, folder);
        this.toggleAdd = !this.toggleAdd;
        this.files.push(file);
        this.fileIn = '';
      })
  }

  addChildFolder(folder) {
    if (!this.newFoldIn) {
      return alert('Введите название')
    }
    this.api.getAllFolders()
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const elem = res[i];
          if (elem.name == this.newFoldIn) {
            return alert('Такая папка уже существует,введите другое назание');
          }
        }
        let newFolder = new Folder();
        newFolder.name = this.newFoldIn;
        newFolder.parentName = folder.name;
        this.api.addFolder(newFolder);
        this.toggleAdd = !this.toggleAdd;
        this.folders.push(newFolder);
        this.newFoldIn = '';
        this.toggleEmpty = true;
      })
      .catch(err => {
        console.error(err);
      })
  }

  getChildFold(folder) {
    this.api.getChildsOnName(folder)
      .then((res: any) => {
        if (res.length == 0) {
          this.toggleEmpty = !this.toggleEmpty;
        }
        this.folders.splice(0, this.folders.length);
        this.files.splice(0, this.files.length);
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          JSON.stringify(element);
          if (element.isType) {
            this.files.push(element);
          } else {
            this.folders.push(element);
          }
        }
        this.togglePlsMns = !this.togglePlsMns;
      })
  }

  onRemoveFolder(event) {
    this.folders.splice(this.folders.indexOf(event), 1);
  }

  removeCurItem(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {
  }

}