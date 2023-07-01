import { Skeleton } from "antd";
import styles from "./styles.module.css";

interface propTypes {
  loading: boolean;
}

const LoadingProducts = ({ loading }: propTypes) => {
  return <Skeleton className={styles.skeleton} loading={loading} active />;
};

export default LoadingProducts;
