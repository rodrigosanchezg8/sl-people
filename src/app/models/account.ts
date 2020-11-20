import {Model} from './model';

export class Account extends Model {

  name: string;
  domain: string;
  country: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    super();
  }

  public deserialize(object: Account): Account {
    Object.assign(this, object);
    return this;
  }

}
