export default {
  // called when the bound element has been inserted into its parent node
  inserted: (el: HTMLElement, binding: Object, vnode: any) => {
    let elHeight = el.clientHeight;
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach(entry => {
        const entryHeight = entry.contentRect.height;
        if (elHeight !== entryHeight) {
          elHeight = entry.contentRect.height;
          vnode.child.$emit('resize', elHeight);
        }
      });
    });

    observer.observe(el);
    // emit init height
    vnode.child.$emit('init-size', elHeight);
  }
};
