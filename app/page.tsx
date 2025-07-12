"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, X, MoreHorizontal } from "lucide-react";
import { 
  IconMessageDots,
  IconCommand,
  IconChartDots3,
  IconScript,
  IconHandMove,
  IconX
} from "@tabler/icons-react";

const tasks = [
  {
    id: 1,
    title: "ChatCaps",
    description: "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 25,
    icon: IconMessageDots
  },
  {
    id: 2,
    title: "Command Prompts",
    description: "Create and refine Spanish-language commands, improving their accuracy and clarity.",
    languages: ["SPANISH", "EASY"],
    multiplier: 50,
    icon: IconCommand
  },
  {
    id: 3,
    title: "Plot Points",
    description: "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 50,
    icon: IconChartDots3
  },
  {
    id: 4,
    title: "Quick Scripts",
    description: "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["普通话", "EASY"],
    multiplier: 50,
    icon: IconScript
  },
  {
    id: 5,
    title: "Gesture Set",
    description: "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["ENGLISH", "EASY"],
    multiplier: 5,
    icon: IconHandMove
  },
  {
    id: 6,
    title: "ChatCaps",
    description: "Review and correct chat transcripts, tagging emotions, or refining responses to ensure they're clear, accurate, and engaging.",
    languages: ["MANDARIN", "EASY"],
    multiplier: 50,
    icon: IconMessageDots
  },
];

const filterCategories = [
  {
    title: "ALL TYPES",
    items: ["DATA COLLECTION", "DATA ANNOTATION", "QUALITY ASSESSMENT"]
  },
  {
    title: "ALL DIFFICULTIES",
    items: ["EASY", "INTERMEDIATE", "EXPERT"]
  },
  {
    title: "ALL LANGUAGES",
    items: ["ENGLISH", "SPANISH", "MANDARIN", "普通话"]
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card/30">
        <div className="p-4 border-b border-border">
          <Image
            src="/logo-light.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-6 w-6"
          />
        </div>
        <div className="p-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Filter</h2>
          <div className="space-y-8">
            {filterCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="font-mono font-medium text-foreground mb-3 tracking-wider">{category.title}</h3>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <button
                      key={item}
                      className="block w-full text-left font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                      onClick={() => {
                        setSelectedFilters(prev => 
                          prev.includes(item) 
                            ? prev.filter(f => f !== item)
                            : [...prev, item]
                        );
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
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="font-mono px-3 h-8">
                  TASKS
                </Button>
                <Button variant="ghost" size="sm" className="font-mono text-muted-foreground px-3 h-8">
                  TOKENS
                </Button>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-3 font-mono text-muted-foreground">
                <span>LVL 91</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 font-mono">
                <Badge variant="secondary" className="bg-primary text-primary-foreground px-3 py-1 font-mono">
                  1.5X
                </Badge>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <div className="w-4 h-4" style={{ color: '#fafafa', opacity: 0.5 }}>
                      <Image
                        src="/icon-tokens-pending.svg"
                        alt="Tokens Pending"
                        width={16}
                        height={16}
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    </div>
                    +32.10
                  </span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-4 h-4" style={{ color: '#fafafa', opacity: 0.5 }}>
                      <Image
                        src="/icon-tokens.svg"
                        alt="Tokens"
                        width={16}
                        height={16}
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    </div>
                    67.89
                  </span>
                </div>
                <Badge variant="secondary" className="bg-primary text-primary-foreground px-3 py-1 font-mono">
                  10 DAY
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full overflow-hidden">
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
          <div className="px-4 py-3">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="pl-10 bg-input border-0 font-mono h-9"
              />
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <button
                  key={task.id} 
                  className="w-full px-6 py-5 hover:bg-accent/10 transition-all duration-200 cursor-pointer text-left group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[30px] leading-[36px] font-bold mb-2 group-hover:text-foreground/90">{task.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-2xl group-hover:text-muted-foreground/80">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        {task.languages.map((lang) => (
                          <Badge 
                            key={lang} 
                            variant="secondary" 
                            className="px-2 py-0.5 h-5 font-mono font-normal bg-muted/50 group-hover:bg-muted/70"
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      <Badge 
                        variant="default" 
                        className="bg-primary text-primary-foreground px-3 py-0.5 h-6 font-mono group-hover:bg-primary/90"
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
  );
}