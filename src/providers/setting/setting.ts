import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingProvider {
  URL: any = "https://prod-49.westeurope.logic.azure.com:443"

  constructor(public http: HttpClient) {
    console.log('Hello SettingProvider Provider');
  }


}
