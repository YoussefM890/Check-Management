import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  baseUrl = "https://localhost:5001";

  constructor(private http: HttpClient
  ) {
  }


  deleteCheck(checkId: number, path: string) {
    return this.http.delete(`${this.baseUrl}/${path}/${checkId}`);
  }
}
