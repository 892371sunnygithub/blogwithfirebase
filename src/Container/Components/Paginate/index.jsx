import React from "react";
import Pagination from "react-bootstrap/Pagination";
const Paginate = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 2;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    }
    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Ellipsis
          key={0}
          onClick={() => handlePageClick(startPage - 1)}
        />
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <Pagination.Ellipsis
          key={totalPages + 1}
          onClick={() => handlePageClick(endPage + 1)}
        />
      );
    }

    return pageNumbers;
  };
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(1)} />
      <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)}>
        Previous
      </Pagination.Prev>
      {renderPageNumbers()}
      <Pagination.Next onClick={() => handlePageClick(currentPage + 1)}>
        Next
      </Pagination.Next>
      <Pagination.Last onClick={() => handlePageClick(totalPages)} />
    </Pagination>
  );
};

export default Paginate;
