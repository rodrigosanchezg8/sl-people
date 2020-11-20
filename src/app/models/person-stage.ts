import {Model} from './model';

export class PersonStage extends Model {

  name: string;
  created_at: Date;
  updated_at: Date;
  order: 16;

  public deserialize(object: PersonStage): PersonStage {
    Object.assign(this, object);
    return this;
  }

}
