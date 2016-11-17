import Vue from 'vue';
import Vuex from 'vuex';
import Clipboard from 'clipboard';

import { split } from './tweet';

import './css/skeleton.css';
import './css/index.css';

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
      text: this.$store.text
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

new Clipboard('.tweet');