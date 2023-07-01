import { Pagination } from "antd";

interface propTypes {
  page: number;
  pageSize?: number;
  total?: number;
  setPage: Function;
}

const Paginator = ({ page, pageSize = 12, total = 12, setPage }: propTypes) => {
  const changePage = (pageNum: number) => {
    setPage(pageNum);
  };
  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      total={total}
      onChange={changePage}
    ></Pagination>
  );
};

export default Paginator;
