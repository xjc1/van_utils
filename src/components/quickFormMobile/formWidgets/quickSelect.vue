<template>
  <div class="quickSelect">
    <select-field
      :value="inputValue"
      :placeholder="widget.placeholder"
      :disabled="widget.disabled"
      @clickEvent="popEvent" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="label"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { Picker, Popup } from 'vant';
import SelectField from '../components/SelectField';

export default {
  name: 'quickSelect',
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    SelectField,
  },
  model: {
    event: 'picker-change',
    prop: 'insertValue',
  },
  inject: ['mDispatch'],
  props: {
    widget: Object,
    insertValue: String,
  },
  data() {
    return {
      showPicker: false,
    };
  },
  computed: {
    columns() {
      return this.widget.columns;
    },
    inputValue() {
      return _.find(this.columns, ({ value }) => value === this.insertValue)?.label;
    },
  },
  methods: {
    onConfirm(next) {
      this.$emit('picker-change', next.value);
      this.showPicker = false;
      this.mDispatch(this.widget.id, next);
    },
    popEvent() {
      if (this.widget.disabled) {
        return;
      }
      this.showPicker = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.quickSelect {
  /deep/ .van-field__control {
    line-height: 26px;
  }
}
</style>
