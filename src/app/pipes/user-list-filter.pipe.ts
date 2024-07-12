import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userListFilter',
  standalone: true
})
export class UserListFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
