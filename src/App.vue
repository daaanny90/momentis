<template>
  <div id="app">
    <Header/>
    <div class="greetings">
      <Hour/>
      <Greetings name="Danny"/>
      <MainFocus/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Hour from "@/components/Hour";
import Greetings from "@/components/Greetings";
import Header from "@/components/Header/Header";
import axios from 'axios';
import MainFocus from "@/components/MainFocus";
import {getCookie} from "@/plugins/getCookie";
import {cookieExpirationDate} from "@/plugins/cookieExpirationDate";
import {isCookieHere} from "@/plugins/isCookieHere";
import Footer from "@/components/Footer/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Hour,
    Greetings,
    MainFocus,
    Footer
  },
  data() {
    return {
      backgroundUrl: null,
    }
  },
  methods: {
    changeBackground(url) {
      let app = document.querySelector('#app')
      app.style.backgroundImage = 'url(' + url + ')';
    },
    async setBackground(name, url) {
      let that = this;
      if (!isCookieHere('backgroundUrl')) {
        await axios
            .get(url)
            .then(function (response) {
              let imageUrl = response.request.responseURL
              document.cookie = name + "=" + imageUrl + "; expires=" + cookieExpirationDate();
              that.changeBackground(imageUrl)
            })
      } else {
        let savedBackground = getCookie('backgroundUrl')
        this.changeBackground(savedBackground)
      }
    },
  },
  mounted() {
    this.setBackground('backgroundUrl', 'https://source.unsplash.com/featured/2400x1600/?wallpaper')
  },
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  font-family: "Helvetica", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .greetings {
    display: flex;
    flex-direction: column;
    color: white;
  }

  .btn {
    background-color: transparent;
    border: none;
    color: black;
  }
}
</style>
