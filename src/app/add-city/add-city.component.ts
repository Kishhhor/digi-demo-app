
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


interface City {
  id: number;
  cityName: string;
  cityCode: string;
  selectedState?: any;
  status: string;
}


@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  states: any[] = [];
  // states: any = JSON.parse(localStorage.getItem('states'))
  id: number | null = null;
  citys:City[] = [];
  // newState: State = { };
  cityName: any;
  cityCode: any;
  selectedState: any;
  status: any;
  editMode: boolean = false;
  editIndex: number | null = null;
  submitted: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const states = localStorage.getItem('states');
    if (states) {
      this.states = JSON.parse(states);
    }

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.editMode = idParam ? true : false;
      this.id = idParam ? +idParam : null; // Convert the id to a number if it's present
      console.log('Received id:', this.id); // Log the id
    })
    console.log("index iddjshadfhgafa ", this.id);
    this.loadCitys();
    if (this.id) {
      this.getCityById(this.id);
    }
  }


  getCityById(id: number) {
    const foundCity = this.citys.find(city => city.id === id);
    if (foundCity) {
      this.cityName = foundCity.cityName;
      this.cityCode = foundCity.cityCode;
      this.selectedState = foundCity.selectedState;
      this.status = foundCity.status;
    } else {
      console.warn('City not found with id:', id);
    }
  }

  loadCitys() {
    if (typeof localStorage !== 'undefined') {
      const storedCitys = localStorage.getItem('citys');
      this.citys = storedCitys ? JSON.parse(storedCitys) : [];
    }
  }

  cityExists(CityName: string, cityCode: string): boolean {
    return this.citys.some(c => c.cityName === CityName || c.cityCode === cityCode);
  }

  // addCity() {
  //   this.submitted = true;
  //   const selectedState = {
  //     id: this.selectedState.id,
  //     stateName: this.selectedState.stateName,
  //   }
  //   if (this.editMode && this.cityName !== '' && this.cityCode !== '' && this.status !== '') {
  //     const cityIndex = this.citys.findIndex(city => city.id === this.id);
      
  //     if (cityIndex !== -1) {
  //       this.citys[cityIndex] = {
  //         ...this.citys[cityIndex],
  //         cityName: this.cityName,
  //         cityCode: this.cityCode,
  //         selectedState: selectedState,
  //         status: this.status
  //       };
  //     }

  //     localStorage.setItem('citys', JSON.stringify(this.citys));

  //     this.editMode = false;
  //     this.editIndex = null;
  //     alert('SuccessFully Updated city!')
  //     this.router.navigate(['/dashboard/city']);
  //   } else if (this.cityName && this.cityCode) {
  //     if (this.cityExists(this.cityName, this.cityCode)) {
  //       alert('City with this name or code already exists!');
  //       return;
  //     }
  //     const newCity = { id: this.generateId(), cityName: this.cityName, cityCode: this.cityCode, status: 'Active', selectedState: selectedState };
  //     this.citys.push({ ...newCity});
  //     if (typeof localStorage !== 'undefined') {
  //       localStorage.setItem('citys', JSON.stringify(this.citys));
  //     }
  //     alert('SuccessFully added Citys!')
  //     this.router.navigate(['/dashboard/city']);
  //   } else {
  //     alert('Please fill all required fields!')
  //   }
  // }

  // this.editMode = true;
  // this.editIndex = index;
  // this.newState = { ...this.states[index] };

  addCity() {
    this.submitted = true;
    console.log(this.selectedState)
    // Use the selected state directly
    const selectedState = {
      id: this.selectedState.id,
      stateName: this.selectedState.stateName
    };
  
    if (this.editMode && this.cityName !== '' && this.cityCode !== '' && this.status !== '') {
      const cityIndex = this.citys.findIndex(city => city.id === this.id);
  
      if (cityIndex !== -1) {
        this.citys[cityIndex] = {
          ...this.citys[cityIndex],
          cityName: this.cityName,
          cityCode: this.cityCode,
          selectedState: selectedState,
          status: this.status
        };
      }
  
      localStorage.setItem('citys', JSON.stringify(this.citys));
  
      this.editMode = false;
      this.editIndex = null;
      alert('Successfully Updated City!');
      this.router.navigate(['/dashboard/city']);
    } else if (this.cityName && this.cityCode) {
      if (this.cityExists(this.cityName, this.cityCode)) {
        alert('City with this name or code already exists!');
        return;
      }
  
      // Create new city object
      const newCity = {
        id: this.generateId(),
        cityName: this.cityName,
        cityCode: this.cityCode,
        selectedState: selectedState,  // Store the selectedState object
        status: 'Active'
      };
  
      this.citys.push({ ...newCity });
      localStorage.setItem('citys', JSON.stringify(this.citys));
  
      alert('Successfully added City!');
      this.router.navigate(['/dashboard/city']);
    } else {
      alert('Please fill all required fields!');
    }
  }
  
  generateId(): number {
    const storedCitys = this.citys.length > 0 ? this.citys : [];
    return storedCitys.length > 0 ? Math.max(...storedCitys.map(s => s.id)) + 1 : 1;
  }
}
