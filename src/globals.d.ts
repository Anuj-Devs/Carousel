// Declare a global augmentation for the Window interface to include Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export {};