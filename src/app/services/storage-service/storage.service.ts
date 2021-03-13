import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
}) 
export class StorageService {

  constructor(private afStorage: AngularFireStorage) { }
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  uploadImageAndGetMetadata(image): FilesUploadMetadata {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref('/images/' + randomId);
    this.task = this.ref.put(image);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(),
    };
  }

  private getDownloadUrl$(): Observable<string> {
    return from(this.task).pipe(
      switchMap((_) => this.ref.getDownloadURL()),
    );
  }

  deleteImage(URL: string) {
    this.ref = this.afStorage.refFromURL(URL);
    this.ref.delete();
  }
}
