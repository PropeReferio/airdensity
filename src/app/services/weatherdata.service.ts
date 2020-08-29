import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {
  API_KEY = process.env.API_KEY;

  constructor(private httpClient: HttpClient) { }

  public getWeather(){
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${this.API_KEY}`);
  }

  public getWeatherByZipCode(zipCode: string){
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${this.API_KEY}`);
  }
}


