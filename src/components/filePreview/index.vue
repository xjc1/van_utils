<template>
  <div class="filePreview">
    <component
      :is="fileTypeMapper[fileType]"
      :src="src"
      :width="width"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
import PdfPreview from './PdfPreview';
import OfdPreview from './OfdPreview';
import ImgPreview from './ImgPreview';

const fileTypeMapper = {
  ofd: 'OfdPreview',
  pdf: 'PdfPreview',
  jpg: 'ImgPreview',
  jpeg: 'ImgPreview',
  png: 'ImgPreview',
};
export default {
  name: 'FilePreview',
  components: {
    OfdPreview,
    PdfPreview,
    ImgPreview,
  },
  props: {
    fileType: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth * 0.9 || 300,
    },
  },
  data() {
    return {
      fileTypeMapper,
    };
  },
};
</script>
<style lang="scss">
.filePreview {
  display: flex;
  justify-content: center;
}
</style>
