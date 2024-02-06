import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();
  currentPage: number = 1;

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.currentPage = newPage;
      this.pageChange.emit(newPage);
    }
  }

  visiblePages(): number[] {
    const totalPages = this.totalPages();
    const maxVisiblePages = 5; // Set the maximum number of visible pages
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, this.currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust the startPage and endPage if the endPage is less than maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
