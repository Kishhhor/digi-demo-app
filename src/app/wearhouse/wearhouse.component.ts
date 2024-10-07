
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppComponent } from "../app.component";
import {  Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


interface Warehouse {
  id: number;
  warehouseName: string;
  warehouseCode: string;
  status: string;
}

@Component({
  selector: 'app-wearhouse',
  standalone: true,
  imports: [AppComponent,FormsModule,CommonModule],
  templateUrl: './wearhouse.component.html',
  styleUrls: ['./wearhouse.component.css']
})
export class WearhouseComponent implements OnInit {

  [x: string]: any;
  //router: any;
  warehouses: Warehouse[] = [];
  newWarehouse: Warehouse = { id: 0, warehouseName: '', warehouseCode: '', status: 'Active' };
  editMode: boolean = false;
  editIndex: number | null = null;
  
  constructor(public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  
  ) {}
  
  ngOnInit() {
    this.loadWarehouses();
  }
  
  loadWarehouses() {
    // Check if we are in the browser environment before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedWarehouses = localStorage.getItem('warehouses');
      this.warehouses = storedWarehouses ? JSON.parse(storedWarehouses) : [];
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }
  
  addWarehouse() {
    if (this.editMode) {
      this.warehouses[this.editIndex!] = { ...this.newWarehouse, id: this.generateId() };
      this.editMode = false;
      this.editIndex = null;
    } else {
      this.newWarehouse.id = this.generateId(); // Generate ID
      this.warehouses.push({ ...this.newWarehouse });
    }
    this.saveWarehouses();
    this.resetForm();
  }
  
  editWarehouse(index: number) {
    this.router.navigate(['/dashboard/addwarehouse',index]);   // this.editMode = true;
    // this.editIndex = index;
    // this.newWarehouse = { ...this.warehouses[index] };
  }
  
  deleteWarehouse(index: number) {
    this.warehouses.splice(index, 1);
    this.saveWarehouses();
  }
  
  generateId(): number {
    return this.warehouses.length > 0 ? Math.max(...this.warehouses.map(s => s.id)) + 1 : 1;
  }
  
  saveWarehouses() {
    localStorage.setItem('warehouses', JSON.stringify(this.warehouses));
  }
  
  resetForm() {
    this.newWarehouse = { id: 0, warehouseName: '', warehouseCode: '', status: 'Active' };
  }
  }
  
  
  
  
  
    
