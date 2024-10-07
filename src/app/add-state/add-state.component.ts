
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



interface State {
  id: number;
  stateName: string;
  stateCode: string;
  status: string;
}

@Component({
  selector: 'app-add-state',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {

  id: number | null = null;
  states: State[] = [];
  // newState: State = { };
  stateName: any;
  stateCode: any;
  status: any;
  editMode: boolean = false;
  editIndex: number | null = null;
  submitted: boolean = false;

  constructor(public router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.editMode = idParam ? true : false;
      this.id = idParam ? +idParam : null; // Convert the id to a number if it's present
      console.log('Received id:', this.id); // Log the id
    })
    console.log("index iddjshadfhgafa ", this.id);
    this.loadStates();
    if (this.id) {
      this.getStateById(this.id);
    }
  }


  getStateById(id: number) {
    const foundState = this.states.find(state => state.id === id);
    if (foundState) {
      this.stateName = foundState.stateName;
      this.stateCode = foundState.stateCode;
      this.status = foundState.status;
    } else {
      console.warn('State not found with id:', id);
    }
  }

  loadStates() {
    if (typeof localStorage !== 'undefined') {
      const storedStates = localStorage.getItem('states');
      this.states = storedStates ? JSON.parse(storedStates) : [];
    }
  }

  stateExists(stateName: string, stateCode: string): boolean {
    return this.states.some(state => state.stateName === stateName || state.stateCode === stateCode);
  }

  addState() {
    this.submitted = true;

    if (this.editMode && this.stateName !== '' && this.stateCode !== '' && this.status !== '') {
      const stateIndex = this.states.findIndex(state => state.id === this.id);

      if (stateIndex !== -1) {
        this.states[stateIndex] = {
          ...this.states[stateIndex],
          stateName: this.stateName,
          stateCode: this.stateCode,
          status: this.status
        };
      }

      localStorage.setItem('states', JSON.stringify(this.states));

      this.editMode = false;
      this.editIndex = null;
      alert('SuccessFully Updated State!')
      this.router.navigate(['/dashboard/state']);
    } else if (this.stateName && this.stateCode) {
      if (this.stateExists(this.stateName, this.stateCode)) {
        alert('State with this name or code already exists!');
        return;
      }
      const newState = { id: this.generateId(), stateName: this.stateName, stateCode: this.stateCode, status: 'Active' };
      this.states.push({ ...newState });
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('states', JSON.stringify(this.states));
      }
      alert('SuccessFully added States!')
      this.router.navigate(['/dashboard/state']);
    } else {
      alert('Please fill all required fields!')
    }
  }

  // this.editMode = true;
  // this.editIndex = index;
  // this.newState = { ...this.states[index] };


  generateId(): number {
    const storedStates = this.states.length > 0 ? this.states : [];
    return storedStates.length > 0 ? Math.max(...storedStates.map(s => s.id)) + 1 : 1;
  }
}




