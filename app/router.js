import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('myFavorites', {path: '/my-favorites'});
  this.route('home', {path: '/'}, function() {
    this.route('myRecordCollection', {path: '/my-collection'});
  });

  // Library
  this.route('library', function() {
    this.route('songs', function() {
      this.route('new');
      this.route('song', {path: '/:id'});
    });

    this.route('artists', function() {
      this.route('new');
      this.route('artist', {path: '/:id'});
    });

    this.route('albums', function() {
      this.route('new');
      this.route('album', {path: '/:id'});
    });
  });

  this.route('user', {path: '/:id'}, function() {
    this.route('favorites');
  });
});

export default Router;
