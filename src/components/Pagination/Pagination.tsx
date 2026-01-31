import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css'
    
    interface PaginationProps {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
}
    
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <ReactPaginate
          containerClassName={css.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onPageChange(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            forcePage={currentPage - 1}
            activeClassName={css.active}
        />
    );
}   