/**
 * @module @tong/datastructure:tree
 * @desc 封装和tree结构相关的常用操作
 */
import _ from 'lodash';
import { DoNothingFn, EmptyFn } from './tools';

const defaultChildrenName = 'children';
/***
 * 根据某个节点，获取到根节点的数据
 * @param list 扁平化的一颗树
 * @param code
 * @param parentCodeProp
 * @param result
 * @returns {*[]|*}
 */
export function getNodeList(list = [], code, parentCodeProp, result = []) {
    const item = _.find(list, ({ code: value }) => value === code);
    if (!item) {
        return result;
    }
    const { [parentCodeProp]: parentCode } = item;
    if (!parentCode) {
        return [item, ...result]
    }
    return getNodeList(list, parentCode, parentCodeProp, [item, ...result]);
}

/**
 * 数组转tree结构
 * @function
 * @param { Array } data 数据
 * @param { function } fn 数据转换函数
 * @param { object } params 配置参数
 * @param { string } params.parentName 父节点字段名
 * @param { string } params.childrenName 子节点字段名
 */
function arr2tree(data, fn = DoNothingFn, params = {}) {
    const { parentName = 'parentCode', parentCodeName, rootName = '', childrenName = defaultChildrenName } = params;
    const groups = _.groupBy(data, parentName);

    function item2treeNode(roots = [], group) {
        return _.map(roots, (item) => {
            const { [parentCodeName]: code } = item;
            return {
                ...fn(item),
                [childrenName]: item2treeNode(group[code], group),
            };
        });
    }

    return item2treeNode(groups[rootName], groups);
}

/**
 * map函数 tree 结构版本
 * @function
 * @param { Array } treeData 数据
 * @param { function } [fn=DoNothingFn] 数据转换函数
 * @param { object } [childrenName=children] 子节点字段名
 */
function mapTree(treeData = [], fn = DoNothingFn, childrenName = defaultChildrenName) {
    return treeData.map(({ [childrenName]: children = [], ...others }) => {
        return fn({
            ...others,
            [childrenName]: mapTree(children, fn, childrenName),
        });
    });
}

function mapTreeDeep(treeData = [],
                     fn = DoNothingFn,
                     childrenName = defaultChildrenName,
                     nodeKey = 'id',
                     _parent,
                     _path = [],
                     _deep = 0) {
    return treeData.map(({ [childrenName]: children = [], ...others }) => {
        const { [nodeKey]: key } = others;
        const nextPath = _.concat(_path, key);
        return fn({
            ...others,
            _parent,
            _deep,
            _path: nextPath,
            [childrenName]: mapTreeDeep(children, fn, childrenName, nodeKey, others, nextPath, _deep + 1),
        });
    });
}

function filterTree(treeData = [], fn = DoNothingFn, childrenName = defaultChildrenName) {
    return treeData.filter(fn).map(({ [childrenName]: children = [], ...others }) => {
        return {
            ...others,
            [childrenName]: filterTree(children, fn, childrenName),
        };
    });
}

function removeNode(treeData = [], removeId, childrenName = defaultChildrenName) {
    return filterTree(treeData, ({ id }) => {
        return id !== removeId;
    }, childrenName);
}

function getNode(treeData = [], condition, childrenName = defaultChildrenName) {
    const result = _.find(treeData, condition);
    if (result) return result;
    for (const item of treeData) {
        const { [childrenName]: children = [] } = item;
        const value = getNode(children, condition, childrenName);
        if (value) return value;
    }
    return undefined;
}


function forEachTree(treeData = [], fn = EmptyFn, childrenName = defaultChildrenName) {
    _.forEach(treeData, (item) => {
        if (fn(item) === false) {
            return false;
        }
        forEachTree(item[childrenName], fn, childrenName);
    });
}

function flatTree(treeData = [], fn = DoNothingFn, childrenName = defaultChildrenName) {
    const newArr = [];
    forEachTree(treeData, (node) => {
        newArr.push(fn(node));
    }, childrenName);
    return newArr;
}
