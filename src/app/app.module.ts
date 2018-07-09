import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {VideoRecorderService} from './video-recorder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    VideoRecorderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
