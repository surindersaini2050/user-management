import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserListFilterPipe } from '../pipes/user-list-filter.pipe';

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
  image: any,
  name: string,
  age: number | null,
  gender: string,
  date_of_birth: Date | null,
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UserListFilterPipe],
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
  form: ITableRow = { ...this.defaultformData };

  constructor(private userListFilterPipe: UserListFilterPipe) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.tableRows = JSON.parse(localStorage.getItem(this.lsTableName) || '[]');
  }

  addForm() {
    this.isNew = true;
    this.form = { ...this.defaultformData };
  }

  edit(row: ITableRow, index: number) {
    this.isEdit = true;
    this.isNew = false;
    this.editIndex = index;
    this.form = row;
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0] || null;
    if (file?.name) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.form.image = e.target?.result || '';
      };
      reader.readAsDataURL(file);
    }
    return file?.name ? file : null;
  }

  validate() {
    return (this.form.image && this.form.name && this.form.age && this.form.gender && this.form.date_of_birth) ? true : false
  }

  save() {
    const isValid = this.validate();
    if (isValid) {
      if ((this.editIndex || this.editIndex === 0) && !this.isNew) {
        this.tableRows[this.editIndex] = this.form;
        this.isEdit = false;
        this.editIndex = null;
      }
      else {
        this.tableRows.push(this.form)
        this.isNew = false;
      }
      localStorage.setItem(this.lsTableName, JSON.stringify(this.tableRows))
      this.resetForm();
    }
  }

  sort(key: string, index: number, sOrder?: any) {
    if (sOrder) {
      this.tableColumns[index].sortOrder = sOrder;
    }
    this.tableColumns[index].applySort = true;
  }

  filter(key: string, event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.tableRows = this.userListFilterPipe.transform(this.tableRows, inputValue, key);
  }

  delete(index: number) {
    let msg = 'Are you sure, You want to delete this row permanently'
    if (confirm(msg) == true) {
      this.tableRows.splice(index, 1);
      localStorage.setItem(this.lsTableName, JSON.stringify(this.tableRows))
      this.refreshList();
    }
  }

  resetForm() {
    this.isNew = false;
    this.isEdit = false;
    this.editIndex = null;
    this.form = { ...this.defaultformData };
    this.refreshList();
  }

}
