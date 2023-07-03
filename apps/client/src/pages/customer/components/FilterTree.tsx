import React, { useState } from 'react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { Key } from 'antd/es/table/interface';

type FilterTreeProps = {
  treeData: DataNode[]
  onCheck: any
  checkedKeys: React.Key[] | {
    checked: React.Key[];
    halfChecked: React.Key[];
  }
}

const FilterTree: React.FC<FilterTreeProps> = ({ treeData = [], checkedKeys, onCheck }) => {

  // const onCheck = (checkedKeysValue: React.Key[] | {
  //   checked: React.Key[];
  //   halfChecked: React.Key[];
  // }) => {
  //   console.log('onCheck', checkedKeysValue);
  //   setCheckedKeys(checkedKeysValue);
  // };

  return (
    <Tree
      checkable
      autoExpandParent={true}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={treeData}
      style={{ background: 'rgb(245, 245, 245)' }}
    />
  );
};

export default FilterTree;