import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex space-x-2 items-center">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src={
              "https://www.shareicon.net/download/128x128/2016/07/13/606936_dropbox_2048x2048.png"
            }
            className="invert"
            height={50}
            width={50}
            alt="CloudSave"
          />
        </div>
        <h1 className="font-bold text-xl">CloudSave</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <Button>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
