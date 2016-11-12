import Vue from 'vue';
import Vuex from 'vuex';

import './css/skeleton.css';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    text: ''
  },

  getters: {
    tweets: state => {
      return state.text.split(',')
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
    handleChange: function(event) {
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