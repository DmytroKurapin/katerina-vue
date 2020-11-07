import Vue from 'vue';
import LazyLoadDirective from '@/directives/LazyLoadDirective';
import ResizeDirective from '@/directives/ResizeDirective';

Vue.directive('lazyload', LazyLoadDirective);
Vue.directive('resize', ResizeDirective);
