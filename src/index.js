import Vue from 'vue';
import Vuex from 'vuex';
import Clipboard from 'clipboard';

import { split } from './tweet';

import './css/skeleton.css';
import './css/index.css';

Vue.use(Vuex);

const helpText = `This is a simple app for composing tweetstorms.
--
You can compose your text here, separating them with '--'.
--
You can click on any of the tweets on the right to copy them to the clipboard.
`;

const store = new Vuex.Store({
  state: {
    text: helpText
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
      text: helpText
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