import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



interface Warehouse {
  id: number;
  warehouseName: string;
  warehouseCode: string;
  status: string;
}


@Component({
  selector: 'app-add-wearhouse',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-wearhouse.component.html',
  styleUrls: ['./add-wearhouse.component.css']
})
export class AddWearhouseComponent implements OnInit {

  id: number | null = null;
  warehouses: Warehouse[] = [];
  // newWarehouse: Warehouse = { };
  warehouseName: any;
  warehouseCode: any;
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
    this.loadWarehouses();
    if (this.id) {
      this.getWarehouseById(this.id);
    }
  }


  getWarehouseById(id: number) {
    const foundWarehouse = this.warehouses.find(warehouse => warehouse.id === id);
    if (foundWarehouse) {
      this.warehouseName = foundWarehouse.warehouseName;
      this.warehouseCode = foundWarehouse.warehouseCode;
      this.status = foundWarehouse.status;
    } else {
      console.warn('Warehouse not found with id:', id);
    }
  }

  loadWarehouses() {
    if (typeof localStorage !== 'undefined') {
      const storedWarehouses = localStorage.getItem('warehouses');
      this.warehouses = storedWarehouses ? JSON.parse(storedWarehouses) : [];
    }
  }

  warehouseExists(warehouseName: string, warehouseCode: string): boolean {
    return this.warehouses.some(warehouse => warehouse.warehouseName === warehouseName || warehouse.warehouseCode === warehouseCode);
  }

  addWarehouse() {
    this.submitted = true;

    if (this.editMode && this.warehouseName !== '' && this.warehouseCode !== '' && this.status !== '') {
      const warehouseIndex = this.warehouses.findIndex(warehouse => warehouse.id === this.id);

      if (warehouseIndex !== -1) {
        this.warehouses[warehouseIndex] = {
          ...this.warehouses[warehouseIndex],
          warehouseName: this.warehouseName,
          warehouseCode: this.warehouseCode,
          status: this.status
        };
      }

      localStorage.setItem('warehouses', JSON.stringify(this.warehouses));

      this.editMode = false;
      this.editIndex = null;
      alert('SuccessFully Updated Warehouse!')
      this.router.navigate(['/dashboard/warehouse']);
    } else if (this.warehouseName && this.warehouseCode) {
      if (this.warehouseExists(this.warehouseName, this.warehouseCode)) {
        alert('Warehouse with this name or code already exists!');
        return;
      }
      const newWarehouse = { id: this.generateId(), warehouseName: this.warehouseName, warehouseCode: this.warehouseCode, status: 'Active' };
      this.warehouses.push({ ...newWarehouse });
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('warehouses', JSON.stringify(this.warehouses));
      }
      alert('SuccessFully added Warehouses!')
      this.router.navigate(['/dashboard/warehouse']);
    } else {
      alert('Please fill all required fields!')
    }
  }

  // this.editMode = true;
  // this.editIndex = index;
  // this.newWarehouse = { ...this.warehouses[index] };


  generateId(): number {
    const storedWarehouses = this.warehouses.length > 0 ? this.warehouses : [];
    return storedWarehouses.length > 0 ? Math.max(...storedWarehouses.map(s => s.id)) + 1 : 1;
  }
}




