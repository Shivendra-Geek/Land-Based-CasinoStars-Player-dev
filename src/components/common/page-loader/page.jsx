import style from "./page-loader.module.scss";

const PageLoader = () => {
     return <main className={style.page_loader}>
        <div className={style.loader}></div>
     </main>;
};

export default PageLoader;
