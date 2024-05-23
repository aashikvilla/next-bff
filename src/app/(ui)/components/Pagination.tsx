"use client";
export interface IPagination {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  maxPages?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  maxPages = 5,
}: IPagination) => {
  const handlePageChange = (page: number) => {
    if (page === currentPage || page > totalPages || page <= 0) return;
    setCurrentPage(page);
  };

  const getPageNumbers = (
    currentPage: number,
    totalPages: number,
    maxPages: number
  ): Array<number> => {
    let pageNumbers = [];
    if (currentPage < 1 || totalPages < 1 || maxPages < 1) return [];
    if (totalPages <= maxPages) {
      pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      let startPage = 1;
      let endPage = maxPages;
      if (currentPage > Math.floor(maxPages / 2)) {
        startPage = currentPage - Math.floor(maxPages / 2);
        endPage = currentPage + Math.floor(maxPages / 2);
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxPages + 1;
        }
      }
      pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => index + startPage
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6 sm:justify-between">
      <div className="hidden sm:flex">
        <p className="text-sm text-pepper-400">
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </p>
      </div>
      <div>
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1"
        >
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            className={`
                relative inline-flex items-center
                text-sm rounded-sm h-9 min-h-0 leading-none px-2 py-2 font-semibold
                hover:bg-gray-50 hover:shadow-md hover:opacity-95 active:shadow-lg active:opacity-90 
                text-pepper-400 border-solid border-[1px] border-salt-600
                disabled:opacity-25 disabled:cursor-not-allowed
              `}
            aria-label="Previous Page"
            disabled={currentPage === 1}
          >
            {"<"}
            <span className="sr-only">Previous</span>
          </button>
          {getPageNumbers(currentPage, totalPages, maxPages).map((page) => {
            return (
              <button
                type="button"
                key={page}
                aria-current="page"
                className={`
                    text-sm rounded-sm h-9 min-h-0 leading-none px-4 py-2 font-semibold
                    hover:bg-gray-50 hover:shadow-md hover:opacity-95 active:shadow-lg active:opacity-90 
                    text-pepper-400 border-solid border-[1px] border-salt-600 
                    ${
                      page === currentPage &&
                      "bg-blue-200 bg-plum-600 hover:bg-plum-600 ring-plum-600 text-salt-100"
                    }
                  `}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            className={`
                relative inline-flex items-center
                text-sm rounded-sm h-9 min-h-0 leading-none px-2 py-2 font-semibold
                hover:bg-gray-50 hover:shadow-md hover:opacity-95 active:shadow-lg active:opacity-90 
                text-pepper-400 border-solid border-[1px] border-salt-600
                disabled:opacity-25 disabled:cursor-not-allowed
              `}
            aria-label="Next Page"
            disabled={currentPage === totalPages}
          >
            {">"}
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
