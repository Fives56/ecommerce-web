import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);

  /**
   * Show a toast message
   * @param message Message to show
   * @param type Type of message
   */
  show(message: string, type: ToastType = 'info'): void {
    const id = Date.now();

    this.toasts.update(toasts => [...toasts, { id, message, type }]);
    setTimeout(() => {
      this.remove(id);
    }, 5000);
  }

  /**
   * Show a success toast message
   * @param message Message to show
   */
  success(message: string): void {
    this.show(message, 'success');
  }

  /**
   * Show an error toast message
   * @param message Message to show
   */
  error(message: string): void {
    this.show(message, 'error');
  }

  /**
   * Show an info toast message
   * @param message Message to show
   */
  info(message: string): void {
    this.show(message, 'info');
  }

  /**
   * Remove a toast message by id
   * @param id ID of the message to remove
   */
  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Get all toast messages
   * @returns Readonly array of toast messages
   */
  getToasts() {
    return this.toasts.asReadonly();
  }
}