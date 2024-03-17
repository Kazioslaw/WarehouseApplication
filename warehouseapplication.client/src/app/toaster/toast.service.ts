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
  timeouts: Map<ToastInfo, any> = new Map();

  show(body: string, className: string, delay: number = 3000) {
    const toast: ToastInfo = { body, className, delay };
    this.toasts.push(toast);
    this.timeouts.set(
      toast,
      setTimeout(() => this.remove(toast), delay)
    );
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
    clearTimeout(this.timeouts.get(toast));
    this.timeouts.delete(toast);
  }
}
