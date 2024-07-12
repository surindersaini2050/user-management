import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ITableColumn {
  key: string,
  name: string,
  enableSort: boolean,
  applySort?: boolean,
  sortOrder?: string,
  enableFilter: boolean,
  applyFilter?: boolean,
}

export interface ITableRow {
  image: string,
  name: string,
  age: number | null,
  gender: string,
  date_of_birth: Date | null,
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  lsTableName: string = 'USER_MANAGEMENT'
  isNew: boolean = false;
  isEdit: boolean = false;
  editIndex: null | number = null;
  title: string = 'User Management';
  tableColumns: ITableColumn[] = [
    {
      key: 'image',
      name: 'Image',
      enableSort: false,
      enableFilter: false,
    },
    {
      key: 'name',
      name: 'Name',
      enableSort: true,
      enableFilter: true,
    },
    {
      key: 'age',
      name: 'Age',
      enableSort: true,
      enableFilter: true,
    },
    {
      key: 'gender',
      name: 'Gender',
      enableSort: true,
      enableFilter: true,
    },
    {
      key: 'date_of_birth',
      name: 'Date Of Birth',
      enableSort: true,
      enableFilter: true,
    },
    {
      key: 'actions',
      name: 'Actions',
      enableSort: false,
      enableFilter: false,
    }
  ];
  tableRows: any = [];
  defaultformData: ITableRow = {
    image: '',
    name: '',
    age: null,
    gender: '',
    date_of_birth: null,
  };
  form: ITableRow = this.defaultformData;

  constructor() { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.tableRows = this.getList();
  }

  getList() {
    return JSON.parse(localStorage.getItem(this.lsTableName) || '[]') || [];
  }

  edit(row: ITableRow, index: number) {
    this.isEdit = true;
    this.editIndex = index;
    this.form = row
  }

  save(row?: ITableRow, index?: number) {
    if (!index) {
      this.tableRows.push(this.form)
      this.isNew = false;
    }
    else {
      this.tableRows[index] = this.form;
      this.isEdit = false;
      this.editIndex = null;
    }
    localStorage.setItem(this.lsTableName, JSON.stringify(this.tableRows))
    this.form = this.defaultformData;
    this.refreshList();
  }

  sort(key: string, index: number, sOrder?: any) {
    if (sOrder) {
      this.tableColumns[index].sortOrder = sOrder;
    }
    this.tableColumns[index].applySort = true;
  }

  filter(key: string, index: number, event: any) {
    console.log(event);
    if (key && index) {
      this.tableColumns[index].applyFilter = true;
    } else {
      this.tableColumns[index].applyFilter = false;
    }
  }

  delete(index?: number) {
    if (index || index === 0) {
      let msg = 'Are you sure, You want to delete this row permanently'
      if (confirm(msg) == true) {
        this.tableRows.splice(index, 1);
        localStorage.setItem(this.lsTableName, JSON.stringify(this.tableRows))
        this.refreshList();
      }
    }
    else {
      this.isNew = false;
      this.isEdit = false;
      this.editIndex = null;
      this.form = this.defaultformData;
    }
  }

}
