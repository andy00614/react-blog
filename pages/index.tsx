import Layout from "../components/Layout";
import List from "../components/List";
import { NextPage } from "next";
import s from "./index.module.scss";
import axios from "axios";
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
        <List list={props.list} />
      </Layout>
    </div>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const data = await axios.get("http://localhost:7012/getList");
  // const list = data.data.data;
  const list = getHomeList();
  return {
    list,
  };
};
export default HomePage;
