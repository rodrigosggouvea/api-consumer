import { Component } from '@angular/core';
import { Http, Request } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private baseUrl = 'https://swapi.co/api/';

  people: any = [];
  count: number = 0;
  next: string;
  previous: string;
  searchInput: string;
  isLoading: boolean = true;

  constructor(private http: Http) {
    this.getPeople(this.baseUrl+'people');
  }

  getPeople(url) {
    this.isLoading = true;
    this.http.get(url)
      .subscribe(data => {
      var body = data.json();
      this.people = body.results;
      this.next = body.next;
      this.previous = body.previous;
      this.count = body.count;
      this.isLoading = false;
    });
  }

  getPreviousPage() {
    this.getPeople(this.previous);
  }

  getNextPage() {
    this.getPeople(this.next);
  }

  searchPeople() {
    this.getPeople(this.baseUrl + 'people/?search=' + this.searchInput);
  }
}
