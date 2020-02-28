import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOADER_STATUS } from './../../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoaderStatus(status) {
    switch (status) {
      case LOADER_STATUS.loading:
        this.loaderStatus.next(true);
        break;

      case LOADER_STATUS.success:
        this.loaderStatus.next(false);
        break;

      case LOADER_STATUS.failed:
        this.loaderStatus.next(false);
        break;

      default:
        this.loaderStatus.next(false);
        break;
    }
  }
}
