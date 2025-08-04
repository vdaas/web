"use client";

import * as React from "react";
import { Menu, X, ExternalLink, ChevronDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const versions = [
  { name: "V1.7", href: "#" },
  { name: "V1.6", href: "#" },
  { name: "V1.5", href: "#" },
  { name: "V1.4", href: "#" },
  { name: "V1.3", href: "#" },
  { name: "V1.2", href: "#" },
  { name: "V1.1", href: "#" },
  { name: "V1.0", href: "#" },
];

const navigationItems = [
  { name: "Docs", href: "#", type: "link" },
  {
    name: "Blog",
    href: "#",
    icon: ExternalLink,
    position: "end",
    type: "link",
  },
  {
    name: "versions",
    type: "dropdown",
    icon: ChevronDown, // Keep ChevronDown here
    position: "end",
    children: versions,
  },
  {
    name: "Star 1.5K",
    href: "#",
    icon: Github,
    position: "start",
    type: "link",
  },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 relative">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Brand</h1>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => {
            if (item.type === "link") {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                >
                  {Icon && item.position === "start" && (
                    <Icon className="h-4 w-4" />
                  )}
                  {item.name}
                  {Icon && item.position === "end" && (
                    <Icon className="h-4 w-4" />
                  )}
                </a>
              );
            } else if (item.type === "dropdown") {
              const Icon = item.icon; // Get the icon for the dropdown trigger
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                    >
                      {Icon && item.position === "start" && (
                        <Icon className="h-4 w-4" />
                      )}
                      {item.name}
                      {Icon && item.position === "end" && (
                        <Icon className="h-4 w-4" />
                      )}{" "}
                      {/* Re-added icon for desktop */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {item.children?.map((child, index) => (
                      <React.Fragment key={child.name}>
                        <DropdownMenuItem asChild>
                          <a href={child.href}>{child.name}</a>
                        </DropdownMenuItem>
                        {index < item.children.length - 1 && (
                          <DropdownMenuSeparator />
                        )}
                      </React.Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return null;
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "h-[calc(100vh-4rem)] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 h-full overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => {
              if (item.type === "link") {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 p-3 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && item.position === "start" && (
                      <Icon className="h-5 w-5" />
                    )}
                    <span className="text-base">{item.name}</span>
                    {Icon && item.position === "end" && (
                      <Icon className="h-5 w-5" />
                    )}
                  </a>
                );
              } else if (item.type === "dropdown") {
                // For AccordionTrigger, we let shadcn/ui's AccordionTrigger handle its own arrow icon.
                // We only render the text.
                return (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    key={item.name}
                  >
                    <AccordionItem value="versions-item" className="border-b-0">
                      <AccordionTrigger className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 p-3 rounded-md [&[data-state=open]>svg]:rotate-180">
                        <span className="text-base">{item.name}</span>
                        {/* The default ChevronDown icon is added by AccordionTrigger itself */}
                      </AccordionTrigger>
                      <AccordionContent className="pl-8 pt-2 pb-0">
                        <div className="flex flex-col space-y-1">
                          {item.children?.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 p-2 rounded-md"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }
              return null;
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
