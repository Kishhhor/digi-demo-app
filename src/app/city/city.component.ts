import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppComponent } from "../app.component";
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


interface city {
  id: number;
  cityName: string;
  cityCode: string;
  status: string;
}



@Component({
  selector: 'app-city',
  standalone: true,
  imports: [AppComponent,FormsModule,CommonModule],
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  [x: string]: any;
//router: any;
citys:city[] = [];
newCity:city = { id: 0, cityName: '', cityCode: '', status: 'Active' };
editMode: boolean = false;
editIndex: number | null = null;

constructor(public router: Router,
  @Inject(PLATFORM_ID) private platformId: Object

) {}

ngOnInit() {
  this.loadCitys();
}

loadCitys() {
  // Check if we are in the browser environment before accessing localStorage
  if (isPlatformBrowser(this.platformId)) {
    const storedCitys = localStorage.getItem('citys');
    this.citys = storedCitys ? JSON.parse(storedCitys) : [];
  } else {
    console.warn('localStorage is not available in this environment.');
  }
}

addCity() {
  if (this.editMode) {
    this.citys[this.editIndex!] = { ...this.newCity, id: this.generateId() };
    this.editMode = false;
    this.editIndex = null;
  } else {
    this.newCity.id = this.generateId(); // Generate ID
    this.citys.push({ ...this.newCity });
  }
  this.saveCitys();
  this.resetForm();
}

editCity(index: number) {
  this.router.navigate(['/dashboard/addcity',index]);   // this.editMode = true;
  // this.editIndex = index;
  // this.newState = { ...this.states[index] };
}

deleteCity(index: number) {
  this.citys.splice(index, 1);
  this.saveCitys();
}

generateId(): number {
  return this.citys.length > 0 ? Math.max(...this.citys.map(s => s.id)) + 1 : 1;
}

saveCitys() {
  localStorage.setItem('citys', JSON.stringify(this.citys));
}

resetForm() {
  this.newCity = { id: 0, cityName: '', cityCode: '', status: 'Active' };
}
}





  
