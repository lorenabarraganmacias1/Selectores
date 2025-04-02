import { Injectable } from '@angular/core';
import { Country, Region, smallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl:string = 'https://restcountries.com/v3.1';

  private _region:Region[] =[Region.Africa,Region.America, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http: HttpClient
  ) { }

  get regions():Region[] {
    return [...this._region];
  }

  getCountriesByRegion(region: Region): Observable <smallCountry[]>{
    if(!region)return of([]);

    const url:string = `${this.baseUrl}/region/${ region }?field=cca3,name,borders`;

    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.map( country =>({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
       })) ),
      tap( response => console.log({ response }))
    )

  }
  getCountryByAlphaCode(alphaCode:string):Observable< smallCountry>{

    const url:string = `${this.baseUrl}/alpha/${alphaCode }?field=cca3,name,borders`;

     return this.http.get<Country>(url)
    .pipe(
      map(country =>({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        })
      )
    )
    
  }

  getCountryBordersByCodes( borders:string[]):Observable<smallCountry[]>{
    if( !borders || borders.length === 0)return of([]);


    const countryRequests:Observable<smallCountry>[]  = [];

    borders.forEach( code =>{
      const request = this.getCountryByAlphaCode(code);
      countryRequests.push(request);
    });

    return combineLatest(countryRequests);

  }





}
