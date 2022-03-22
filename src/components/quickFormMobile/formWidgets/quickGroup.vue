<template>
  <div class="quickGroup">
    <h2 class="quickGroup-title" v-if="widget.title">{{ widget.title }}</h2>
    <form-item
      v-for="item in items"
      :key="item.id"
      :label="item.displayName"
      :remark="item.remark"
      :prop="item.prop"
      :rules="item.rules"
      :class="{'add-table': item.type === 'addtable'}"
      :widget="item"
    >
      <template #default="{ widget }">
        <component
          :widget="widget"
          :is="widget.component"
          v-model="widget.value"
        />
      </template>
    </form-item>
  </div>
</template>

<script>
import FormItem from './quickFormItem';
import '../common.scss';

export default {
  name: 'quickGroup',
  components: {
    FormItem,
  },
  props: {
    widget: Object,
    formData: Object,
  },
  computed: {
    items() {
      return this.widget.fieldList.filter(({ hidden }) => !hidden);
    },
  },
};
</script>

<style lang="scss" scoped>
.quickGroup {
  background-color: white;
  margin-bottom: 16px;
  padding: 0 12px;
  // padding: 0 16px;
  box-flex-group: #fff;

  .quickGroup-title {
    padding: 16px 0 10px;
    height: 24px;
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 24px;
    margin: 0;
  }
}
</style>
