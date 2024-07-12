import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userListSorting',
  standalone: true
})
export class UserListSortingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
