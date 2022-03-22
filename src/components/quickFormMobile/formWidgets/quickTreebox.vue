<template>
    <van-field v-model="inputValue"
               :name="name"
               label-width="8rem"
               :label="label"
    />
</template>

<script>

export default {
  name: 'quickTreebox',
  components: {
  },
  model: {
    prop: 'insertValue',
    event: 'input-change',
  },
  props: {
    widget: Object,
    insertValue: String,
  },
  computed: {
    name() {
      return this.widget.id;
    },
    label() {
      return this.widget.displayName;
    },
    inputValue: {
      get() {
        return this.insertValue;
      },
      set(val) {
        this.$emit('input-change', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
