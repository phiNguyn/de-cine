import { useLayoutEffect } from "react";

const useScrollToTop = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Chạy một lần khi component mount
};

export default useScrollToTop;
