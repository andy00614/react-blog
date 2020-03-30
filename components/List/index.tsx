import React from "react";
import s from "./index.module.scss";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { List as ListType } from "../../pages";

const List: NextPage<{ list: ListType[] }> = (props) => {
  const router = useRouter();
  const { list } = props;

  const turnArticlePage = (id: string) => {
    router.push(`/article/${id}`);
  };

  return (
    <div className={s.container}>
      {list.map((item) => (
        <div key={item.title} className={s.article}>
          <div className={s.time}>{dayjs(item.time).format("YYYY/MM/DD")}</div>
          <div
            className={s.title}
            onClick={() => turnArticlePage(item.articleId)}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
