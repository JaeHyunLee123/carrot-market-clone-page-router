import { useCallback, useEffect, useRef, useState } from "react";

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  const reference = useRef<HTMLDivElement>(null);
  const [isObserving, setIsObserving] = useState(true);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!(reference.current && isObserving)) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(reference.current);
    return () => observer.disconnect();
  }, [reference, options, callback, isObserving]);

  return { reference };
};

export default useIntersect;
