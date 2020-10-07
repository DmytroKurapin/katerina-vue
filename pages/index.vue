<template>
  <div>
    Main Page
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {},
  head() {
    return { title: `${this.metaTitle}` };
  },
  setup(props, ctx) {
    // const { fetchArticleForUserLang, article } = usePosts({ ctx });
    // const slug = ctx.root.$route.params?.article;
    const metaTitle = ref(ctx.root.$t('navbar.home_page'));

    return { metaTitle };
  }
});
</script>

<style></style>
