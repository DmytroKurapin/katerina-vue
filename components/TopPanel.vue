<template>
  <section>
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

      <slot name="favorites" />
    </div>

    <!-- Navigation Bar For Small Screens -->
    <slot name="small-navbar" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default defineComponent({
  components: { LanguageSwitcher },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
