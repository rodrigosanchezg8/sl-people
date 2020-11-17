import {User} from './user';
import {CustomField} from './custom-field';
import {ActionCount} from './action-count';
import {Account} from './account';

export class Person {

  id: number;
  created_at: Date;
  updated_at: Date;
  last_contacted_at?: any;
  last_replied_at?: any;
  first_name: string;
  last_name: string;
  display_name: string;
  email_address: string;
  full_email_address: string;
  secondary_email_address: string;
  personal_email_address: string;
  phone: string;
  phone_extension?: any;
  home_phone?: any;
  mobile_phone?: any;
  linkedin_url?: any;
  title: string;
  city: string;
  state: string;
  country: string;
  work_city?: any;
  work_state?: any;
  work_country?: any;
  crm_url?: any;
  crm_id?: any;
  crm_object_type?: any;
  owner_crm_id?: any;
  person_company_name?: any;
  person_company_website: string;
  person_company_industry?: any;
  do_not_contact: boolean;
  bouncing: boolean;
  locale: string;
  personal_website?: any;
  twitter_handle?: any;
  last_contacted_type?: any;
  job_seniority: string;
  custom_fields: CustomField[];
  tags: any[];
  contact_restrictions: any[];
  counts: ActionCount[];
  account: Account;
  owner: User;
  last_contacted_by?: any;
  import?: any;
  person_stage?: any;

  static deserializeMany(objects: Person[]): Person[] {
    const people: Person[] = [];
    for (const object of objects) {
      people.push(new Person().deserialize(object));
    }

    return people;
  }

  constructor() {
  }

  deserialize(object: Person): Person {
    Object.assign(this, object);
    return this;
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

}
