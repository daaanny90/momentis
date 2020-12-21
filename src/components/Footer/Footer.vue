<template>
  <footer class="footer">
    <Quote />
  </footer>
</template>

<script>
import Quote from "@/components/Footer/Quote";

export default {
  name: 'Footer',
  components: {
    Quote
  }
}
</script>

<style>
  .footer {
    width: 100vw;
    position: fixed;
    bottom: 0;
    text-align: center;
    color: white;
  }
</style>