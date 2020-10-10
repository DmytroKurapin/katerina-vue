import { ProductSubCategoriesList } from '@/constatnts/productSubCategories';
import { NavData } from '@/types';

export default (() => {
  return [
    { link: '/products/wedding', label: 'navbar.wedding', subCategories: ProductSubCategoriesList },
    { link: '/products/batMitzvah', label: 'navbar.bat_mitzvah', subCategories: ProductSubCategoriesList },
    { link: '/products/barMitzvah', label: 'navbar.bar_mitzvah', subCategories: ProductSubCategoriesList },
    { link: '/products/giftcard', label: 'navbar.giftcard', subCategories: ProductSubCategoriesList }
  ];
})() as Array<NavData>;
