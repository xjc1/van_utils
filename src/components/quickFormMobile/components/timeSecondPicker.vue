<template>
  <div class="quickDatePicker quickSelect">
    <select-field
      :value="insertValue"
      :placeholder="widget.placeholder"
      @clickEvent="showPicker = true" />
    <van-popup v-model="showPicker" round position="bottom" ref="$popup">
      <van-picker
        show-toolbar
        title="选择时分秒"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="confirm"
        />
    </van-popup>
  </div>
</template>

<script>
import _ from 'lodash';
import { Picker, Popup } from 'vant';
import SelectField from './SelectField';

export default {
  name: 'TimeSecondPicker',
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    SelectField,
  },
  model: {
    prop: 'insertValue',
    event: 'change',
  },
  props: {
    widget: Object,
    insertValue: String,
  },
  data() {
    return {
      showPicker: false,
      defaultTimeValue: [],
    };
  },
  computed: {
    label() {
      return this.widget.displayName;
    },
    disabled() {
      return this.widget.disabled;
    },
    columns() {
      return [
        // 时
        {
          values: this.getOptions(24),
          defaultIndex: +this.defaultTimeValue[0] || 0,
        },
        // 分
        {
          values: this.getOptions(60),
          defaultIndex: +this.defaultTimeValue[1] || 0,
        },
        // 秒
        {
          values: this.getOptions(60),
          defaultIndex: +this.defaultTimeValue[2] || 0,
        },
      ];
    },
  },
  created() {
    if (this.insertValue) {
      this.defaultTimeValue = this.insertValue.split(':');
    }
  },
  methods: {
    getOptions(count) {
      return _.range(0, count)
        .map(item => {
          const str = item.toString();
          if (str.length > 1) {
            return str;
          }
          return `0${str}`;
        });
    },
    confirm(val) {
      const [hour, minute, second] = val;
      const timeValue = `${hour}:${minute}:${second}`;
      this.$emit('change', timeValue);
      this.showPicker = false;
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

<style scoped>

</style>
