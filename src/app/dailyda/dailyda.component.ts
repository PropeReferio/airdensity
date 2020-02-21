import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { of, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';

import { WeatherdataService } from '../services/weatherdata.service';

@Component({
  selector: 'app-dailyda',
  templateUrl: './dailyda.component.html',
  styleUrls: ['./dailyda.component.scss']
})
export class DailydaComponent implements OnInit {
  weather;
  temp;
  cels;
  fahr;
  press;
  dry_da;
  name: string;
  // Crunch your numbers here, store it in a variable called result, etc.,
  // And in the template, {{ result }} will display that number.
  ISAT = 288.15;
  ISAP = 1013.25;
  expon = 0.234978134;
  // lapse_rate = 0.0065;
  // R = 8.3144598; Replaced all this with expon
  // g = 9.80665;
  // M = 0.028964; // This is the molar mass of DRY air.

  hasError$: Observable<boolean>;

  constructor(
    private weatherdataService: WeatherdataService,
  ) { }

  ngOnInit() {

    this.weatherdataService.getWeather().subscribe((data: any) => {
      this.hasError$ = of(false);
      this.weather = data;
      this.name = data.name;
      this.temp = this.weather.main.temp;
      this.cels = Math.round(this.temp - 273.15);
      this.fahr = Math.round(this.cels * 1.8 + 32);
      this.press = this.weather.main.pressure;
      this.dry_da = Math.round(3.28084 * this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
    }
    );
  }

  applyFilter(value: string) {
    of(value)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((term) => console.warn(`Zip Code to search: ${term}`)), //probably for debugging
        filter((term) => !!term), // !!term returns term's truthiness value. filter works like python, so empty lists, strings, 0 are dropped.
        switchMap((term) => this.weatherdataService.getWeatherByZipCode(term)), //basically, this only keeps the latest data/JSON, after possibly receiving multiple
        filter((result) => !!result),
        catchError((err) => {
          this.hasError$ = of(true);
          console.error('Failed to fetch data', err);

          return of(null);
        }),
      ).subscribe((result: any) => {
        if (!!result) {
          this.hasError$ = of(false);
          this.weather = result;
          this.name = result.name;
          this.temp = this.weather.main.temp;
          this.cels = Math.round(this.temp - 273.15);
          this.fahr = Math.round(this.cels * 1.8 + 32);
          this.press = this.weather.main.pressure;
          this.dry_da = Math.round(3.28084 * this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
        }
      });
  }

}