import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingProvider {
  URL: any = "https://youtubekeyshouse.azurewebsites.net/api/"

  constructor(public http: HttpClient) {
    console.log('Hello SettingProvider Provider');
  }


}
