import Vue from 'vue';

declare module 'vue/types/vue' {
  // Declare augmentation for Vue
  interface Vue {
    $dir: Function;
  }
}
