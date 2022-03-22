<template>
  <div class="quickDatePicker quickSelect">
    <select-field
      :value="insertValue"
      :placeholder="widget.placeholder"
      :disabled="widget.disabled"
      @clickEvent="popEvent" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        title="选择年份"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Picker, Popup } from 'vant';
import moment from 'moment';
import _ from 'lodash';
import SelectField from '../components/SelectField';

const DEFAULT_MIN_YEAR = 1970;
const DEFAULT_MAX_YEAR = +(moment().get('year'));
export default {
  name: 'quickYearpicker',
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    SelectField,
  },
  model: {
    prop: 'insertValue',
    event: 'picker-change',
  },
  props: {
    widget: Object,
    insertValue: [String, Number, Date],
  },
  data() {
    return {
      showPicker: false,
    };
  },
  computed: {
    inputValue() {
      if (!this.insertValue) {
        return '';
      }
      if (this.insertValue instanceof Date) {
        return moment(this.insertValue).get('year');
      }
      return this.insertValue;
    },
    label() {
      return this.widget.displayName;
    },
    disabled() {
      return this.widget.disabled;
    },
    minYear() {
      const { minYear } = this.widget;
      if (minYear) {
        return +minYear;
      }
      return DEFAULT_MIN_YEAR;
    },
    maxYear() {
      const { maxYear } = this.widget;
      if (maxYear) {
        return +maxYear;
      }
      return DEFAULT_MAX_YEAR;
    },
    columns() {
      return _.range(this.minYear, this.maxYear + 1);
    },
  },
  methods: {
    confirm(val) {
      this.$emit('picker-change', val);
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
