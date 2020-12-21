<template>
  <nav class="header">
    <Links />
  </nav>
</template>

<script>
import Links from "@/components/Header/Links";

export default {
  name: 'Header',
  components: {
    Links
  }
}
</script>

<style type="scss">
 .header {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   display: flex;
   color: white;
   padding: 0 1em;
 }
</style>