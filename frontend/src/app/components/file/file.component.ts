import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input('toggleContr') toggleEmpty;

  @Input('fileName') file;

  @Output() removeFile = new EventEmitter<string>();

  @Output() addDropFile = new EventEmitter<string>();

  constructor(
    private api: ApiService,
    private foldComp: FolderComponent
  ) { }

  delteFile(file) {
    this.api.deleteFile(file);
    this.removeFile.emit(file);
  }

  fileOnDrop(event) {
    if (event.dragData.name == this.file.name) {
      return;
    }
    if (event.dragData.parentName == this.file.name) {
      return;
    }
    this.api.renameParent(event.dragData, this.file);
    this.addDropFile.emit(event.dragData);
    this.toggleEmpty = true;
  }

  fileOnDrag(event) { 
    this.removeFile.emit(this.file);
  }

  ngOnInit() {
  }

}
