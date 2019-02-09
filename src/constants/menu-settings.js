export const SETTING_CATEGORIES_MODES = 'Вид представления списка категорий товаров в каталоге';
export const SETTING_CATEGORIES = 'Вид категории в списке';
export const SETTING_OFFERS = 'Вид товара в списке';

export const SETTING_CODE_CATALOG = 'catalog';

export const settingItems = ['categories', 'offers'];

export const getSettingTitleByCode = (code) => {
  let title;

  if (settingItems.find(item => item === code)) {
    switch (code) {
      case 'categories':
        title = SETTING_CATEGORIES;
        break;
      case 'offers':
        title = SETTING_OFFERS;
        break;
      default:
        title = SETTING_CATEGORIES_MODES;
    }
  }

  return title;
};
