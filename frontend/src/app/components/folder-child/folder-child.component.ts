import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder-child',
  templateUrl: './folder-child.component.html',
  styleUrls: ['./folder-child.component.css']
})
export class FolderChildComponent implements OnInit {

  @Input('myFolder') folderChild;

  constructor() { }

  ngOnInit() {
  }

}
