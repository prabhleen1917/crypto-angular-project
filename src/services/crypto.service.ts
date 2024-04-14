import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  image: string;
  price_change_percentage_24h: number;
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://coinranking1.p.rapidapi.com/coins';

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Coin[]> {
    const headers = {
      'X-RapidAPI-Key': '23084697ffmsh66891a17478cb86p1778a1jsne0902ba87745',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    };
    const params = new HttpParams()
      .set('referenceCurrencyUuid', 'yhjMzLPhuIDl')
      .set('timePeriod', '24h')
      .set('tiers', '1')
      .set('orderBy', 'marketCap')
      .set('orderDirection', 'desc')
      .set('limit', '50')
      .set('offset', '0');

    return this.http.get<{ data: { coins: any[] } }>(this.apiUrl, { headers, params }).pipe(
      map(response => response.data.coins.map(coin => ({
        id: coin.symbol,
        symbol: coin.symbol,
        name: coin.name,
        current_price: parseFloat(coin.price),
        market_cap: coin.marketCap,
        total_volume: coin['24hVolume'],
        image: coin.iconUrl,
        price_change_percentage_24h: coin.change
      }))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The server returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status} with body "${error.error}"`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
