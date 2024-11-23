import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userListFilter',
  standalone: true
})
export class UserListFilterPipe implements PipeTransform {

  transform(users: any[], searchText: string, key: string): any[] { 
    if (!users) return [];
    if (!searchText) return users;
    searchText = searchText.toLowerCase();
    return users.filter(user => {
      switch (key) {
        case 'age':
          return (user[key].toString()).includes(searchText);
        case 'date_of_birth':
          return user[key].includes(searchText);
        default:
          return user[key].includes(searchText);
      }
    } ); 
  }

}
