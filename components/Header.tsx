import Image from "next/image";
import { useRouter } from "next/router";
import headerStyles from "../styles/Header.module.scss";

const Header = () => {
  const router = useRouter();

  return (
    <div className={headerStyles.header}>
      {router.route !== "/" && (
        <span
          style={{ position: "absolute", left: "15px", cursor: "pointer" }}
          onClick={() => router.back()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
              fill="currentColor"
            />
          </svg>
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
