/**
 * 生成防抖函数
 * @param func
 * @param delay
 */
export const debounce = function<T extends (...args: any[]) => any>(func: T, delay: number = 1000): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: ThisParameterType<T>,...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

