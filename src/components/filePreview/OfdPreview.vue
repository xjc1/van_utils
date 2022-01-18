<template>
  <div class="ofdPreview">
    <cafe-ofd  ref="ofd" :filePath="src" :width="width" />
  </div>

</template>

<script>
import Vue from 'vue';
import cafeOfd from 'cafe-ofd';

export default {
  name: 'OfdPreview',
  props: {
    src: {
      type: [Object, String],
      default: undefined,
    },
    width: {
      type: [Number, String],
      default: 900,
    },
  },
  created() {
    Vue.use(cafeOfd);
  },
};
</script>

<style lang="scss" src="./ofdPreview.scss" scoped>
</style>
