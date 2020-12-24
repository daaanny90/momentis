<template>
  <div>
    <h3 class="focus-text">What is your main focus today?</h3>
    <input class="focus-input" type="text">
  </div>
</template>

<script>
export default {
  name: 'MainFocus'
}
</script>

<style>
.focus-text {
  color: white;
  font-size: 2.1875rem;
  margin: 0;
  font-weight: normal;
}

.focus-input {
  width: 100%;
  padding-top: 4px;
  display: block;
  background: 0;
  border: 0;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-weight: 500;
  font-size: 2.1875rem;
  outline: 0;
  text-align: center;
  transition: border-color .2s ease;
}
</style>