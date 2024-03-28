import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import { HeroServiceService } from '../services/hero-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';  
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { debounceTime } from 'rxjs';
import { Hero } from '../services/hero.interface';
// Importa el componente de diálogo

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule,MatProgressSpinnerModule, CommonModule, ReactiveFormsModule, NotificationDialogComponent
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isPopupVisible = false;
  message = '';
  
  isLoading: boolean = true; 
  searchForm: FormGroup;
  filteredHeroes: Hero[] = [];
  showHeroes: Hero[] = [];

  noimg:string= "heroes\src\assets\no-portrait.jpg"

  constructor(private heroService: HeroServiceService, private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['']
    });
    this.getHeroes();
   } 

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(searchTerm => {
      this.search(searchTerm.searchTerm);
    });
  }

  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        setTimeout(() => {
       //para forzar el tiempode carga
        
        this.showHeroes = heroes;
        this.filteredHeroes = heroes;
        console.log('heroes',this.showHeroes);
        this.isLoading = false;
        // Se ha terminado la carga
      }, 500);
      });
  }

  

  search(searchTerm: string): void {
    console.log(searchTerm);
    
    if (!searchTerm ) {
      this.showHeroes = this.filteredHeroes;
      return;
    }
    
    searchTerm = searchTerm.toLowerCase();
    this.showHeroes = this.filteredHeroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm)
    );
  }
  
  delete(id): void {
    this.heroService.deleteHero(id);
    this.searchForm.reset();
    this.message='borado con exito';
    this.togglePopup();
    this.getHeroes();
    
  }
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
edit(id:number): void {
  this.router.navigate(['/edit', id]); 
}

add(){
for (let i = 0; i < this.showHeroes.length; i++) {
 if (i==this.showHeroes.length-1) {
  //he tenido que hacer este bucle ya que no coinciden los id con la cantidad de superheroes en el array
  this.router.navigate(['/edit', this.showHeroes[i].id+1.4]);
 }
}
}
}
