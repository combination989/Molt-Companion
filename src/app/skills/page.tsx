'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Bot,
    Code,
    BookOpen,
    Search as SearchIcon,
    Cloud,
    BarChart,
    Globe,
    ExternalLink,
    Zap,
    Layers,
    Terminal as TerminalIcon,
    ArrowLeft,
    Bookmark,
    ChevronRight,
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react"
import Link from "next/link"
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks"
import { SkillCard } from "@/components/SkillCard"

interface Skill {
    id: string
    name: string
    description: string
    category: string
    url?: string
    tags?: string[]
}

interface MultiAgentData {
    skills: Skill[]
}

export default function SkillsPage() {
    const [data, setData] = useState<MultiAgentData | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9 // 3x3 grid


    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(jsonData => setData(jsonData))
            .catch(err => console.error('Failed to load data:', err))
    }, [])

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory])

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
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

    const filteredSkills = data.skills.filter(skill => {
        const matchesSearch = searchQuery === '' ||
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = !selectedCategory || skill.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredSkills.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSkills = filteredSkills.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    return (
        <div className="w-full p-6 space-y-8 bg-gradient-to-br from-background via-background to-red-500/5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/molt-companion">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        AI <span className="text-red-600">Skills</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Explore {data.skills.length} specialized skills for AI coding agents
                    </p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                    >
                        All
                    </Button>
                    {categories.map((cat) => {
                        const count = data.skills.filter(s => s.category === cat.name).length
                        if (count === 0) return null
                        return (
                            <Button
                                key={cat.name}
                                variant={selectedCategory === cat.name ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(cat.name)}
                                className="whitespace-nowrap"
                            >
                                <cat.icon className="w-3 h-3 mr-1" />
                                {cat.name.split(' ')[0]} ({count})
                            </Button>
                        )
                    })}
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </div>

            {/* Pagination Controls */}
            {filteredSkills.length > itemsPerPage && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="text-sm text-muted-foreground mx-2">
                        Page {currentPage} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            )}


            {filteredSkills.length === 0 && (
                <div className="text-center py-12">
                    <SearchIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No skills found matching your criteria</p>
                </div>
            )}

            {/* Stats */}
            <div className="text-center text-sm text-muted-foreground py-8 border-t">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredSkills.length)} of {filteredSkills.length} skills
                {data.skills.length !== filteredSkills.length && ` (filtered from ${data.skills.length} total)`}
            </div>

        </div>
    )
}
