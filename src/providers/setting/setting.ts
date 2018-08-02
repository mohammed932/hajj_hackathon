import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingProvider {
  URL: any = "https://myway.maxsys.sa/api/v1/"

  constructor(public http: HttpClient) {
    console.log('Hello SettingProvider Provider');
  }


}
