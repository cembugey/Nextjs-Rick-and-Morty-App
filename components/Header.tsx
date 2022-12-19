import Image from "next/image";
import { useRouter } from "next/router";
import headerStyles from "../styles/Header.module.scss";

const Header = () => {
  const router = useRouter();

  return (
    <div className={headerStyles.header}>
      {router.route !== "/" && (
        <span
          style={{ position: "absolute", left: "15px" }}
          onClick={() => router.back()}
        >
          <h3> &rarr;</h3>
        </span>
      )}
      <Image
        src="/rick-and-morty-logo.png"
        alt="Rick and Morty Logo"
        priority
        width={200}
        height={50}
      />
    </div>
  );
};

export default Header;
