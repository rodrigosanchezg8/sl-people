import {Injectable} from '@angular/core';
import {Person} from '../../shared/models/person';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../shared/services/crud.service';
import {ToastService} from '../../shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends CrudService<Person> {

  public people: Person[] = [];

  /**
   * Extends the CRUDService using the type class `Person`. When invoking `super`, the `HttpClient`, the resource URI and the class
   * `Person` are provided.
   * @param http Injectable
   */
  constructor(public http: HttpClient,
              private toastService: ToastService) {
    super(http, 'v2/people', Person);
  }

  /**
   * Sets the people array as the list of all people in every page making requests until there are no more results.
   */
  async fetchOfEveryPage(): Promise<void> {
    if (this.people.length) {
      return;
    }

    try {
      const perPage = 100;
      let page = 1;
      let hasResults: boolean;

      do {
        const pagePeople: Person[] = await this.findAll({
          per_page: perPage,
          page
        }).toPromise();
        this.people.push(...pagePeople);

        hasResults = !!pagePeople.length;
        page++;
      } while (hasResults);
    } catch (e) {
      this.toastService.showError(e.message);
    }
  }

}
