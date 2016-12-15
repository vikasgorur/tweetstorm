import Vue from 'vue';
import Vuex from 'vuex';
import Clipboard from 'clipboard';

import { split } from './tweet';

import './css/skeleton.css';
import './css/index.css';

Vue.use(Vuex);

const helpText = `This is a simple app for composing tweetstorms.
--
Write your text here, separating tweets with a line containing only '--'.
--
Click on any tweet on the right to copy it to the clipboard.
--
`;

const store = new Vuex.Store({
  state: {
    text: helpText,
    clipboardText: ''
  },

  getters: {
    tweets: state => {
      return split(state.text)
    }
  },

  mutations: {
    setText(state, text) {
      state.text = text;
    },

    setClipboardText(state, text) {
      state.clipboardText = text;
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
  },

  methods: {
    handleCopy: function(text) {
      this.$store.commit('setClipboardText', text)
    }
  }
});

new Vue({
  el: '#root',
  store
});

const clipboard = new Clipboard('.copy', {
  text: function() {
    return store.state.clipboardText;
  }
});

clipboard.on('success', (e) => {
  console.log(e.text);
})