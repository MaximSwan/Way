import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input('fileName') file;

  constructor(
    private api:ApiService
  ) { }

  delteFile(file) {
    this.api.deleteFile(file);
    
  }

  ngOnInit() {
  }

}
