export const ROUTE_HOME = '/';
export const ROUTE_SIGN_UP = '/signup';
export const ROUTE_SIGN_IN = '/signin';
export const ROUTE_CREATE_REVIEW = '/create-review';

export const TAB_OFFER_EDIT = 0;
export const TAB_OFFER_MODIFIER = 1;

export const menuItems = [
  { id: 1, title: 'Обзоры', url: ROUTE_HOME, enable: true, parentId: 0},
];


export const getTitleByRoute = (route) => {
  const menuItem = menuItems.find(item => item.url === route || route.includes(item.url));
  return menuItem ? menuItem.title : '';
};
