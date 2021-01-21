import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'SalesLoft';

  /**
   * Set app title.
   * @param titleService Service for title
   */
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

}
