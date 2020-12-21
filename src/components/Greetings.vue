<template>
  <h2 class="greetings-text">{{timeGreeting}}, {{name}}.</h2>
</template>

<script>
export default {
  name: 'Greetings',
  props: [
    'name'
  ],
  data() {
    return {
      timeGreeting: 'Loading...',
    }
  },
  methods: {
    setTimeGreeting() {
      let time = new Date().getHours()
      if (time < 12) {
        this.timeGreeting = 'Good morning'
      } else if (time > 12 && time <= 16) {
        this.timeGreeting = 'Good afternoon'
      } else if (time > 16 && time < 22) {
        this.timeGreeting = 'Good evening'
      } else if (time >= 22) {
        this.timeGreeting = 'Good night'
      } else if (time === 12) {
        this.timeGreeting = 'Time to eat lunch'
      }
    }
  },
  mounted() {
    this.setTimeGreeting();
  }
}
</script>

<style type="scss">
  .greetings-text {
    color: white;
    font-size: 337.5%;
    margin: 0 0 1em 0;
  }
</style>