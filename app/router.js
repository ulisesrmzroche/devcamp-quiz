import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'}, function() {
    this.route('myFavorites', {path: '/my-favorites'});
    this.route('myRecordCollection', {path: 'my-collection'});
  });

  // Library
  this.route('library', function() {
    this.route('songs', function() {
      this.route('new');
    });

    this.route('artists', function() {
      this.route('new');
    });

    this.route('albums', function() {
      this.route('new');
      this.route('album', {path: '/:id'});
    });
  });

  this.route('user', {path: '/:id'}, function() {});
});

export default Router;
