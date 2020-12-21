<template>
  <p class="quote-text">"{{quoteOfTheDay}}"</p>
</template>

<script>
import axios from 'axios';
import {getCookie} from "@/plugins/getCookie";
import {isCookieHere} from "@/plugins/isCookieHere";
import {cookieExpirationDate} from "@/plugins/cookieExpirationDate";

export default {
  name: 'Quote',
  data() {
    return {
      quoteOfTheDay: 'Loading...'
    }
  },
  methods: {
    async getQuoteOfTheDay() {
      let that = this

      if (!isCookieHere('quoteOfTheDay')) {
        await axios("https://type.fit/api/quotes")
            .then(function (response) {
              let totalQuotes = response.data.length;
              let quoteNumber = Math.floor(Math.random() * (totalQuotes - 0 + 1));
              that.quoteOfTheDay = response.data[quoteNumber].text
              document.cookie = "quoteOfTheDay=" + that.quoteOfTheDay + "; expires=" + cookieExpirationDate();
            })
      } else {
        this.quoteOfTheDay = getCookie('quoteOfTheDay')
      }
    }
  },
  beforeMount() {

  },
  mounted() {
    this.getQuoteOfTheDay();
  }
}
</script>

<style>
  .quote-text {
    font-size: 1.125rem;
  }
</style>