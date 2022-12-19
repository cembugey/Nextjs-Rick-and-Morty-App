import Meta from "./Meta";
import Header from "./Header";
import layoutStyles from "../styles/Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <main className={layoutStyles.main}>
        <Header />
        {children}
      </main>
    </>
  );
};

export default Layout;
