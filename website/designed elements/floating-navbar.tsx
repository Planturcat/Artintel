"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn, NAV_LINKS, scrollToAnchor } from "@/utils";
import { BrainCircuit, LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNavbar from "./mobile-navbar";
import AnimationContainer from "./global/animation-container";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/constants";

const FloatingNavbar = () => {
  const [user, setUser] = useState<boolean>(false);
  const [scroll, setScroll] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage for authentication state
    const authState = localStorage.getItem("isAuthenticated");
    setUser(authState === "true");
  }, []);

  // Handle anchor links on page load
  useEffect(() => {
    if (pathname.includes("#")) {
      const anchor = pathname.split("#")[1];
      if (anchor) {
        scrollToAnchor(anchor);
      }
    }
  }, [pathname]);

  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToAnchor(href.replace("/", ""));
    }
  };

  return (
    <header
      className={cn(
        "fixed top-4 inset-x-0 h-14 w-full z-[99999] select-none px-4 md:px-8 lg:px-12",
      )}
      data-oid="kya_3j-"
    >
      <AnimationContainer
        reverse
        delay={0.1}
        className="size-full"
        data-oid="y77u9_l"
      >
        <div
          className={cn(
            "max-w-5xl mx-auto rounded-full transition-all duration-300 border border-transparent bg-background/60 backdrop-blur-md shadow-lg",
            !scroll && "bg-opacity-0 shadow-none",
          )}
          data-oid="puj6ol2"
        >
          <div
            className="flex items-center justify-between h-14 px-6"
            data-oid="70ik7tm"
          >
            <div className="flex items-center space-x-12" data-oid="3wcotxo">
              <Link href="/" data-oid="4enzayd">
                <div className="flex items-center space-x-2" data-oid="rggm-5j">
                  <img
                    src="/icons/Black Icon.jpg"
                    alt="Artintel Logo"
                    className="h-6 w-6"
                    data-oid="ecsj5pj"
                  />

                  <span
                    className="text-lg font-bold font-heading !leading-none"
                    data-oid="pj2si.t"
                  >
                    {APP_NAME}
                  </span>
                </div>
              </Link>

              <NavigationMenu className="hidden lg:flex" data-oid="sw4oojv">
                <NavigationMenuList data-oid="kk-gim8">
                  {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.title} data-oid="7wfezj8">
                      {link.menu ? (
                        <>
                          <NavigationMenuTrigger data-oid="i5bx32k">
                            {link.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent data-oid="k9wxz-m">
                            <ul
                              className={cn(
                                "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                link.title === "Features"
                                  ? "lg:grid-cols-[.75fr_1fr]"
                                  : "lg:grid-cols-2",
                              )}
                              data-oid="a_sc.dl"
                            >
                              {link.title === "Features" && (
                                <li
                                  className="row-span-4 pr-2 relative rounded-lg overflow-hidden"
                                  data-oid="a03a4u1"
                                >
                                  <div
                                    className="absolute inset-0 !z-10 h-full w-[calc(100%-10px)] bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]"
                                    data-oid="-_3ic24"
                                  ></div>
                                  <NavigationMenuLink
                                    asChild
                                    className="z-20 relative"
                                    data-oid="lpd:2c3"
                                  >
                                    <Link
                                      href="/features"
                                      className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                      data-oid="sdd95ug"
                                    >
                                      <h6
                                        className="mb-2 mt-4 text-lg font-medium"
                                        data-oid="j484..u"
                                      >
                                        All Features
                                      </h6>
                                      <p
                                        className="text-sm leading-tight text-muted-foreground"
                                        data-oid="jw6why-"
                                      >
                                        Model selection, fine-tuning, deployment
                                        and more.
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              )}
                              {link.menu.map((menuItem) => (
                                <ListItem
                                  key={menuItem.title}
                                  title={menuItem.title}
                                  href={menuItem.href}
                                  icon={menuItem.icon}
                                  onClick={(e) =>
                                    handleAnchorClick(e, menuItem.href)
                                  }
                                  data-oid="9dwp-gr"
                                >
                                  {menuItem.tagline}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          legacyBehavior
                          passHref
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          data-oid="wfgorjp"
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            data-oid="p213:7l"
                          >
                            {link.title}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="hidden lg:flex items-center" data-oid="jgu53fv">
              {user ? (
                <div className="flex items-center" data-oid="g.qi9b4">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm" })}
                    data-oid="w-31hvr"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-x-4" data-oid="hwsws7i">
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    data-oid="bt8ng88"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({ size: "sm" })}
                    data-oid="f.1.5ho"
                  >
                    Try For Free
                    <img
                      src="/icons/Black Icon.jpg"
                      alt="Artintel Logo"
                      className="size-3.5 ml-1.5"
                      data-oid="6wk8.27"
                    />
                  </Link>
                </div>
              )}
            </div>

            <MobileNavbar data-oid="v96ot_d" />
          </div>
        </div>
      </AnimationContainer>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon: LucideIcon;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
>(
  (
    { className, title, href, icon: Icon, children, onClick, ...props },
    ref,
  ) => {
    return (
      <li data-oid=".8x3ada">
        <NavigationMenuLink asChild data-oid="d3f2e8b">
          <Link
            href={href!}
            ref={ref}
            onClick={onClick}
            className={cn(
              "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
            data-oid="a2jjmk9"
          >
            <div
              className="flex items-center space-x-2 text-neutral-300"
              data-oid="l-1sn_g"
            >
              <Icon className="h-4 w-4" data-oid="4pu:vmu" />
              <h6
                className="text-sm font-medium !leading-none"
                data-oid="2exntmu"
              >
                {title}
              </h6>
            </div>
            <p
              title={children! as string}
              className="line-clamp-1 text-sm leading-snug text-muted-foreground"
              data-oid="r0x3cex"
            >
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default FloatingNavbar;
