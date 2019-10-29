<template lang='pug'>
  #app
    .wrapper
      router-view
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

  html, body {
    height: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: "Roboto Slab", sans-serif;
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    height: 100%;
  }

  .wrapper {
    min-height: 100%;
    height: 100%;
    width: 960px;
  }

  @media (max-width: 960px) {
    .wrapper {
      min-width: 320px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .wrapper {
      min-width: 320px;
      width: 100%;
    }
  }
</style>
