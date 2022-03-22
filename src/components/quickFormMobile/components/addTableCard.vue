<template>
  <div class="addTableCard">
    <van-field
      v-for="item in viewList"
      :key="item.prop"
      :value="dataSource[item.prop]"
      :label="item.label"
      readonly
    />
    <div class="addTableCard-viewMore" v-if="columns.length > 2">
      <span @click="viewMore">{{ viewMoreText }}</span>
    </div>
    <div class="addTableCard-btns">
      <span>
        <van-icon name="add-o" @click="$emit('add')" />
      </span>
      <span>
        <van-icon name="edit" @click="$emit('edit', dataSource)" />
      </span>
      <span>
        <van-icon name="delete-o" @click="$emit('del')" />
      </span>
    </div>
  </div>
</template>

<script>
import { Field, Icon } from 'vant';

export default {
  name: 'addTableCard',
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
  },
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      viewAll: false,
    };
  },
  computed: {
    viewList() {
      if (this.viewAll) {
        return this.columns;
      }
      return this.columns.slice(0, 2);
    },
    viewMoreText() {
      if (this.viewAll) {
        return '收起';
      }
      return '显示更多';
    },
  },
  methods: {
    viewMore() {
      this.viewAll = !this.viewAll;
    },
  },
};
</script>

<style lang="scss" scoped>
.addTableCard {
  margin: 10px auto 0;
  border-radius: 2px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
  /deep/ .van-field {
    padding: 12px 0;
    &__control {
      text-align: right;
    }
  }
  .addTableCard-viewMore {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addTableCard-btns {
    font-size: 24px;
    display: flex;
    align-items: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% - 2px);
      &:nth-child(2) {
        border-width: 0 1px;
        border-style: solid;
        border-color: #999999;
      }
    }
  }
}
</style>
