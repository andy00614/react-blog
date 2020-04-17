import React from "react";
import { NextPage } from "next";
import styles from "./index.module.scss";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

interface AricleType {
  id: number;
  time: number;
  title: string;
  articleId: string;
  content: string;
}

interface Iprops {
  content: AricleType;
}
const Article: NextPage<Iprops> = (props) => {
  return (
    <Layout>
      <ReactMarkdown source={props.content.content} escapeHtml={true} />
    </Layout>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await Axios.get(`http://localhost:7012/searchContent?id=${id}`);
  const content = res.data.data;
  return {
    content,
  };
};

export default Article;
