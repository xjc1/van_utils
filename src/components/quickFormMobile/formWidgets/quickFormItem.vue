<template>
  <el-form-item :label="label" v-bind="$attrs" :rules="rules" ref="$formItem">
    <template #label>
      <span>
        {{ label }}
      </span>
      <template v-if="remark">
        <van-icon color="#FF9838" name="question" @click="viewRemark = true" />
        <van-popover v-model="viewRemark" placement="bottom-start">
          <div class="remark" v-html="remark"></div>
        </van-popover>
      </template>
    </template>
    <slot :widget="widget"></slot>
  </el-form-item>
</template>

<script>
import { Icon, Popover } from 'vant';

export default {
  name: 'quickFormItem',
  inheritAttrs: false,
  components: {
    [Icon.name]: Icon,
    [Popover.name]: Popover,
  },
  props: {
    label: [String],
    remark: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    widget: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      viewRemark: false,
    };
  },
  watch: {
    'widget.value': {
      handler() {
        this.$refs.$formItem.validate('change');
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0;
  display: flex;
  width: 100%;
  padding: 12px 0;
  box-sizing: border-box;
  position: relative;
  &.add-table {
    flex-direction: column;
  }
  &.is-error {
    padding-bottom: 24px;
  }
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #EBEBEB;
    transform: scaleY(.5);
    width: 100% ;
  }

  &:last-child::after {
    display: none;
  }
  /deep/ &__label {
    position: relative;
    width: 7rem;
    text-align: left;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 24px;
    color: #1a1b1f;
    padding-left: 10px;
    padding-right: 0;
    margin-right: 10px;
    &:before {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  /deep/ &__content {
    flex: 1;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 24px;
    color: #1a1b1f;
    position: static;
    .el-form-item__error {
      bottom: 0;
      top: unset;
      right: 0;
      left: unset;
      transform: translateY(-70%);
    }
  }
}
.remark {
  box-sizing: border-box;
  width: 90vw;
  padding: 0 16px;
}
</style>
