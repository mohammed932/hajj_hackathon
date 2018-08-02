import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }



  postLang(params): Observable<any> {
    let url = `https://prod-49.westeurope.logic.azure.com:443/workflows/63e07800f3544d7cb387627f0f59f7ee/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ah6pxocasWeNZ61GSSV4R_vSosHAFPE3KDktLlrnmcw`
    return this.http.post(url, JSON.stringify(params));
  }

  getMemberInfo(params): Observable<any> {
    let url = `https://prod-22.westeurope.logic.azure.com:443/workflows/3a1ded480b8542db9227c59e912d06cf/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eKp8Co_Q4u4VjGoA-tBPIvuRAl-flbPFN70e-bYpRn4`
    return this.http.post(url, JSON.stringify(params));
  }

  myGroup(params): Observable<any> {
    let url = `https://prod-03.westeurope.logic.azure.com:443/workflows/8a558de11dfe4cd78c24309ff90290f1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SSku8FN_IzSBInsT_MJj0UIUP5pHWb0yAhLhPVjYs_o`
    return this.http.post(url, JSON.stringify(params));
  }
}
