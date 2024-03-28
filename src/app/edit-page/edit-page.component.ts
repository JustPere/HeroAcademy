import { Component, OnInit, numberAttribute } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';  
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroServiceService } from '../services/hero-service.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { Hero } from '../services/hero.interface';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule,MatProgressSpinnerModule, CommonModule, ReactiveFormsModule,NotificationDialogComponent],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {
  heroes: Hero[];
  heroForm: FormGroup;
  heroeImg: string;
  isPopupVisible = false;
  message = '';
  
  constructor(private route: ActivatedRoute, private heroService: HeroServiceService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      id:0,
      name: '',
      publisher: '',
      occupation: '',
      images:''
    });

    const id:any= +this.route.snapshot.paramMap.get('id'); 

    if (id !== Math.trunc(id)) {
      const idFix = Math.floor(id);
      this.getHeroe(idFix, true);

    }else{
      this.getHeroe(id, false);
      console.log(id);
    }
   
  }
  
  togglePopup(): void {
    try {    
      this.isPopupVisible = !this.isPopupVisible;
      this.heroService.saveHero(this.heroForm.value);
      this.router.navigateByUrl('/home');
   
    } catch (err) {
      this.message='Al parecer ha ocurrido un error';
      this.isPopupVisible = !this.isPopupVisible;
      this.router.navigateByUrl('/home');

    }
    
  }

  getHeroe(id:number, used:boolean): void {
    console.log('used',used);
    console.log('id',id);

    this.heroService.getHeroesById(id, used)
      .subscribe(hero => {
        console.log(hero);
        
        this.heroeImg = hero ? hero.images : '';

        if (hero?.id) {
          this.heroForm.patchValue({
            id:hero.id,
            name: hero.name,
            publisher: hero.publisher,
            occupation: hero.occupation,
            images: hero.images
          });
        }else{
          this.heroForm.patchValue({
            id:id
          });
        }
      });      
  }

  submitForm(){
    console.log(this.heroForm.value);
    this.isPopupVisible=true;
    this.message='Guardado con exito';
  }
}
