import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FolderComponent } from './components/folder/folder.component';
import { FileComponent } from './components/file/file.component';
import { ApiService } from './services/api/api.service';
import { FolderService } from './services/folder/folder.service';
import { FolderChildComponent } from './components/folder-child/folder-child.component';


@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    FileComponent,
    FolderChildComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService, FolderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
