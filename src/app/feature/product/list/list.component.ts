import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { CoreComponent } from '../../../shared/components/core/core.component';
import { finalize, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [ProductCardComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './list.component.html',
})
export class ListComponent extends CoreComponent implements OnInit {
  private _productService = inject(ProductService);
  private _fb = inject(FormBuilder);

  private scrollThreshold = 300;
  showBackToTop = signal(false);
  isLoading = signal(true);

  filteredProducts = signal<Product[]>([]);
  filtersForm: FormGroup = this._fb.group({
    search: [''],
    minPrice: [null, Validators.min(0)],
    maxPrice: [null, Validators.min(0)],
  }, { validators: this.priceRangeValidator.bind(this) });
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.setupFormListeners();
    this.setupScrollListener();
  }

  /**
   * Load products from the service
   */
  private loadProducts(): void {
    this._productService.all()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((data: any) => {
        this.products = data;
        this.filteredProducts.set(data);
      });
  }

  /**
   * Setup form value change listeners with debounce
   */
  private setupFormListeners(): void {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.filtersForm.valid) {
          this.applyFilters();
        }
      });
  }

  /**
   * Apply filters to products based on form values
   */
  private applyFilters(): void {
    const filters = this.filtersForm.value;
    let filtered = this.products;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.minPrice !== null && filters.minPrice !== '') {
      filtered = filtered.filter(product =>
        product.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== null && filters.maxPrice !== '') {
      filtered = filtered.filter(product =>
        product.price <= Number(filters.maxPrice)
      );
    }

    this.filteredProducts.set(filtered);
  }

  /**
   * Reset all filters to their default values
   */
  clearFilters(): void {
    this.filtersForm.reset({
      search: '',
      minPrice: null,
      maxPrice: null
    });
  }

  /**
   * Custom validator to ensure max price is not less than min price
   */
  private priceRangeValidator(group: AbstractControl): ValidationErrors | null {
    const minPrice = group.get('minPrice')?.value;
    const maxPrice = group.get('maxPrice')?.value;

    if (minPrice !== null && maxPrice !== null) {
      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (min > max) {
        return { priceRangeInvalid: true };
      }
    }

    return null;
  }

  /**
   * Setup scroll listener to show/hide back to top button
   */
  private setupScrollListener(): void {
    const productsContainer = document.querySelector('.overflow-y-auto');

    if (productsContainer) {
      productsContainer.addEventListener('scroll', () => {
        this.showBackToTop.set(productsContainer.scrollTop > this.scrollThreshold);
      });
    }

    window.addEventListener('scroll', () => {
      this.showBackToTop.set(window.scrollY > this.scrollThreshold);
    });
  }

  /**
   * Scroll to the top of the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}