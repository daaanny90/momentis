<template>
  <h1 class="time">{{time}}</h1>
</template>

<script>
export default {
  name: 'Hour',
  data() {
    return{
      time: 'Loading...'
    }
  },
  methods: {
    getCurrentTime() {
      let now = new Date()
      let that = this
      this.time = now.getHours() + ':' + now.getMinutes()
      setTimeout(that.getCurrentTime, 1000)
    }
  },
  mounted() {
    this.getCurrentTime()
  }
}
</script>

<style type="scss">
  .time {
    color: white;
    font-size: 1050%;
    letter-spacing: -5px;
    margin: 0;
    margin-bottom: -.2em;
  }
</style>