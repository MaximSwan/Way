import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input('fileName') file;
  @Output() removeFile = new EventEmitter<string>();

  constructor(
    private api: ApiService,
    private foldComp: FolderComponent
  ) { }

  delteFile(file) {
    this.api.deleteFile(file);
    this.removeFile.emit(file);
  }

  ngOnInit() {
  }

}
