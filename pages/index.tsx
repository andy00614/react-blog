import Layout from "../components/Layout";
import List from "../components/List";
import { NextPage } from "next";
import s from "./index.module.scss";
import { getHomeList } from "../utils/blog";

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
        <section>
          Everybody wants to be a hero, but nobody wants to start from zero...
        </section>
        <List list={props.list} />
      </Layout>
    </div>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const list = getHomeList();
  return {
    list,
  };
};
export default HomePage;
