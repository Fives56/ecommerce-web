// components/toast/toast.component.ts
import { Component, input, output } from '@angular/core';
import { Toast } from '../../../core/interfaces/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  toast = input<Toast>();
  close = output();

  /**
   * Get the toast classes based on the toast type
   * @returns Toast classes
   */
  getToastClasses(): string {
    switch (this.toast()?.type) {
      case 'success': return 'bg-green-50 border border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border border-red-200 text-red-800';
      default: return 'bg-blue-50 border border-blue-200 text-blue-800';
    }
  }

  /**
   * Get the icon classes based on the toast type
   * @returns icon classes
   */
  getIconClasses(): string {
    switch (this.toast()?.type) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  }
}