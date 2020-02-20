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
      console.log(data);
      this.hasError$ = of(false);
      this.weather = data;
      this.name = data.name;
      this.temp = this.weather.main.temp;
      this.press = this.weather.main.pressure;
      console.log(this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
      this.dry_da = Math.round(3.28084 * this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
    }
    );
  }

  applyFilter(value: string) {
    of(value)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((term) => console.warn(`Zip Code to search: ${term}`)),
        filter((term) => !!term),
        switchMap((term) => this.weatherdataService.getWeatherByZipCode(term)),
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
          this.press = this.weather.main.pressure;
          console.log(this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
          this.dry_da = Math.round(3.28084 * this.ISAT / 0.0065 * (1 - ((this.press / this.ISAP) / (this.temp / this.ISAT)) ** (this.expon)));
        }
      });
  }

}