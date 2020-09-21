import { NavData } from '~/types';
import { ProductSubCategoriesList } from '~/constatnts/productSubCategories';

export default (() => {
  return [
    { link: '/wedding', label: 'navbar.wedding', subCategories: ProductSubCategoriesList },
    { link: '/batMitzvah', label: 'navbar.bat_mitzvah', subCategories: ProductSubCategoriesList },
    { link: '/barMitzvah', label: 'navbar.bar_mitzvah', subCategories: ProductSubCategoriesList },
    { link: '/giftcard', label: 'navbar.giftcard', subCategories: ProductSubCategoriesList }
  ];
})() as Array<NavData>;
