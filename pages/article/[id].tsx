import React, { useEffect } from "react";
import { NextPage } from "next";
import styles from "./index.module.scss";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { getTargetArticle } from "../../utils/blog";

interface AricleType {
  id?: number;
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
    <div className={styles.article_wrapper}>
      <Layout>
        <ReactMarkdown source={props.content.content} escapeHtml={false} />
      </Layout>
    </div>
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const content = getTargetArticle(id as string);
  return {
    content,
  };
};

export default Article;
