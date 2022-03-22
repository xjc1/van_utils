<template>
  <van-field
    type="number"
    v-model="inputValue"
    :disabled="widget.disabled"
    :border="false"
    @blur="onBlur"
    :placeholder="widget.placeholder"
  ></van-field>
</template>

<script>
import { Field } from 'vant';

export default {
  name: 'quickNumberInput',
  inheritAttrs: false,
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'insertValue',
    event: 'valueChange',
  },
  inject: ['mDispatch'],
  props: {
    widget: Object,
    insertValue: String,
  },
  computed: {
    inputValue: {
      set(val) {
        this.$emit('valueChange', val);
      },
      get() {
        return this.insertValue;
      },
    },
  },
  methods: {
    onBlur(e) {
      this.mDispatch(this.widget.id, e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.van-field {
  padding: 0;
}
</style>
