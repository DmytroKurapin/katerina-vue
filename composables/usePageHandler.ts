import customBreakpoints from '@/constants/customBreakpoints';
import { computed, reactive, toRef } from '@nuxtjs/composition-api';

const breakpointsList = [...Object.keys(customBreakpoints)] as const;
interface IPageState {
  scrollComponent: string | null;
  didScrolled: boolean;
  currBreakpoint: typeof breakpointsList[number] | undefined;
}

const pageState = reactive<IPageState>({
  scrollComponent: null,
  didScrolled: false,
  currBreakpoint: undefined
});

export const mainSection = toRef(pageState, 'scrollComponent');
export const didScrolled$ = computed(() => pageState.didScrolled);
export const currBreakpoint$ = computed(() => pageState.currBreakpoint);

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

export const setBreakpoint = (width: number) => {
  Object.entries(customBreakpoints).some(([key, val]) => {
    const toStop = width < val;
    if (toStop) {
      pageState.currBreakpoint = key;
    }
    return toStop;
  });
};
