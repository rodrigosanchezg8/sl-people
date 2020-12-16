import {Model} from './model';

export class Account implements Model {

  id: number;
  _href: string;
  name: string;
  domain: string;
  country: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
  }

  public deserialize(object: Account): Account {
    Object.assign(this, object);
    return this;
  }

}
