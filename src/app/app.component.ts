import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VideoRecorderService} from './video-recorder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('videoCtrl') videoCtrl: ElementRef;
  @ViewChild('videoCtrlResult') videoCtrlResult: ElementRef;
  isInitialized = false;
  isRecording = false;

  constructor(private videoRecorderService: VideoRecorderService,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.videoRecorderService.init(this.videoCtrl.nativeElement)
      .subscribe(
        () => {
          this.isInitialized = true;
          this.cd.detectChanges();
        },
        (err) => {
          alert(err);
        });

    this.videoRecorderService.videoData$.subscribe((videoBlob: Blob) => {
      this.videoCtrlResult.nativeElement.src = URL.createObjectURL(videoBlob);
    });
  }

  startRecord() {
    this.videoRecorderService.startRecord();
    this.isRecording = true;
    this.cd.detectChanges();
  }

  stopRecord() {
    this.videoRecorderService.stopRecord();
    this.isRecording = false;
    this.cd.detectChanges();
  }
}
