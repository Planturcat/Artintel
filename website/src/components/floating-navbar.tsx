"use client";

import { cn } from "@/lib";
import { useClerk } from "@clerk/nextjs";
import { ArrowRightIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import Wrapper from "./global/wrapper";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { NAV_LINKS } from "@/constants";

// Simple Menu component
const Menu = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_LINKS.map((link, index) => (
          <NavigationMenuItem key={index}>
            {link.submenu ? (
              <>
                <NavigationMenuTrigger className="text-foreground">
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    {link.submenu.map((item, idx) => (
                      <li key={idx} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#00CBDD]/10 hover:text-[#00CBDD] focus:bg-accent focus:text-accent-foreground">
                        <Link 
                          href={item.link}
                          onClick={(e) => handleAnchorClick(e, item.link)}
                          className="text-sm font-medium leading-none"
                        >
                          {item.name}
                        </Link>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description || ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={link.link}
                legacyBehavior
                passHref
                onClick={(e) => handleAnchorClick(e, link.link)}
              >
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-[#00CBDD]")}>
                  {link.name}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Simple MobileMenu component
const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-full mt-2 inset-x-0 bg-background/95 backdrop-blur-sm p-4 rounded-lg border border-[#00CBDD]/20 shadow-lg shadow-[#00CBDD]/5">
      <nav className="flex flex-col space-y-4">
        {NAV_LINKS.map((link, index) => (
          <Link 
            key={index} 
            href={link.link}
            className="px-4 py-2 text-foreground hover:bg-[#00CBDD]/10 hover:text-[#00CBDD] rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Icons component for menu icon
const Icons = {
  menu: ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="#00CBDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6H21" stroke="#00CBDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 18H21" stroke="#00CBDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const Navbar = () => {

    const { user } = useClerk();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    return (
        <div className="relative w-full h-full">
            <div className="z-[99] fixed pointer-events-none inset-x-0 h-[88px] bg-[rgba(10,10,10,0.8)] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))]"></div>

            <header
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform th",
                    isOpen ? "h-[calc(100%-24px)]" : "h-12"
                )}
            >
                <Wrapper className="backdrop-blur-lg rounded-xl lg:rounded-2xl border border-[#00CBDD]/20 bg-black/50 px- md:px-2 flex items-center justify-start shadow-lg shadow-[#00CBDD]/5">
                    <div className="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0">
                        <div className=" pl-1">
                            <Link href="/" className="text-lg font-semibold text-foreground">
                                <Image
                                    src="/logo/Logo - PNG (2).png"
                                    alt="Artintel Logo"
                                    width={250}
                                    height={84}
                                    className="h-5 w-auto"
                                />
                            </Link>
                        </div>
                        
                        <div className="hidden lg:flex flex-1 justify-center">
                            <Menu />
                        </div>
                        
                        <div className="items-center flex gap-2 lg:gap-4 flex-shrink-0">
                            {user ? (
                                <Button size="sm" variant="default" asChild className="hidden sm:flex bg-[#00CBDD] hover:bg-[#00CBDD]/90 text-black">
                                    <Link href="/app">
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="sm" variant="outline" asChild className="hover:translate-y-0 hover:scale-100 border-[#00CBDD]/50 hover:border-[#00CBDD] hover:text-[#00CBDD]">
                                        <Link href="/auth/signin">
                                            Login
                                        </Link>
                                    </Button>
                                    <Button size="sm" variant="default" asChild className="hidden sm:flex bg-[#00CBDD] hover:bg-[#00CBDD]/90 text-black">
                                        <Link href="/auth/signup">
                                            Sign up
                                        </Link>
                                    </Button>
                                </>
                            )}
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="lg:hidden p-2 w-8 h-8 hover:bg-[#00CBDD]/10 hover:text-[#00CBDD]"
                            >
                                {isOpen ? <XIcon className="w-4 h-4 duration-300 text-[#00CBDD]" /> : <Icons.menu className="w-3.5 h-3.5 duration-300" />}
                            </Button>
                        </div>
                    </div>
                    <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                </Wrapper>
            </header>

        </div>
    )
};

export default Navbar