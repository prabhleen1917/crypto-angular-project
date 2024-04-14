import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsdata.io/api/1/news';

  constructor(private http: HttpClient) { }

  getNews(query: string, language: string): Observable<{ results: Article[] }> {
    const params = {
    apikey: 'pub_39574d85dc08497617dcfd588d2ed7d39c0a8',
    q: query,
    language: language,
    };

    return this.http.get<{ results: Article[] }>(this.apiUrl, { params });
  }
}
