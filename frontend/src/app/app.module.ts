import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FolderComponentComponent } from './components/folder-component/folder-component.component';
import { FileComponentComponent } from './components/file-component/file-component.component';
import { ApiService } from './services/api-service/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FolderComponentComponent,
    FileComponentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
