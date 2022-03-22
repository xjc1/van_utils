<template>
  <div class="quickDatePicker quickSelect">
    <select-field
      :value="insertValue"
      :placeholder="widget.placeholder"
      :disabled="widget.disabled"
      @clickEvent="popEvent" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-datetime-picker
        :value="currentDate"
        :type="pickerType.type"
        :title="label"
        @cancel="showPicker = false"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant';
import moment from 'moment';
import SelectField from '../components/SelectField';

export default {
  name: 'quickDatepicker',
  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    SelectField,
  },
  model: {
    prop: 'insertValue',
    event: 'picker-change',
  },
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
    label() {
      return this.widget.displayName;
    },
    disabled() {
      return this.widget.disabled;
    },
    pickerType() {
      return this.widget.pickerType;
    },
    currentDate() {
      if (!this.insertValue) {
        return new Date();
      }
      return new Date(this.insertValue);
    },
  },
  methods: {
    confirm(val) {
      const date = moment(val).format(this.pickerType.format);
      this.$emit('picker-change', date);
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

<style lang="scss" scoped>
.quickDatePicker {
  /deep/ .van-field__control {
    line-height: 26px;
  }
}
</style>
