import s from "./index.module.scss";
import Layout from "../components/Layout";
import List from "../components/List";
import { NextPage } from "next";

export interface List {
  title: string;
  time: number;
  articleId: string;
}
export interface Iprops {
  list: Array<List>;
}
const HomePage: NextPage<Iprops> = (props) => {
  return (
    <Layout>
      <List list={props.list} />
    </Layout>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const list = [
    { title: "first", time: 1585563975245, articleId: "1585563975245" },
    { title: "second", time: 1585564006842, articleId: "1585564006842" },
  ];
  return {
    list,
  };
};
export default HomePage;
