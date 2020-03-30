import React from "react";
import s from "./index.module.scss";
import { useRouter } from "next/router";

interface Iprops {}
const Layout: React.FC<Iprops> = (props) => {
  const router = useRouter();

  const comeHome = () => {
    router.push("/");
  };
  return (
    <div className={s.container}>
      <main className={s.inner}>
        <header className={s.header}>
          <h1 className={s.name} onClick={comeHome}>
            Andy-Beat 🎶
          </h1>
        </header>
        <div className={s.content}>{props.children}</div>
        <footer>
          <a href="mailto:andy00614@163.com">email</a>
          <span> • </span>
          <a href="https://github.com/andy00614">github</a>
          <span> • </span>
          <a href="https://stackoverflow.com/users/10517346/andy">
            stack overflow{" "}
          </a>
        </footer>
      </main>
    </div>
  );
};
export default Layout;
