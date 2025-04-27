"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, NAV_LINKS, scrollToAnchor } from "@/utils";
import { BrainCircuit, LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for authentication state
    const authState = localStorage.getItem("isAuthenticated");
    setIsSignedIn(authState === "true");
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    setIsSignedIn(false);
    router.push("/");
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToAnchor(href.replace("/", ""));
      handleClose();
    }
  };

  return (
    <div className="flex lg:hidden items-center justify-end" data-oid="_jsv0so">
      <Sheet open={isOpen} onOpenChange={setIsOpen} data-oid="bbaw90q">
        <SheetTrigger asChild data-oid="qce8l35">
          <Button size="icon" variant="ghost" data-oid="31ne3iy">
            <Menu className="w-5 h-5" data-oid="b5:b8ok" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-screen" data-oid=":7_sxwx">
          <SheetClose
            asChild
            className="absolute top-3 right-5 bg-background z-20 flex items-center justify-center"
            data-oid="4b3epky"
          >
            <Button
              size="icon"
              variant="ghost"
              className="text-neutral-600"
              data-oid="4iirgn7"
            >
              <X className="w-5 h-5" data-oid="ah0i98g" />
            </Button>
          </SheetClose>
          <div
            className="flex flex-col items-start w-full py-2 mt-10"
            data-oid="h-9ycs:"
          >
            <div
              className="flex items-center justify-evenly w-full space-x-2"
              data-oid="-icy9ip"
            >
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                  data-oid="-wg6tr."
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                    data-oid="7coc:ib"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className={buttonVariants({ className: "w-full" })}
                    data-oid="b0df0cd"
                  >
                    Try For Free
                    <img
                      src="/icons/Black Icon.jpg"
                      alt="Artintel Logo"
                      className="size-3.5 ml-1.5"
                      data-oid="9g79vwq"
                    />
                  </Link>
                </>
              )}
            </div>
            <ul
              className="flex flex-col items-start w-full mt-6"
              data-oid="i0yr:c5"
            >
              <Accordion
                type="single"
                collapsible
                className="!w-full"
                data-oid="3zkm3hd"
              >
                {NAV_LINKS.map((link) => (
                  <AccordionItem
                    key={link.title}
                    value={link.title}
                    className="last:border-none"
                    data-oid="5g-78m-"
                  >
                    {link.menu ? (
                      <>
                        <AccordionTrigger data-oid="q-myldj">
                          {link.title}
                        </AccordionTrigger>
                        <AccordionContent data-oid="g..f1gl">
                          <ul className={cn("w-full")} data-oid="b7k3w:p">
                            {link.menu.map((menuItem) => (
                              <ListItem
                                key={menuItem.title}
                                title={menuItem.title}
                                href={menuItem.href}
                                icon={menuItem.icon}
                                onClick={(e) =>
                                  handleAnchorClick(e, menuItem.href)
                                }
                                data-oid="m2x4wh3"
                              >
                                {menuItem.tagline}
                              </ListItem>
                            ))}
                          </ul>
                        </AccordionContent>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href!)}
                        className="flex items-center w-full py-4 font-medium text-muted-foreground hover:text-foreground"
                        data-oid="53j5fkp"
                      >
                        <span data-oid=":sw:y2y">{link.title}</span>
                      </Link>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
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
      <li data-oid="n8_ok75">
        <Link
          href={href!}
          ref={ref}
          onClick={onClick}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
          data-oid="e6:u_u4"
        >
          <div
            className="flex items-center space-x-2 text-foreground"
            data-oid="8l2:.._"
          >
            <Icon className="h-4 w-4" data-oid="w7orly:" />
            <h6 className="text-sm !leading-none" data-oid="quognqg">
              {title}
            </h6>
          </div>
          <p
            title={children! as string}
            className="line-clamp-1 text-sm leading-snug text-muted-foreground"
            data-oid="cirp84_"
          >
            {children}
          </p>
        </Link>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default MobileNavbar;
