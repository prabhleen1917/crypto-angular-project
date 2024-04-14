// coin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  constructor(private http: HttpClient) {}

  getCoinData(id: string): Observable<any> {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  }

  getMarketChart(id: string, days: number, vs_currency: string = 'usd'): Observable<any> {
    const params = {
      vs_currency: vs_currency,
      days: days.toString(),
      // Optional: interval can be added based on days
      interval: days > 1 ? 'daily' : 'minutely'
    };
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, { params });
  }
}
