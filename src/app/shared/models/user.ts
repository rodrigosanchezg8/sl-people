import {Model} from './model';

export class User implements Model {

  id: number;
  _href: string;
  guid: string;
  first_name: string;
  last_name: string;

  constructor() {
  }

  public deserialize(object: User): User {
    Object.assign(this, object);
    return this;
  }

}
