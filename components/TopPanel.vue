<template>
  <section :class="fullPath === '/' ? 'main-page-logo-height' : 'products-page-logo-height'">
    <!--  Tel and Email  -->
    <div dir="ltr" class="hidden lg:inline-flex flex-col">
      <span class="py-1">+972 58 888 88 88</span>
      <span class="py-1">email@email.email</span>
    </div>

    <div class="block lg:hidden">
      <slot name="favorites" />
    </div>

    <!-- Logo -->
    <div class="-translate-x-1/2 absolute left-1/2 transform">
      <!--    <div class="inline-flex items-center justify-end flex-1 px-4">-->
      <nuxt-link :to="localePath('/')" class="inline-flex">
        <img
          src="/logo.jpg"
          alt="Katerina Kurapin"
          :class="fullPath === '/' ? 'main-page-logo-height' : 'products-page-logo-height'"
          class="w-auto py-2"
        />
      </nuxt-link>
    </div>

    <div class="hidden lg:block">
      <LanguageSwitcher class="inline-flex my-1 py-1" />

      <slot name="favorites" />
    </div>

    <!-- Navigation Bar For Small Screens -->
    <slot name="small-navbar" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default defineComponent({
  components: { LanguageSwitcher },
  setup(props, { root }) {
    return { fullPath: computed(() => root.$route.fullPath) };
  }
});
</script>

<style scoped>
.main-page-logo-height {
  @apply h-32;
}
.products-page-logo-height {
  @apply h-20;
}

@screen lg {
  .main-page-logo-height {
    @apply h-48;
  }
  .products-page-logo-height {
    @apply h-32;
  }
}
</style>
