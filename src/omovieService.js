import {Component, Injectable, Inject} from 'ng-forward';

  const OMOVIE_URL = 'http://www.omdbapi.com/'
  const SEARCH_PARAM = '?s='

@Injectable()
@Inject('$q', '$timeout', '$http')
export class OmovieService{

  constructor($q, $timeout, $http){
    Object.assign(this, { $q, $timeout, $http });
  }

  search(val){
    return this.$http.get(OMOVIE_URL+SEARCH_PARAM+val)
  }

  getValue(){
    return this.$q(resolve => {
      this.$timeout(() => resolve('Spec!'), 3000);
    });
  }
}

