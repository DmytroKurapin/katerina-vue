import ProductSubCategoriesList from '@/constants/productSubCategories';
import { NavData } from '@/types';

export default (() => {
  return [
    {
      link: '/products/wedding',
      label: 'navbar.wedding',
      category: 'wedding',
      subCategories: ProductSubCategoriesList
    },
    {
      link: '/products/batMitzvah',
      label: 'navbar.bat_mitzvah',
      category: 'batMitzvah',
      subCategories: ProductSubCategoriesList
    },
    {
      link: '/products/barMitzvah',
      label: 'navbar.bar_mitzvah',
      category: 'barMitzvah',
      subCategories: ProductSubCategoriesList
    },
    {
      link: '/products/forBusinesses',
      label: 'navbar.for_businesses',
      category: 'forBusinesses',
      subCategories: []
    }
  ];
})() as Array<NavData>;
