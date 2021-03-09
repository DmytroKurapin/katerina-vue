import customBreakpoints from '@/constants/customBreakpoints';
import { computed, reactive, toRef } from '@nuxtjs/composition-api';

const breakpointsList = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
interface IPageState {
  scrollComponent: string | null;
  didScrolled: boolean;
  currBreakpoint: typeof breakpointsList[number];
  isModalShown: boolean;
}

const pageState = reactive<IPageState>({
  scrollComponent: null,
  didScrolled: false,
  currBreakpoint: 'xl',
  isModalShown: false
});

export const mainSection = toRef(pageState, 'scrollComponent');
export const didScrolled$ = computed(() => pageState.didScrolled);
export const currBreakpoint$ = computed(() => pageState.currBreakpoint);
export const isModalShown$ = computed(() => pageState.isModalShown);
export const isMobileView$ = computed(() => customBreakpoints[currBreakpoint$.value] <= customBreakpoints.lg);

export const scrollToTop = () => {
  if (pageState.scrollComponent !== null) {
    // FIXME smooth behavior does not work in Safari
    // @ts-ignore
    pageState.scrollComponent.scroll({ top: 0, behavior: 'smooth' });
  }
};

export const goTopPosition = () => {
  if (pageState.scrollComponent !== null) {
    // @ts-ignore
    pageState.scrollComponent.scrollTo({ top: 0 });
  }
};

export const toggleDidScrolled = (isScrolled: boolean) => {
  pageState.didScrolled = isScrolled;
};

export const setBreakpoint = (width?: number) => {
  if (typeof width === 'undefined') {
    return;
  }
  breakpointsList.some(key => {
    const toStop = width < customBreakpoints[key];
    if (toStop) {
      pageState.currBreakpoint = key;
    }
    return toStop;
  });
};

export const toggleModal = () => (pageState.isModalShown = !pageState.isModalShown);
