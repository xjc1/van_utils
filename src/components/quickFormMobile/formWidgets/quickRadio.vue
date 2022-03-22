<template>
  <div class="quickSelect quickRadio">
    <select-field
      :value="insertValue"
      :placeholder="widget.placeholder"
      :disabled="widget.disabled"
      @clickEvent="showPicker = true" />
    <van-action-sheet
      v-model="showPicker"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="showPicker = false"
    />
  </div>
</template>

<script>
import * as _ from 'lodash';
import { Field, ActionSheet } from 'vant';
import SelectField from '../components/SelectField';

export default {
  name: 'quickRadio',
  components: {
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    SelectField,
  },
  model: {
    prop: 'insertValue',
    event: 'value-change',
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
    actions() {
      return _.map(this.widget.columns, item => ({ ...item, name: item.label }));
    },
    inputValue() {
      return _.find(this.actions, ({ value }) => value === this.insertValue)?.label;
    },
  },
  methods: {
    onSelect({ value }) {
      this.$emit('value-change', value);
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

<style scoped></style>
