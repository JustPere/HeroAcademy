import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Hero } from './hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  private apiUrl = 'https://akabab.github.io/superhero-api/api'; // Reemplaza 'https://ejemplo.com/api/heroes' con la URL de tu API

  constructor(private http: HttpClient) { }

  heroes:any[] = [];

  getHeroes(): Observable<Hero[]> {
    if(this.heroes?.length>0){
      return of(this.heroes);
    }else{
      
    this.fetchAllHeroes();
    console.log('getheroes');

    return this.http.get<any>(this.apiUrl+'/all.json').pipe(
      map(heroes => {
       
        return heroes.map(hero => ({
          id: hero.id,
          name: hero.name,
          publisher: hero.biography.publisher,
          occupation: hero.work.occupation,
          images: hero.images.sm
        }));
      }),
      catchError((error: HttpErrorResponse) => {
          console.error(`Error code ${error.status}, body: ${error.error}`);
        // Devuelve un observable con un mensaje de error.
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}

fetchAllHeroes(): void {
  console.log('fetch');
  this.http.get<any>(this.apiUrl + '/all.json').pipe(
    map(heroes => {
      return heroes.map(hero => ({
        id: hero.id,
        name: hero.name,
        publisher: hero.biography.publisher,
        occupation: hero.work.occupation,
        images: hero.images.sm
      }));
    }),
    tap(filteredHeroes => {
      this.heroes = filteredHeroes;
      console.log(this.heroes);
    }),
    catchError((error: HttpErrorResponse) => {
        console.error(`Error code ${error.status}, body: ${error.error}`);
      return throwError('Something went wrong; please try again later.');
    })
  ).subscribe();
}


  getHeroesById(id:number, used:boolean): Observable<any> {
  if (!used) {
    const hero = this.heroes.find(h => h.id === id);
  if (hero) {
    return of(hero);
  } else {
    return of(null); 
  }
  }else{
   return of(null);
  }
};


saveHero(hero): void {
  
  const existingHeroIndex = this.heroes.findIndex(h => h.id === hero.id);
  console.log('existingHeroIndex',existingHeroIndex);
  
  if (existingHeroIndex === -1) {
    console.log(hero);
    
    this.heroes.push(hero);
    console.log(this.heroes);
  } else{
    this.heroes[existingHeroIndex] = hero;
    console.log('Heroe actualizado:', hero);

  }
}


deleteHero(heroId: number): void {
  const index = this.heroes.findIndex(hero => hero.id === heroId);
  if (index !== -1) {
    this.heroes.splice(index, 1);
  }
}


}
