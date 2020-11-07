<template>
  <header>
    <!--  Tel and Email  -->
    <div dir="ltr">
      <span>+972 58 888 88 88</span>
    </div>

    <!-- Logo -->
    <div class="">
      <!--    <div class="inline-flex items-center justify-end flex-1 px-4">-->
      <nuxt-link :to="localePath('/')" class="inline-flex">
        <img src="/logo.jpg" alt="Katerina Kurapin" class="h-8 lg:h-12 w-auto" />
      </nuxt-link>
    </div>

    <div class="">
      <!--    <div class="inline-flex flex-col">-->
      <LanguageSwitcher class="hidden lg:inline-flex my-1" />

      <!--  Heart icon -->
      <nuxt-link :to="localePath('/favorites')" class="flex justify-center">
        <span class="relative cursor-pointer">
          <HeartIcon class="h-8 w-8" :is-liked="true" />

          <span class="absolute top-4/9 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-100">
            {{ favoriteProducts.length }}
          </span>
        </span>
      </nuxt-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { ComputedRef } from '@vue/composition-api';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import NavMenu from '@/components/NavBar.vue';
import HeartIcon from '@/components/HeartIcon.vue';
import { Product } from '@/types';

export default defineComponent({
  components: { NavMenu, LanguageSwitcher, HeartIcon },
  setup() {
    const favoriteProducts: ComputedRef<Product[]> = require('@/composables/useFavorites').favoriteProducts$;

    return { favoriteProducts };
  }
});
</script>

<style scoped></style>
