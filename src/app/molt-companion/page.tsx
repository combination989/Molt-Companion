'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ArrowRight,
    Bot,
    Terminal as TerminalIcon,
    Zap,
    Layers,
    Code,
    BookOpen,
    Search as SearchIcon,
    Cloud,
    BarChart,
    Globe,
    ExternalLink,
    Bookmark
} from "lucide-react"
import Link from "next/link"

interface Skill {
    id: string
    name: string
    description: string
    category: string
    url?: string
    tags?: string[]
}

interface Agent {
    id: string
    name: string
    description: string
    capabilities?: string[]
}

interface Command {
    id: string
    name: string
    description: string
    usage?: string
}

interface MultiAgentData {
    skills: Skill[]
    agents: Agent[]
    commands: Command[]
}

export default function MoltCompanionPage() {
    const [data, setData] = useState<MultiAgentData | null>(null)

    useEffect(() => {
        // Load data from public folder
        fetch('/data.json')
            .then(res => res.json())
            .then(jsonData => setData(jsonData))
            .catch(err => console.error('Failed to load data:', err))
    }, [])

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading Molt Companion Dashboard...</p>
                </div>
            </div>
        )
    }

    const categories = [
        { name: "AI & LLMs", icon: Bot, color: "text-red-500" },
        { name: "Search & Research", icon: SearchIcon, color: "text-blue-500" },
        { name: "DevOps & Cloud", icon: Cloud, color: "text-purple-500" },
        { name: "Web & Frontend Development", icon: Code, color: "text-green-500" },
        { name: "Marketing & Sales", icon: BarChart, color: "text-yellow-500" },
        { name: "Browser & Automation", icon: Globe, color: "text-cyan-500" },
        { name: "Productivity & Tasks", icon: Zap, color: "text-orange-500" },
        { name: "Coding Agents & IDEs", icon: TerminalIcon, color: "text-pink-500" },
        { name: "Clawdbot Tools", icon: Layers, color: "text-indigo-500" },
    ]

    const uniqueCategoriesCount = new Set(data.skills.map(s => s.category)).size

    return (
        <div className="w-full p-6 space-y-8 bg-gradient-to-br from-background via-background to-red-500/5">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto pt-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black border border-red-500/20 mb-4 overflow-hidden">
                    <img
                        src="/iddle.png"
                        alt="Molt Companion Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Molt Companion <span className="text-red-600">Multi-Agent AI</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Your intelligent multi-agent AI assistant with specialized skills, agents, and commands to supercharge your workflow.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/chat">
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <ArrowRight className="mr-2 w-4 h-4" />
                            Try Molt Companion Chat
                        </Button>
                    </Link>
                    <Link href="/bookmarks">
                        <Button variant="outline">
                            <Bookmark className="mr-2 w-4 h-4" />
                            View Bookmarks
                        </Button>
                    </Link>
                    <Link href="https://github.com/combination989/Molt-Companion.git" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">
                            <ExternalLink className="mr-2 w-4 h-4" />
                            View on GitHub
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                {[
                    { label: "Total Skills", value: data.skills.length, icon: Code },
                    { label: "Specialized Agents", value: data.agents.length, icon: Bot },
                    { label: "Slash Commands", value: data.commands.length, icon: TerminalIcon },
                    { label: "Categories", value: uniqueCategoriesCount, icon: Layers },
                ].map((stat, i) => (
                    <Card key={i} className="text-center hover:shadow-lg transition-shadow border-red-500/20">
                        <CardContent className="pt-6">
                            <stat.icon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content - Category Overview */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Explore by Category</h2>
                    <Link href="/skills">
                        <Button variant="outline">
                            View All Skills
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => {
                        const count = data.skills.filter(s => s.category === cat.name).length
                        if (count === 0) return null

                        return (
                            <Link href="/skills" key={cat.name}>
                                <Card className="group hover:shadow-lg hover:border-red-500/50 transition-all cursor-pointer h-full">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`p-3 rounded-lg bg-background border group-hover:border-red-500/50 transition-colors`}>
                                                <cat.icon className={`w-6 h-6 ${cat.color}`} />
                                            </div>
                                            <Badge variant="secondary">{count} skills</Badge>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                                            {cat.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Explore {cat.name.toLowerCase()} capabilities
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills
                                                .filter(s => s.category === cat.name)
                                                .slice(0, 3)
                                                .map((s) => (
                                                    <Badge key={s.id} variant="outline" className="text-xs">
                                                        {s.name}
                                                    </Badge>
                                                ))}
                                            {count > 3 && (
                                                <Badge variant="outline" className="text-xs border-dashed">
                                                    +{count - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                <CardHeader>
                    <CardTitle>Quick Navigation</CardTitle>
                    <CardDescription>
                        Explore different sections of Molt Companion
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/agents">
                            <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                                <Bot className="w-5 h-5 text-red-500" />
                                <div className="text-left">
                                    <div className="font-semibold">Specialized Agents</div>
                                    <div className="text-xs text-muted-foreground">{data.agents.length} agents available</div>
                                </div>
                            </Button>
                        </Link>
                        <Link href="/commands">
                            <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                                <TerminalIcon className="w-5 h-5 text-red-500" />
                                <div className="text-left">
                                    <div className="font-semibold">Slash Commands</div>
                                    <div className="text-xs text-muted-foreground">{data.commands.length} commands available</div>
                                </div>
                            </Button>
                        </Link>
                        <Link href="/documentation">
                            <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
                                <BookOpen className="w-5 h-5 text-red-500" />
                                <div className="text-left">
                                    <div className="font-semibold">Documentation</div>
                                    <div className="text-xs text-muted-foreground">Guides and resources</div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center py-8 border-t">
                <p className="text-sm text-muted-foreground">
                    Built with precision by <span className="text-foreground font-semibold">Molt Companion AI</span>
                </p>
            </div>
        </div>
    )
}
