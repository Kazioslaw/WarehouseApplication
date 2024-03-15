import { Injectable } from '@angular/core';

export interface ToastInfo {
  header?: string;
  body: string;
  delay?: number;
  className: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastInfo[] = [];

  show(body: string, className: string) {
    this.toasts.push({ body, className });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
