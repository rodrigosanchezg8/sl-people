import {Model} from './model';

export class CustomField implements Model {

  id: number;
  _href: string;
  name: string;
  field_type: string;
  value_type: string;
  created_at: Date;
  updated_At: Date;

  public static deserializeMany(objects: CustomField[]): CustomField[] {
    if (!objects || !objects.length) {
      return [];
    }

    const customFields: CustomField[] = [];
    for (const object of objects) {
      customFields.push(new CustomField().deserialize(object));
    }

    return customFields;
  }

  constructor() {
  }

  public deserialize(object: CustomField): CustomField {
    Object.assign(this, object);
    return this;
  }

}
