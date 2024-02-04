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

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  
}
