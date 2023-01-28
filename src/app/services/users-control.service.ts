import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import { FindUser } from '../interfaces/user-search';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UsersControlService extends MainService {
  userId = {
    id: '',
  };
  getUsers(payload: FindUser): Observable<any> {
    return this.post<any>('find', payload);
  }
}
