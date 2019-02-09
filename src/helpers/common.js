// @flow

import { isImmutable } from 'immutable';

export const convertFromImmutableToJS = (elt: any): any => {
  if (isImmutable(elt)) {
    return elt.toJS();
  }

  return elt;
};

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
* Преобразование линейного массива в дерево
* @param data
* @returns {Array}
*/
export const arrayToTree = (data: Array<any>) => {
  const tree = [];
  const map = {};

  data.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  Object.values(map).forEach((item: any) => {
    if (item.parentId) {
      map[item.parentId].children.push(item);
    } else {
      tree.push(item);
    }
  });

  return tree;
};
