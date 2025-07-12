"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import {
  IconMessageDots,
  IconCommand,
  IconChartDots3,
  IconScript,
  IconHandMove,
} from "@tabler/icons-react";

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

  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="flex w-full max-w-[1280px] h-screen border-x border-border">
        {/* Sidebar */}
        <div className="w-64 border-r border-border">
          <div className="p-6 border-b border-border gap-12 flex flex-col justify-center">
            <Image
              src="/logo-light.svg"
              alt="Logo"
              width={32}
              height={32}
              className="h-6 w-6 mb-3"
            />
            <h2 className="text-[32px] leading-[36px] font-normal text-muted-foreground">
              Filter
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              {filterCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="font-mono font-medium text-foreground mb-3 tracking-wider">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        className="block w-full text-left font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wide cursor-pointer"
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
          <div className="border-b border-border">
            <div className="flex items-center justify-between px-6 h-[88px]">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono h-auto text-foreground hover:bg-transparent rounded-none"
                    style={{ 
                      paddingLeft: '6px', 
                      paddingRight: '6px', 
                      paddingTop: '2px', 
                      paddingBottom: '3px',
                      backgroundColor: 'rgb(250 250 250 / 10%)'
                    }}
                  >
                    TASKS
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-muted-foreground px-3 h-8 rounded-none"
                  >
                    TOKENS
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-muted-foreground px-3 h-8 rounded-none"
                  >
                    LVL 91
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 font-mono">
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground font-mono rounded-none h-auto"
                    style={{ 
                      paddingLeft: '6px', 
                      paddingRight: '6px', 
                      paddingTop: '2px', 
                      paddingBottom: '3px'
                    }}
                  >
                    1.5X
                  </Badge>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4"
                        style={{ color: "#fafafa", opacity: 0.5 }}
                      >
                        <Image
                          src="/icon-tokens-pending.svg"
                          alt="Tokens Pending"
                          width={16}
                          height={16}
                          className="w-full h-full"
                          style={{
                            filter: "brightness(0) saturate(100%) invert(100%)",
                          }}
                        />
                      </div>
                      +32.10
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4"
                        style={{ color: "#fafafa", opacity: 0.5 }}
                      >
                        <Image
                          src="/icon-tokens.svg"
                          alt="Tokens"
                          width={16}
                          height={16}
                          className="w-full h-full"
                          style={{
                            filter: "brightness(0) saturate(100%) invert(100%)",
                          }}
                        />
                      </div>
                      67.89
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary text-primary-foreground font-mono rounded-none h-auto"
                    style={{ 
                      paddingLeft: '6px', 
                      paddingRight: '6px', 
                      paddingTop: '2px', 
                      paddingBottom: '3px'
                    }}
                  >
                    10 DAY
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-none overflow-hidden"
                >
                  <Image
                    src="/avatar-1.svg"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-full w-full"
                  />
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-6 border-b border-border">
              <div className="relative">
                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-[32px] leading-[36px] text-muted-foreground placeholder:text-muted-foreground focus:outline-none pr-16"
                />
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <ScrollArea className="flex-1">
            <div>
              {tasks.map((task, index) => {
                return (
                  <button
                    key={task.id}
                    className={`relative w-full px-6 py-5 hover:bg-[#242424] transition-all duration-200 cursor-pointer text-left ${
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
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          {task.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="secondary"
                              className="font-mono font-normal rounded-none h-auto"
                              style={{ 
                                paddingLeft: '6px', 
                                paddingRight: '6px', 
                                paddingTop: '2px', 
                                paddingBottom: '3px',
                                backgroundColor: lang === 'EASY' ? 'rgb(50 50 50)' : 'rgb(30 30 30)',
                                color: lang === 'EASY' ? 'rgb(150 255 0)' : 'rgb(255 255 255)'
                              }}
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <Badge
                          variant="default"
                          className="bg-primary text-primary-foreground font-mono rounded-none h-auto"
                          style={{ 
                            paddingLeft: '6px', 
                            paddingRight: '6px', 
                            paddingTop: '2px', 
                            paddingBottom: '3px'
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
