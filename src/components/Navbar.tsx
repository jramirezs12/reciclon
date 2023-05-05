import { TbMenu2, TbX, TbLogout, TbLogin } from "react-icons/tb";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { auth, signInPopup } from "@/lib/firebase";
import { useAtom } from "jotai";
import { authAtom } from "@/store/auth";
import { toast } from "sonner";

const links = [
  {
    label: "Como reciclar?",
    href: "/how",
  },
  {
    label: "Puntos Cercanos De Reciclaje",
    href: "/map",
  },
  {
    label: "Tabla De Puntuacion",
    href: "/scoreboard",
  },
  {
    label: "Acerca De",
    href: "/about",
  },
];

export const Navbar = ({ fontFamily }: { fontFamily: string }) => {
  const [isOpen, setOpen] = useState(false);
  const [authCache] = useAtom(authAtom);
  const parent = useRef(null);

  const handleLogout = async () => {
    await auth.signOut();
    toast.error("You have been logged out.");
  };

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  return (
    <nav
      ref={parent}
      className={clsx(
        fontFamily,
        "container mx-auto mb-4 flex flex-col gap-4 rounded-lg bg-gray-100/90 px-4 py-2 ring-1 ring-white/10 backdrop-blur-md lg:my-6 lg:w-11/12 lg:px-0 lg:py-0"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image
              priority
              src="/logo.png"
              alt="SDG 12"
              width="100"
              height="55"
              className="rounded-lg lg:rounded-none lg:rounded-l-lg"
              draggable="false"
              style={{
                width: "100px",
                height: "55px",
              }}
            />
          </Link>

          <Links isAdmin={authCache.isAdmin} className="hidden lg:block" />
        </div>

        <div
          title="User Profile"
          className="no-highlight flex flex-col p-2 text-black lg:mr-4"
        >
          {!authCache.user ? (
            <LoginButton className="hidden lg:flex" signInPopup={signInPopup} />
          ) : (
            <NavbarUser
              score={authCache.userDb?.score}
              displayName={authCache.user.displayName}
              photoUrl={authCache.user.photoURL}
              handleLogout={handleLogout}
            />
          )}

          {!isOpen && (
            <button
              type="button"
              aria-label="Open menu button"
              title="Open menu"
              onClick={() => setOpen(true)}
            >
              <TbMenu2 size={24} className="lg:hidden" />
            </button>
          )}

          {isOpen && (
            <button
              type="button"
              aria-label="Close menu button"
              title="Close menu"
              onClick={() => setOpen(false)}
            >
              <TbX size={24} className="lg:hidden" />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <>
          <Links isAdmin={authCache.isAdmin} />

          {!authCache.user ? (
            <LoginButton signInPopup={signInPopup} />
          ) : (
            <NavbarUser
              type="mobile"
              score={authCache.userDb?.score}
              displayName={authCache.user.displayName}
              photoUrl={authCache.user.photoURL}
              handleLogout={handleLogout}
            />
          )}
        </>
      )}
    </nav>
  );
};

const Links = ({
  className,
  isAdmin,
}: {
  className?: string;
  isAdmin?: boolean;
}) => {
  const getLinks = useMemo(() => {
    if (isAdmin) return [...links, { label: "Admin", href: "/admin" }];
    return links;
  }, [isAdmin]);

  return (
    <div
      className={clsx(
        "flex flex-col space-y-2 lg:flex-row lg:space-x-6 lg:space-y-0",
        className
      )}
    >
      {getLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="select-none rounded-lg bg-black/5 px-4 py-2 font-medium text-black/50 transition-colors hover:text-black lg:bg-transparent lg:hover:bg-transparent"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const LoginButton = ({
  signInPopup,
  className,
}: {
  signInPopup: any;
  className?: string;
}) => (
  <button
    type="button"
    className={clsx(
      "mb-3 flex items-center justify-center space-x-2 font-medium lg:mb-0 lg:justify-start",
      className
    )}
    title="Sign in"
    aria-label="Sign in button"
    onClick={() => signInPopup()}
  >
    <span className="text-sm">Sign in</span>
    <TbLogin size={20} />
  </button>
);

const NavbarUser = ({
  type = "desktop",
  score,
  displayName,
  photoUrl,
  handleLogout,
}: {
  type?: "desktop" | "mobile";
  displayName: string | null;
  score?: number;
  photoUrl: string | null;
  handleLogout: any;
}) => (
  <div
    className={clsx(
      "items-center space-x-2",
      type === "mobile"
        ? "mb-3 flex justify-between rounded-lg"
        : "hidden lg:flex"
    )}
  >
    <div className="flex flex-row-reverse items-center gap-2 lg:flex-row">
      {Boolean(score) && (
        <span
          className="grid place-content-center rounded-full bg-green-600/20 px-2 text-sm text-green-600"
          title="Recycling score"
        >
          {score}
        </span>
      )}

      <span className="block font-medium">{displayName}</span>

      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt="User profile picture"
          width="30"
          height="30"
          className={type === "mobile" ? "rounded-lg" : "rounded-full"}
          referrerPolicy="no-referrer"
          draggable="false"
        />
      )}
    </div>

    <button
      type="button"
      title="Logout"
      className={clsx(
        "bg-black/5 p-2 text-black/70 transition-colors hover:bg-red-600 hover:text-white",
        type === "mobile" ? "rounded-lg" : "rounded-full"
      )}
      onClick={handleLogout}
    >
      <TbLogout />
    </button>
  </div>
);
