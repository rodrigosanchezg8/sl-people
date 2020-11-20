import {Model} from './model';

export class User extends Model {

  guid: string;
  first_name: string;
  last_name: string;

  constructor() {
    super();
  }

  public deserialize(object: User): User {
    Object.assign(this, object);
    return this;
  }

}
