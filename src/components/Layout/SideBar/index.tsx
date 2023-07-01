import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  DesktopOutlined,
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const categoriesItems: MenuProps["items"] = [
  getItem(
    <Title level={5}>Browse Categoris</Title>,
    "categories",
    <></>,
    [
      getItem(
        <Link to={"/products/?category=auzmqvhtuiclpmv"}>Hoodies</Link>,
        "hoodies",
        <ShoppingCartOutlined />
      ),
      getItem(
        <Link to={"/products/?category=9t36m75pv0fdcxp"}>T-Shirts</Link>,
        "t-shirts",
        <SmileOutlined />
      ),
      getItem(
        <Link to={"/products/?category=1g95arsqmyaf2kx"}>Top and Shorts</Link>,
        "top-and-shorts",
        <DesktopOutlined />
      ),
      getItem(
        <Link to={"/products/?category=ecqgcw7kquifdwo"}>
          Shoes
        </Link>,
        "shoes",
        <HomeOutlined />
      ),
    ],
    "group"
  ),
  { type: "divider" },
];

const SideBar = () => {
  let [searchParams] = useSearchParams();
  let category = searchParams.get("category") ?? "";
  const filterSortItems: MenuProps["items"] = [
    getItem(
      <Title level={5}>Explore by</Title>,
      "sort",
      <></>,
      [
        getItem(
          <Link to={`/products/?category=${category}&sort=-created`}>
            Newest
          </Link>,
          "-created",
          <CalendarOutlined />
        ),
        getItem(
          <Link to={`/products/?category=${category}&sort=+price`}>
            price: low to high
          </Link>,
          "+price",
          <PlusCircleOutlined />
        ),
        getItem(
          <Link to={`/products/?category=${category}&sort=-price`}>
            price: high to low
          </Link>,
          "-price",
          <MinusCircleOutlined />
        ),
      ],
      "group"
    ),
  ];

  return (
    <Menu
      className={styles.sidbar}
      defaultOpenKeys={["sort", "categories"]}
      mode='inline'
      items={[...categoriesItems, ...filterSortItems]}
    />
  );
};

export default SideBar;
