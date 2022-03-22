<template>
  <div class="quickAddTable" >
    <a class="quickBtn" @click.prevent="add">添加</a>
    <div class="quickAddTable-content">
      <div class="quickAddTable-empty" v-if="childDataSource.length === 0">
        暂无数据
      </div>
      <Card
        v-for="item in childDataSource"
        :key="item.id"
        :columns="childColumns"
        :dataSource="item"
        @edit="edit($event, item.id)"
        @del="del(item.id)"
        @add="add"
      />
    </div>
    <van-popup
      class="addTable-popup"
      v-model="show"
      :safe-area-inset-bottom="true"
      duration="0.6"
      position="bottom"
    >
      <div class="block">
        <van-nav-bar
          :title="label"
          left-text="取消"
          right-text="确定"
          @click-left="onCancel"
          @click-right="onConfirm"
        />
        <el-form ref="$form" :model="childFormData">
          <quickGroup :widget="child" :formData="childFormData" />
        </el-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { IDGenerator } from '@tong/assistant';
import {
  Field, Button, Empty, Popup, NavBar,
} from 'vant';
import Card from '../components/addTableCard';

export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Empty.name]: Empty,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    Card,
  },
  name: 'quickAddtable',
  model: {
    prop: 'insertValue',
    event: 'value-change',
  },
  props: {
    widget: Object,
    insertValue: [Array, String],
  },
  data() {
    return {
      show: false,
      activeKey: null,
      childFormData: {},
    };
  },
  computed: {
    label() {
      return this.widget.displayName;
    },
    disabled() {
      return this.widget.disabled;
    },
    child() {
      return this.widget.child;
    },
    childColumns() {
      return _.map(this.widget.child.content, ({ name, id }) => ({ label: name, prop: id }));
    },
    childDataSource() {
      return _.cloneDeep(this.insertValue);
    },
  },
  methods: {
    // 添加
    add() {
      if (this.widget.disabled) {
        return;
      }
      this.activeKey = null;
      this.show = true;
      this.childFormData = this.widget.child.defaultValues;
    },
    // 修改
    edit(dataSource, id) {
      this.childFormData = dataSource;
      this.activeKey = id;
      this.show = true;
    },
    // 删除
    del(id) {
      const array = _.filter(this.childDataSource, item => item.id !== id);
      this.$emit('value-change', array);
    },
    // 确认
    onConfirm() {
      new Promise((resolve, reject) => {
        this.$refs.$form
          .validate((isValid, errorFields) => {
            if (!isValid) {
              reject(errorFields);
              return;
            }
            if (!this.activeKey) {
              resolve([...this.childDataSource, { ...this.childFormData, id: IDGenerator.next() }]);
            }
            resolve(_.map(this.childDataSource, item => {
              if (this.activeKey === item.id) {
                return {
                  ...item,
                  ...this.childFormData,
                };
              }
              return item;
            }));
          });
      })
        .then(res => {
          this.$emit('value-change', res);
          this.childFormData = {};
          this.show = false;
        });
    },
    // 取消
    onCancel() {
      this.activeKey = null;
      this.childFormData = {};
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.quickAddTable {
  //flex: 1;
  //padding-bottom: 48px;
  .quickBtn {
    position: absolute;
    top: 12px;
    right: 0;
  }
  &-content {
    width: calc(100vw - 42px);
    height: auto;
    //position: relative;
    //top: 36px;
    //left: calc(-7rem - 22px);
  }
  &-empty {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  /deep/ .addTable-popup {
    height: 100vh;
    width: 100vw;
  }
}
</style>
