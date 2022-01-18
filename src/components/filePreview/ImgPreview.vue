<template>
<div class="imgPreview">
  <img  :style="{width: width + 'px'}" :src="src" alt="">
</div>
</template>

<script>
export default {
  name: 'ImgPreview',
  props: ['src', 'width'],
};
</script>

<style scoped>

</style>
