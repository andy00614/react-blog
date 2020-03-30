import Layout from "../components/Layout";
import List from "../components/List";
import { NextPage } from "next";
import s from "./index.module.scss";

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
    <div className={s.container}>
      <Layout>
        <List list={props.list} />
      </Layout>
    </div>
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
