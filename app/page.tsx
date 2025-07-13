"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Search, X, User, Moon, Sun, LogOut } from "lucide-react";
import {
  IconMessageDots,
  IconCommand,
  IconChartDots3,
  IconScript,
  IconHandMove,
  IconCoin,
  IconCoins,
} from "@tabler/icons-react";

// Header Badge Component
const HeaderBadge = ({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const isPrimary = variant === "primary";
  return (
    <div
      className={`font-mono text-[14px] leading-[20px] font-normal inline-flex items-center ${
        isPrimary
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground"
      }`}
      style={{
        paddingLeft: isPrimary ? "6px" : "0",
        paddingRight: isPrimary ? "6px" : "0",
        paddingTop: isPrimary ? "2px" : "0",
        paddingBottom: isPrimary ? "3px" : "0",
      }}
    >
      {children}
    </div>
  );
};

const tasks = [
  {
    id: 1,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 25,
    icon: IconMessageDots,
  },
  {
    id: 2,
    title: "Command Prompts",
    description:
      "Create and refine Spanish-language commands, improving their accuracy and clarity.",
    languages: ["SPANISH", "EASY"],
    multiplier: 50,
    icon: IconCommand,
  },
  {
    id: 3,
    title: "Plot Points",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 50,
    icon: IconChartDots3,
  },
  {
    id: 4,
    title: "Quick Scripts",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["普通话", "EASY"],
    multiplier: 50,
    icon: IconScript,
  },
  {
    id: 5,
    title: "Gesture Set",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 5,
    icon: IconHandMove,
  },
  {
    id: 6,
    title: "ChatCaps",
    description:
      "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["MANDARIN", "EASY"],
    multiplier: 50,
    icon: IconMessageDots,
  },
];

const filterCategories = [
  {
    title: "ALL TYPES",
    items: ["DATA COLLECTION", "DATA ANNOTATION", "QUALITY ASSESSMENT"],
  },
  {
    title: "ALL DIFFICULTIES",
    items: ["EASY", "INTERMEDIATE", "EXPERT"],
  },
  {
    title: "ALL LANGUAGES",
    items: ["ENGLISH", "SPANISH", "MANDARIN", "普通话"],
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full max-w-[1280px] h-screen border-x border-border">
        {/* Sidebar */}
        <div className="w-64 border-r border-border">
          <div className="px-7 py-6 border-b border-border h-[358px] flex flex-col justify-between">
            <Image
              src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
              alt="Logo"
              width={32}
              height={32}
              className="h-6 w-6"
            />
            <h2 className="text-[30px] leading-[36px] font-bold text-muted-foreground">
              Filter
            </h2>
          </div>
          <div className="px-7 py-6">
            <div className="space-y-8">
              {filterCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="font-mono text-[14px] leading-[20px] font-normal text-foreground mb-3 tracking-wider">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        className="block w-full text-left font-mono text-[14px] leading-[20px] font-normal text-muted-foreground hover:text-foreground transition-colors tracking-wide cursor-pointer"
                        onClick={() => {
                          // Filter functionality to be implemented
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border flex flex-col">
            <div className="flex items-center justify-between px-7 py-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-7">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-[14px] leading-[20px] font-normal h-auto text-foreground hover:bg-transparent rounded-none cursor-pointer"
                    style={{
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      paddingTop: "2px",
                      paddingBottom: "3px",
                      backgroundColor: "rgb(250 250 250 / 10%)",
                    }}
                  >
                    TASKS
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-[14px] leading-[20px] font-normal text-muted-foreground px-3 h-8 rounded-none cursor-pointer"
                  >
                    TOKENS
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-[14px] leading-[20px] font-normal text-muted-foreground px-3 h-8 rounded-none cursor-pointer"
                  >
                    LVL 01
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-7">
                  <HeaderBadge variant="secondary">
                    <IconCoin
                      className="w-6 h-6"
                      style={{
                        color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                      }}
                      stroke={1.25}
                    />
                    <span className="ml-1.5">
                      <span
                        style={{
                          color: theme === "dark" ? "#fafafa" : "#111111",
                        }}
                      >
                        +32
                      </span>
                      .10
                    </span>
                  </HeaderBadge>
                  <HeaderBadge variant="secondary">
                    <IconCoins
                      className="w-6 h-6"
                      style={{
                        color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                      }}
                      stroke={1.25}
                    />
                    <span className="ml-1.5">
                      <span
                        style={{
                          color: theme === "dark" ? "#fafafa" : "#111111",
                        }}
                      >
                        67
                      </span>
                      .89
                    </span>
                  </HeaderBadge>
                  <HeaderBadge variant="primary">1.5X</HeaderBadge>
                  <HeaderBadge variant="secondary">
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                      }}
                    />
                    <span className="ml-1.5">
                      <span
                        style={{
                          color: theme === "dark" ? "#fafafa" : "#111111",
                        }}
                      >
                        10
                      </span>{" "}
                      DAY
                    </span>
                  </HeaderBadge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="h-8 w-8 p-0 rounded-full overflow-hidden relative hover:opacity-80 transition-opacity cursor-pointer"
                    style={{
                      boxShadow:
                        theme === "dark"
                          ? "inset 0 0 0 1px rgb(250 250 250 / 8%)"
                          : "inset 0 0 0 1px rgb(17 17 17 / 8%)",
                    }}
                  >
                    <Image
                      src="/avatar-1.svg"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-full w-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-none shadow-none"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer rounded-none text-[14px] leading-[20px] font-normal"
                      onClick={() => {
                        // Placeholder for profile navigation
                        console.log("Navigate to profile");
                      }}
                    >
                      <User
                        className="mr-2 h-6 w-6"
                        style={{
                          color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                        }}
                        strokeWidth={1.25}
                      />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-none text-[14px] leading-[20px] font-normal"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun
                          className="mr-2 h-6 w-6"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                          }}
                          strokeWidth={1.25}
                        />
                      ) : (
                        <Moon
                          className="mr-2 h-6 w-6"
                          style={{
                            color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                          }}
                          strokeWidth={1.25}
                        />
                      )}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer rounded-none text-red-500 focus:text-red-500 text-[14px] leading-[20px] font-normal"
                      onClick={() => {
                        // Placeholder for logout
                        console.log("Logout");
                      }}
                    >
                      <LogOut
                        className="mr-2 h-6 w-6 text-red-500"
                        strokeWidth={1.25}
                      />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 z-10 cursor-pointer transition-colors"
                  style={{
                    color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                  }}
                >
                  <X className="w-8 h-8" strokeWidth={2} />
                </button>
              ) : (
                <Search
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none z-10"
                  style={{
                    color: theme === "dark" ? "#5c5c5c" : "#b2b2b2",
                  }}
                  strokeWidth={2}
                />
              )}
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className={`w-full h-full px-7 py-6 bg-transparent text-[30px] leading-[36px] font-bold placeholder:text-muted-foreground focus:outline-none pr-16 cursor-text ${
                  searchQuery ? "text-[#fafafa]" : "text-muted-foreground"
                }`}
              />
            </div>
          </div>

          {/* Tasks List */}
          <ScrollArea className="flex-1">
            <div>
              {tasks.map((task, index) => {
                return (
                  <button
                    key={task.id}
                    className={`relative w-full px-7 py-6 hover:bg-[rgb(17_17_17_/_8%)] dark:hover:bg-[#242424] transition-all duration-200 cursor-pointer text-left ${
                      index !== tasks.length - 1
                        ? "border-b border-border hover:border-transparent"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[30px] leading-[36px] font-bold mb-2">
                          {task.title}
                        </h3>
                        <p className="text-[14px] leading-[20px] font-normal text-muted-foreground max-w-2xl">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          {task.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="secondary"
                              className="font-mono text-[14px] leading-[20px] font-normal rounded-none h-auto"
                              style={{
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                paddingTop: "2px",
                                paddingBottom: "3px",
                                backgroundColor:
                                  lang === "EASY"
                                    ? "rgb(50 50 50)"
                                    : "rgb(30 30 30)",
                                color:
                                  lang === "EASY"
                                    ? "rgb(150 255 0)"
                                    : "rgb(255 255 255)",
                              }}
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <Badge
                          variant="default"
                          className="bg-primary text-primary-foreground font-mono text-[14px] leading-[20px] font-normal rounded-none h-auto"
                          style={{
                            paddingLeft: "6px",
                            paddingRight: "6px",
                            paddingTop: "2px",
                            paddingBottom: "3px",
                          }}
                        >
                          +{task.multiplier}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
