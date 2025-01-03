<template>
  <div class="pagination-container">
    <!-- Mobile Pagination -->
    <div class="pagination-mobile">
      <button class="pagination-button">上一頁</button>
      <button class="pagination-button ml-3">下一頁</button>
    </div>

    <!-- Desktop Pagination -->
    <div class="pagination-desktop">
      <div>
        <p class="pagination-info">
          顯示第 <span class="pagination-info-number">1</span> 到
          <span class="pagination-info-number">10</span> 筆，共
          <span class="pagination-info-number">20</span> 筆資料
        </p>
      </div>
      <div class="pagination-nav-wrapper">
        <nav class="pagination-nav" aria-label="Pagination">
          <button class="pagination-nav-arrow pagination-nav-arrow-left">
            <span class="sr-only">上一頁</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <button class="pagination-nav-button">1</button>
          <button class="pagination-nav-button">2</button>
          <button class="pagination-nav-button hidden md:inline-flex">3</button>
          <span class="pagination-ellipsis">...</span>
          <button class="pagination-nav-button hidden md:inline-flex">8</button>
          <button class="pagination-nav-button">9</button>
          <button class="pagination-nav-button">10</button>
          <button class="pagination-nav-arrow pagination-nav-arrow-right">
            <span class="sr-only">下一頁</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
      <div class="pagination-right-space"></div>
    </div>
  </div>
</template>
