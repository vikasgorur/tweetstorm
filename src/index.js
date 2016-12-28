import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
import Clipboard from 'clipboard';

import { split } from './tweet';

import './css/skeleton.css';
import '../node_modules/hint.css/hint.min.css';
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
    handleCopy: function(text, event) {
      // eslint-disable-next-line
      mixpanel.track('Tweet copy');

      this.$store.commit('setClipboardText', text);
      event.preventDefault();
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
  let $e = $(e.trigger);

  $e.addClass('hint--right');

  $e.mouseleave(function (e) {
    $e.removeClass('hint--right');
  });
});

if (window.location.hostname === "localhost") {
  // eslint-disable-next-line
  mixpanel.track = function() { };
} else {
  // eslint-disable-next-line
  mixpanel.init("46ae29cc1558b298b56c605c45895fda");
}
