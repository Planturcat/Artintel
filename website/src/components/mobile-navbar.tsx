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
import { cn } from "@/lib";
import { NAV_LINKS } from "@/utils/nav-links";
import { scrollToAnchor } from "@/utils";
import { BrainCircuit, LucideIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const MobileNavbar = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = async () => {
    await signOut();
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
    <div className="flex lg:hidden items-center justify-end" data-oid="ag79p2z">
      <Sheet open={isOpen} onOpenChange={setIsOpen} data-oid="y.gkw38">
        <SheetTrigger asChild data-oid="ort9ei2">
          <Button size="icon" variant="ghost" data-oid="j1-9v67">
            <Menu className="w-5 h-5" data-oid="z3xg4wi" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-screen" data-oid="xgxdp-y">
          <SheetClose
            asChild
            className="absolute top-3 right-5 bg-background z-20 flex items-center justify-center"
            data-oid="5y6v17x"
          >
            <Button
              size="icon"
              variant="ghost"
              className="text-neutral-600"
              data-oid="e489uy_"
            >
              <X className="w-5 h-5" data-oid="rnjkl1." />
            </Button>
          </SheetClose>
          <div
            className="flex flex-col items-start w-full py-2 mt-10"
            data-oid="-e3:n5q"
          >
            <div
              className="flex items-center justify-evenly w-full space-x-2"
              data-oid=":bt9q7i"
            >
              {user ? (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                  data-oid="kxuybkj"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                    data-oid=".-weihy"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className={buttonVariants({ className: "w-full" })}
                    data-oid="wi.1hy2"
                  >
                    Try For Free
                  </Link>
                </>
              )}
            </div>
            <ul
              className="flex flex-col items-start w-full mt-6"
              data-oid="rteyf7."
            >
              <Accordion
                type="single"
                collapsible
                className="!w-full"
                data-oid="0e-4uhe"
              >
                {NAV_LINKS.map((link) => (
                  <AccordionItem
                    key={link.title}
                    value={link.title}
                    className="last:border-none"
                    data-oid="r7d3soi"
                  >
                    {link.menu ? (
                      <>
                        <AccordionTrigger data-oid="gvoflgb">
                          {link.title}
                        </AccordionTrigger>
                        <AccordionContent data-oid="ftyk1yp">
                          <ul className={cn("w-full")} data-oid="glfv:j:">
                            {link.menu.map((menuItem) => (
                              <ListItem
                                key={menuItem.title}
                                title={menuItem.title}
                                href={menuItem.href}
                                icon={menuItem.icon}
                                onClick={(e) =>
                                  handleAnchorClick(e, menuItem.href)
                                }
                                data-oid="hlyky0e"
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
                        onClick={() => handleClose()}
                        className="flex h-10 w-full items-center justify-between py-2 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
                        data-oid="o7:vfyt"
                      >
                        {link.title}
                      </Link>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </ul>
            {user && (
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="mt-6 w-full"
                data-oid="gi:7irl"
              >
                Sign Out
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  (
    { className, title, href, icon: Icon, children, onClick, ...props },
    ref,
  ) => {
    return (
      <li data-oid="jw:7-i_">
        <Link
          href={href!}
          ref={ref}
          onClick={onClick}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
          data-oid="iyamn59"
        >
          <div
            className="flex items-center space-x-2 text-foreground"
            data-oid="rmkwai5"
          >
            <Icon className="h-4 w-4" data-oid="6w84b-c" />
            <h6 className="text-sm !leading-none" data-oid="s36q-kq">
              {title}
            </h6>
          </div>
          <p
            title={children! as string}
            className="line-clamp-1 text-sm leading-snug text-muted-foreground"
            data-oid="xdyr-g1"
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
