import { useEffect } from 'react';

export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = Array.from(document.querySelectorAll('[data-reveal], [data-reveal-group] > *'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => {
        el.dataset.revealState = 'visible';
      });
      return;
    }

    elements.forEach((el) => {
      el.dataset.revealState = 'pending';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealState = 'visible';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, dependencies);
}
