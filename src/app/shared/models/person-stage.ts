import {Model} from './model';

export class PersonStage implements Model {

  id: number;
  _href: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  order: 16;

  public deserialize(object: PersonStage): PersonStage {
    Object.assign(this, object);
    return this;
  }

}
