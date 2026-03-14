import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'client-pagination',
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})

export class PaginationComponent {
  //Services and dependencies
  route = inject(Router);

  //Inputs
  currentPage = input<number>(1);
  pages = input<number>(0);

  //Icons
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  //Signals
  activePage = linkedSignal(this.currentPage);

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  //Methods
  goNext(){
    if(this.activePage() < this.pages()){
      this.route.navigate([], { queryParams: { page: this.activePage() + 1 } });
    }
  }
  goPrev(){
    if(this.activePage() > 1){
      this.route.navigate([], { queryParams: { page: this.activePage() - 1 } });
    }
  }
}
