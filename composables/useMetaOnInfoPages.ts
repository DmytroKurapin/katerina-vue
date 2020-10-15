import { ref, useContext, useMeta } from '@nuxtjs/composition-api';
import { createSEOMeta } from '@/utils/seo';

export const setMeta = (data: { page: string }) => {
  const { page } = data;
  const metaTitle = ref<string>(useContext().app.i18n.t(`footer.${page}`));
  const metaDescription = ref<string>(`${metaTitle.value} | ${useContext().app.i18n.t('general.site_description')}`);

  useMeta({
    title: metaTitle.value,
    meta: createSEOMeta({
      title: metaTitle.value,
      description: metaDescription.value,
      image: '/logo.png',
      url: useContext().route.value.path
    })
  });
};
