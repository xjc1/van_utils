<template>
  <van-field
    :value="value"
    v-bind="$attrs"
    autosize
    rows="1"
    type="textarea"
    clickable
    right-icon="arrow"
    readonly
    :placeholder="placeholder"
    @click="$emit('clickEvent')"
    :border="false"
  />
</template>

<script>
import { Field } from 'vant';

export default {
  name: 'SelectField',
  components: {
    [Field.name]: Field,
  },
  props: {
    value: [String, Number, Date],
    placeholder: [String],
  },
};
</script>

<style lang="scss" scoped>
.van-field {
  padding: 0;
}
</style>
