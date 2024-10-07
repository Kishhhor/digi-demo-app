
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppComponent } from "../app.component";
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


interface State {
  id: number;
  stateName: string;
  stateCode: string;
  status: string;
}


@Component({
  selector: 'app-state',
  standalone: true,
  imports: [AppComponent,FormsModule,CommonModule],
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

[x: string]: any;
//router: any;
states: State[] = [];
newState: State = { id: 0, stateName: '', stateCode: '', status: 'Active' };
editMode: boolean = false;
editIndex: number | null = null;

constructor(public router: Router,
  @Inject(PLATFORM_ID) private platformId: Object

) {}

ngOnInit() {
  this.loadStates();
}

loadStates() {
  // Check if we are in the browser environment before accessing localStorage
  if (isPlatformBrowser(this.platformId)) {
    const storedStates = localStorage.getItem('states');
    this.states = storedStates ? JSON.parse(storedStates) : [];
  } else {
    console.warn('localStorage is not available in this environment.');
  }
}

addState() {
  if (this.editMode) {
    this.states[this.editIndex!] = { ...this.newState, id: this.generateId() };
    this.editMode = false;
    this.editIndex = null;
  } else {
    this.newState.id = this.generateId(); // Generate ID
    this.states.push({ ...this.newState });
  }
  this.saveStates();
  this.resetForm();
}

editState(index: number) {
  this.router.navigate(['/dashboard/addstate',index]);   // this.editMode = true;
  // this.editIndex = index;
  // this.newState = { ...this.states[index] };
}

deleteState(index: number) {
  this.states.splice(index, 1);
  this.saveStates();
}

generateId(): number {
  return this.states.length > 0 ? Math.max(...this.states.map(s => s.id)) + 1 : 1;
}

saveStates() {
  localStorage.setItem('states', JSON.stringify(this.states));
}

resetForm() {
  this.newState = { id: 0, stateName: '', stateCode: '', status: 'Active' };
}
}





  