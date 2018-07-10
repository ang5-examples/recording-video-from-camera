import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
declare var MediaRecorder: any;

@Injectable()
export class VideoRecorderService {
  videoData$ = new Subject<Blob>();
  private mediaRecorder: any;
  private stream: any;

  constructor() {}

  init(videoElement: HTMLVideoElement): Observable<any> {
    return Observable.create(observer => {
      navigator.getUserMedia = (navigator.getUserMedia ||
        navigator['mozGetUserMedia'] ||
        navigator['msGetUserMedia'] ||
        navigator['webkitGetUserMedia']);

      if (!navigator.getUserMedia) {
        observer.error('Браузер не поддерживает getUserMedia');
        observer.complete();
        return;
      }

      const success = (stream) => {
        this.stream = stream;
        videoElement.srcObject = stream;
        this.initRecord();
        observer.next();
        observer.complete();
      };

      const error = (err) => {
        observer.error('getUserMedia error: ' + err);
        observer.complete();
      };

      const constraints = {audio: true, video: true};
      navigator.getUserMedia(constraints, success, error);
    });
  }

  private initRecord() {
    const options = {mimeType: 'video/webm;codecs=pcm'};
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    this.mediaRecorder.ondataavailable = (e) => {
      this.videoData$.next(e.data);
    };
  }

  startRecord() {
    this.mediaRecorder.start();
  }

  stopRecord() {
    this.mediaRecorder.stop();
  }
}
