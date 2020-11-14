import { computed, reactive, toRef } from '@nuxtjs/composition-api';

const scrollState = reactive({
  scrollComponent: null,
  didScrolled: false
});

export const mainSection = toRef(scrollState, 'scrollComponent');
export const didScrolled = computed(() => scrollState.didScrolled);

export const scrollToTop = () => {
  if (scrollState.scrollComponent !== null) {
    // FIXME smooth behavior does not work in Safari
    // @ts-ignore
    scrollState.scrollComponent.scroll({ top: 0, behavior: 'smooth' });
  }
};

export const goTopPosition = () => {
  if (scrollState.scrollComponent !== null) {
    // @ts-ignore
    scrollState.scrollComponent.scrollTo({ top: 0 });
  }
};

export const toggleDidScrolled = (isScrolled: boolean) => {
  scrollState.didScrolled = isScrolled;
};
