export default {
  // called when the bound element has been inserted into its parent node
  inserted: (el: HTMLElement) => {
    // func responsible for replacing the src value with data-url
    function loadImage() {
      const imageElement: HTMLImageElement | null = el.querySelector('img');
      if (!imageElement) {
        return;
      }
      imageElement.addEventListener('load', () => {
        setTimeout(() => el.classList.add('loaded'), 100);
      });
      imageElement.addEventListener('error', () => console.log('error'));
      imageElement.src = <string>imageElement.dataset.url;
    }

    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          // unobserve the element once the image is requested (remove it from the observer’s watch list)
          // to prevent the image from being loaded again
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      // threshold - percent of the target’s visibility the observer callback should be executed
      // (0 means as soon as even one pixel is visible and 1 means the whole element must be visible)
      const options = {
        root: null,
        threshold: 1
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      // attach observer to the element
      observer.observe(el);
    }
    if (window.IntersectionObserver) {
      createObserver();
    } else {
      loadImage();
    }
  }
};
