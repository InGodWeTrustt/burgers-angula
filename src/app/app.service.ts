import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /**
   *  Отправляем запрос на бекенд
   * @param data - данные формы
   * @returns 
   */
  sendOrder(data: any) {
    const url: string = "https://testologia.site/burgers-order"
    return this.http.post(url, data)
  }

  getData() {
    const url: string = 'https://testologia.site/burgers-data?extra=black';
    return this.http.get(url)
  }
}
