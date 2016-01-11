import {Component, Injectable, Input, Inject, EventEmitter, bootstrap} from 'ng-forward';
import {OmovieService} from 'src/oMovieService'

@Component({
  selector: 'watch-list',
  template: `
  <section class="well">
  <h3>Your Watchlist</h3>
  <p ng-if="watchList.$localStorage.watchList.length == 0"> currently empty</p>
  <ul>
    <li class="row" ng-repeat="(key, item) in watchList.$localStorage.watchList">
        <a target="_blank" href="http://www.imdb.com/title/{{item.imdbID}}">
      <div class="title col-xs-8">{{item.Title}} ({{item.Year}})</div>
      </a>
      <div class="col-xs-4"> <button (click)="watchList.remove(item)">remove</button>
    </li>
    </ul>
    </section>
  `
})
@Inject('$localStorage')
class WatchList {
  constructor($localStorage){
    Object.assign(this, { $localStorage });
  }
  remove(item){
    this.$localStorage.watchList = this.$localStorage.watchList.filter(i => {return i != item});
  }
}

@Component({
  selector: 'movie-list',
  template: `
  <section class="search-results">
  <div ng-if="!movieList.response.status">
    Nothing found
  </div>
  <ul>
    <li class="row" ng-repeat="(key, item) in movieList.response.movies">
    <div class="col-xs-2 poster-wrap">
      <img class="poster img-rounded" ng-src="{{item.Poster}}" ng-if="item.Poster !== 'N/A'">
      <img class="poster img-rounded" src="http://placehold.it/80x100" ng-if="item.Poster == 'N/A'">
      </div>
      <div class="title">
        <a target="_blank" href="http://www.imdb.com/title/{{item.imdbID}}">
        {{item.Title}} ({{item.Year}})
      </a></div>
    <div> <button (click)="movieList.addToWatchList(item)">Add to Watchlist</button></div>
  </li>
  </ul>
  </section>
  `,
  providers: ['ngStorage'],
  inputs: ['response']
})
@Inject('$localStorage')
class MovieList {
  constructor($localStorage){
    Object.assign(this, { $localStorage });
    if(!this.$localStorage.watchList) this.$localStorage.watchList = []
  }

  addToWatchList(movie){
    if(this.$localStorage.watchList.indexOf(movie) == -1){
      this.$localStorage.watchList.push(movie);
    }
  }

}

@Component({
  selector: 'app',
  providers: ["ui.router"],
  directives: [MovieList, WatchList],
  outputs: ['response'],
  template: `
  <center>
  <h1>oMovie Search</h1>
  <form>
  <input class="search-box" ng-model="app.searchTerm"/>
  <button type="submit" (click)="app.search(app.searchTerm)">
  Search
  </button>
  </form>
  </center>
  <div class="row">
  <movie-list [response]="app.response" class="col-xs-12 col-sm-6 col-md-5 col-md-offset-2"></movie-list>
  <watch-list class="col-xs-12 col-sm-6 col-md-5 watchlist"></watch-list>
  </div>
  `
})
@Inject(OmovieService)
class AppCtrl{
  constructor(OmovieService){
    this.response = { status: true }
    Object.assign(this, { OmovieService });
  }

  search(val){
    this.OmovieService.search(val).then(val => {
      if(val.data.Search) {
        this.response.status = true;
        this.response.movies = val.data.Search
      }
      else {
        this.response.status = false
        this.response.movies = []
      }
    })
  }
}

bootstrap(AppCtrl);
