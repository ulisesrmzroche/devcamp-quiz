import Ember from 'ember';

export default Ember.Component.extend({
  didRender(){
    window.videojs('vid1').ready(function(){
    });
  },
  willDestroyElement(){
    window.videojs('vid1').dispose();
  }
});
