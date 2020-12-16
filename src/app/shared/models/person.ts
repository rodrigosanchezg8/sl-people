import {User} from './user';
import {CustomField} from './custom-field';
import {ActionCount} from './action-count';
import {Account} from './account';
import {PersonStage} from './person-stage';
import {Import} from './import';
import {Model} from './model';

export class Person implements Model {

  id: number;
  _href: string;
  created_at: Date;
  updated_at: Date;
  last_contacted_at: Date;
  last_replied_at: Date;
  first_name: string;
  last_name: string;
  display_name: string;
  email_address: string;
  full_email_address: string;
  secondary_email_address: string;
  personal_email_address: string;
  phone: string;
  phone_extension: string;
  home_phone: string;
  mobile_phone: string;
  linkedin_url: string;
  title: string;
  city: string;
  state: string;
  country: string;
  work_city: string;
  work_state: string;
  work_country: string;
  crm_url: string;
  crm_id: string;
  crm_object_type: string;
  owner_crm_id: string;
  person_company_name: string;
  person_company_website: string;
  person_company_industry: string;
  do_not_contact: boolean;
  bouncing: boolean;
  locale: string;
  personal_website: string;
  twitter_handle: string;
  last_contacted_type: string;
  job_seniority: string;
  custom_fields: CustomField[];
  tags: string[];
  contact_restrictions: string[];
  counts: ActionCount[];
  account: Account;
  owner: User;
  last_contacted_by: User;
  import: Import;
  person_stage: PersonStage;

  static deserializeMany(objects: Person[]): Person[] {
    const people: Person[] = [];
    for (const object of objects) {
      people.push(new Person().deserialize(object));
    }

    return people;
  }

  constructor() {
  }

  public deserialize(object: Person): Person {
    if (object.account) {
      object.account = new Account().deserialize(object.account);
    }
    if (object.custom_fields) {
      object.custom_fields = CustomField.deserializeMany(object.custom_fields);
    }
    if (object.owner) {
      object.owner = new User().deserialize(object.owner);
    }
    if (object.counts) {
      object.counts = ActionCount.deserializeMany(object.counts);
    }
    if (object.import) {
      object.import = new Import().deserialize(object.import);
    }
    if (object.person_stage) {
      object.person_stage = new PersonStage().deserialize(object.person_stage);
    }
    if (object.last_contacted_by) {
      object.last_contacted_by = new User().deserialize(object.last_contacted_by);
    }

    Object.assign(this, object);
    return this;
  }

  public get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

}
