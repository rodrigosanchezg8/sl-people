export class ActionCount {

  emails_sent: number;
  emails_viewed: number;
  emails_clicked: number;
  emails_replied_to: number;
  emails_bounced: number;
  calls: number;

  static deserializeMany(objects: ActionCount[]): ActionCount[] {
    if (!objects || !objects.length) {
      return [];
    }

    const ac: ActionCount[] = [];
    for (const object of objects) {
      ac.push(new ActionCount().deserialize(object));
    }

    return ac;
  }

  constructor() {
  }

  public deserialize(object: ActionCount): ActionCount {
    Object.assign(this, object);
    return this;
  }

}
