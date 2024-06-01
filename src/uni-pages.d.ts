/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/index" |
       "/pages/addData" |
       "/pages/gpt" |
       "/pages/hi" |
       "/pages/myQRCode" |
       "/pages/scanQRCode" |
       "/pages/user" |
       "/pages/visual";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
