import {Model} from './model';

export class Import implements Model {

  id: number;
  _href: string;
  name: string;
  current_people_count: number;
  imported_people_count: number;
  created_at: Date;
  updated_at: Date;

  public deserialize(object: Import): Import {
    Object.assign(this, object);
    return this;
  }

}
