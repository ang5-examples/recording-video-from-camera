import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VideoRecorderService} from './video-recorder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('videoCtrl') videoCtrl: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(private videoRecorderService: VideoRecorderService) {}

  ngOnInit() {
    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator['mozGetUserMedia'] ||
      navigator['msGetUserMedia'] ||
      navigator['webkitGetUserMedia']);

    if (!navigator.getUserMedia) {
      alert('Браузер не поддерживает getUserMedia');
    }

    const success = (stream) => {
      this.videoCtrl.nativeElement.srcObject = stream;
    };

    const error = (err) => {
      console.log('error: ' + err);
      alert('getUserMedia error: ' + err);
    };

    const constraints = {audio: false, video: true};
    navigator.getUserMedia(constraints, success, error);
  }

  snapshot() {
    this.img.nativeElement.src = this.capture(this.videoCtrl.nativeElement).toDataURL();
  }

  private capture(video) {
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
}
