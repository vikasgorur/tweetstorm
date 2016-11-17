import Vue from 'vue';
import Vuex from 'vuex';

import { split } from './tweet';

import './css/skeleton.css';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    text: ''
  },

  getters: {
    tweets: state => {
      return split(state.text)
    }
  },

  mutations: {
    setText(state, text) {
      state.text = text;
    }
  }
});

Vue.component('compose', {
  template: '#compose-template',

  data: function() {
    return {
      text: ''
    }
  },

  methods: {
    handleKeyUp: function(event) {
      this.$store.commit('setText', this.text);
    }
  }
});

Vue.component('tweets', {
  template: '#tweets-template',

  computed: {
    tweets() {
      return this.$store.getters.tweets;
    }
  }
});

new Vue({
  el: '#root',
  store
});