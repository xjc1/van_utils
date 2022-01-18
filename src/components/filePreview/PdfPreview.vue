<template>
  <div class="pdf-preview">
    <div class="pdf-canvas">
      <van-loading class="pdf-load" v-if="loading" style="text-align: center;" />
      <pdf ref="pdf"
           v-for="item in numPages"
           :key="item"
           :page="item"
           class="pdf-content"
           :src="imgSrc" @page-loaded="pageLoaded"  />
    </div>
    <div class="pdf-toolbar" v-if="showTools">
      <van-row>
        <van-col span="8" class="toolbar-grid" >
          <span :class="[scale <= 100 && 'disabled']" @click="scaleX">缩小</span>
          <span :class="[scale >= 200 && 'disabled']" @click="scaleD">放大</span>
        </van-col>
        <van-col span="8" class="toolbar-status">
          <span v-if="numPages">{{ `${currentPage} / ${numPages}` }}</span>
        </van-col>
        <van-col span="8" class="toolbar-grid" v-if="numPages">
          <span :class="[currentPage === 1 && 'disabled']" @click="lastPage">上一页</span>
          <span :class="[currentPage + 1 > numPages && 'disabled']" @click="nextPage">下一页</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf';
import {
  Col, Row, Icon, Loading, Toast,
} from 'vant';

export default {
  name: 'PdfView',
  components: {
    pdf,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
  },
  props: {
    showTools: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number],
      default: 0,
    },
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imgSrc: undefined,
      numPages: undefined,
      currentPage: 1,
      scale: 100,
      loading: true,
    };
  },
  mounted() {
    this.initPdf();
  },
  methods: {
    initPdf() {
      this.imgSrc = pdf.createLoadingTask({
        url: this.src,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
        cMapPacked: true,
      });
      this.imgSrc.promise.then(pdfData => {
        console.log(pdfData);
        this.numPages = pdfData.numPages;
      });
    },
    nextPage() {
      this.loading = true;
      this.currentPage += 1;
    },

    lastPage() {
      this.loading = true;
      this.currentPage -= 1;
    },
    scaleD() {
      this.scale += 20;
      this.$refs.pdf.$el.style.width = `${parseInt(this.scale, 10)}%`;
      Toast({
        message: `${this.scale}%`,
        duration: 500,
        position: 'top',
      });
    },

    scaleX() {
      this.scale -= 20;
      this.$refs.pdf.$el.style.width = `${parseInt(this.scale, 10)}%`;
      Toast({
        message: `${this.scale}%`,
        duration: 500,
        position: 'top',
      });
    },

    pageLoaded() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pdf-preview {
  $toolbar-height: 3rem;
  $header-height: 3rem;
  width: 100%;
  position: relative;
  min-height: 40vh;
  .pdf-canvas {
    max-height: 80vh;
    overflow-y: auto;
    .pdf-load {
      position: absolute;
      top: 48%;
      left: 48%;
      z-index: 50;
    }
  }

  .pdf-toolbar {
    position: absolute;
    height: $toolbar-height;
    bottom: 0;
    background-color: #4f8cee;
    opacity: 0.6;
    width: 100%;

    .toolbar-status {
      text-align: center;
      color: #333333;
      font-weight: 900;
    }

    .toolbar-grid {
      display: flex;
      justify-content: space-around;
      justify-items: center;
      margin: auto;
      color: white;

      span {
        &.disabled {
          pointer-events: none;
          color: #dddddd;
        }
      }

      i {
        margin: auto;
        text-align: center;
        line-height: $toolbar-height;
      }
    }

    div {
      height: $toolbar-height;
      line-height: $toolbar-height;
    }
  }
}
</style>
