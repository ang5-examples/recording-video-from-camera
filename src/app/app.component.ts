import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VideoRecorderService} from './video-recorder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('videoCtrl') videoCtrl: ElementRef;
  @ViewChild('videoCtrlResult') videoCtrlResult: ElementRef;
  isRecording = false;

  constructor(private videoRecorderService: VideoRecorderService) {}

  ngOnInit() {
    this.videoRecorderService.init(this.videoCtrl.nativeElement)
      .subscribe(() => {}, (err) => { alert(err); });

    this.videoRecorderService.videoData$.subscribe((videoBlob: Blob) => {
      this.videoCtrlResult.nativeElement.src = URL.createObjectURL(videoBlob);
    });
  }

  startRecord() {
    this.videoRecorderService.startRecord();
    this.isRecording = true;
  }

  stopRecord() {
    this.videoRecorderService.stopRecord();
    this.isRecording = false;
  }
}
