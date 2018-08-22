import { Component } from '@angular/core';
import { ApiService } from './services/api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private api: ApiService) {
//    this.loadFolders();
  }

  folders = [];

  // loadFolders() {
  //   return this.api.getAllFolders()
  //     .then((res: any) => {
  //       res = JSON.stringify(res);
  //       for (let i = 0; i < res.length; i++) {
  //         const elemCur = res[i];
  //         for (let i = + 1; i < res.length; i++) {
  //           const element = res[i];
  //           if (elemCur._id == element.parentId) {
  //             let elementsIns = elemCur.childs;
  //             elementsIns.push(element);
  //             this.folders.push(elemCur);
  //           }
  //         }
  //       }
  //     })
  // }

}
