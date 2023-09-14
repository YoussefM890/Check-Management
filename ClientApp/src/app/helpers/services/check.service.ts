import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  baseUrl = "https://localhost:5001/checks";

  constructor(private http: HttpClient) {
  }

  getAllChecks() {
    return this.http.get(this.baseUrl);
  }

  addCheck(check: any) {
    return this.http.post(this.baseUrl, check);
  }

  editCheck(check: any) {
    return this.http.put(this.baseUrl, check);
  }

  setCheckDepositDate(checkId: number) {
    return this.http.patch(`${this.baseUrl}/deposit-date/${checkId}`, null);
  }

  setCheckAsCashed(checkId: number) {
    return this.http.patch(`${this.baseUrl}/set-cashed/${checkId}`, null);
  }

}
