<template>
    <div class="quickSelect quickSearchSelect">
      <select-field
        :value="inputValue"
        :placeholder="widget.placeholder"
        :disabled="widget.disabled"
        @clickEvent="popEvent" />
      <van-popup class="searchPicker-popup" v-model="show" :safe-area-inset-bottom="true"
                 duration="0.6" position="bottom">
          <div class="block">
            <van-nav-bar
              :title="label"
              left-text="返回"
              right-text="确定"
              @click-left="show = false"
              @click-right="onConfirm"
            />
            <van-search v-model="query" placeholder="请输入搜索关键词" @input="search"/>
            <van-picker
              :columns="columns"
              @confirm="confirmEvent"
              value-key="label"
              :ref="widget.id"
            />
            </div>
      </van-popup>
    </div>
</template>

<script>
import * as _ from 'lodash';
import {
  Popup, NavBar, Search, Picker,
} from 'vant';
import SelectField from '../components/SelectField';

export default {
  name: 'quickSearchselect',
  components: {
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Picker.name]: Picker,
    SelectField,
  },
  model: {
    prop: 'insertValue',
    event: 'picker-change',
  },
  inject: ['mDispatch'],
  props: {
    widget: Object,
    insertValue: String,
    searchFn: [Function, null],
  },
  data() {
    return {
      show: false,
      query: '',
      queryColumns: null,
      search: _.debounce(this.searchEvent, 500),
    };
  },
  computed: {
    label() {
      return this.widget.displayName;
    },
    columns() {
      const { columns } = this.widget;
      if (this.queryColumns !== null) {
        return this.queryColumns;
      }
      return columns;
    },
    inputValue() {
      return _.find(this.columns, ({ value }) => value === this.insertValue)?.label;
    },
  },
  methods: {
    confirmEvent(next) {
      this.$emit('picker-change', next.value);
      this.show = false;
      this.mDispatch(this.widget.id, next);
    },
    onConfirm() {
      const { id: name } = this.widget;
      this.$refs[name].confirm();
    },
    searchEvent() {
      const { query } = this;
      let fn = null;
      if (this.searchFn) {
        fn = this.searchFn;
      } else {
        fn = this.localSearch;
      }
      fn(query).then(data => {
        this.queryColumns = data;
      });
    },
    localSearch(query) {
      return new Promise(resolve => {
        const { columns } = this.widget;
        const result = _.filter(columns, ({ label }) => label.includes(query));
        resolve(result);
      });
    },
    popEvent() {
      if (this.widget.disabled) {
        return;
      }
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.quickSearchSelect {
  /deep/ .searchPicker-popup {
    //height: 100vh;
    //width: 100vw;
  }
}
</style>
