export default {
  // called when the bound element has been inserted into its parent node
  inserted: (el: HTMLElement, binding: Object, vnode: any) => {
    let elHeight = el.clientHeight;
    let elWidth = el.clientWidth;
    // @ts-ignore
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach(entry => {
        const entryHeight = entry.contentRect.height;
        const entryWidth = entry.contentRect.width;
        const emitObj = {};
        if (elHeight !== entryHeight) {
          elHeight = entryHeight;
          Object.assign(emitObj, { height: elHeight });
        }
        if (elWidth !== entryWidth) {
          elWidth = entryWidth;
          Object.assign(emitObj, { width: elWidth });
        }
        if (Object.keys(emitObj).length > 0) {
          vnode.child.$emit('resize', emitObj);
        }
      });
    });

    observer.observe(el);
    // emit init height
    vnode.child.$emit('init-size', { height: elHeight, width: elWidth });
  }
};
