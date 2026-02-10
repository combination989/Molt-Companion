'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    BookOpen,
    ArrowLeft,
    Code,
    Terminal,
    FileText,
    Lightbulb,
    ExternalLink,
    Github
} from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
    const documentationSections = [
        {
            title: "Getting Started",
            description: "Learn the basics of Molt Companion and how to set up your environment",
            icon: Lightbulb,
            items: [
                { name: "Installation Guide", description: "Step-by-step installation instructions" },
                { name: "Quick Start", description: "Get up and running in minutes" },
                { name: "Configuration", description: "Configure Molt Companion for your needs" },
            ]
        },
        {
            title: "Skills Reference",
            description: "Comprehensive documentation for all available skills",
            icon: Code,
            items: [
                { name: "AI & LLM Skills", description: "Working with AI and language models" },
                { name: "Development Tools", description: "Code generation and refactoring skills" },
                { name: "Automation Skills", description: "Automate your workflow" },
            ]
        },
        {
            title: "Agent Architecture",
            description: "Understanding the multi-agent system",
            icon: Terminal,
            items: [
                { name: "System Overview", description: "How the multi-agent system works" },
                { name: "Agent Communication", description: "Inter-agent messaging protocols" },
                { name: "Custom Agents", description: "Build your own specialized agents" },
            ]
        },
        {
            title: "API Reference",
            description: "Complete API documentation and examples",
            icon: FileText,
            items: [
                { name: "REST API", description: "HTTP API endpoints and usage" },
                { name: "WebSocket API", description: "Real-time communication interface" },
                { name: "SDK Documentation", description: "Official SDKs and libraries" },
            ]
        },
    ]

    const resources = [
        {
            title: "GitHub Repository",
            description: "View source code, report issues, and contribute",
            icon: Github,
            link: "https://github.com/combination989/Molt-Companion.git",
            badge: "Open Source"
        },
        {
            title: "Examples & Tutorials",
            description: "Code examples and step-by-step tutorials",
            icon: Code,
            link: "#",
            badge: "Coming Soon"
        },
        {
            title: "Community Forum",
            description: "Ask questions and share knowledge",
            icon: BookOpen,
            link: "#",
            badge: "Join Now"
        },
    ]

    return (
        <div className="w-full p-6 space-y-8 bg-gradient-to-br from-background via-background to-red-500/5">
            {/* Header */}
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
                    <span className="text-red-600">Documentation</span> & Resources
                </h1>
                <p className="text-muted-foreground mt-2">
                    Everything you need to master Molt Companion AI
                </p>
            </div>

            {/* Documentation Sections */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Documentation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {documentationSections.map((section) => (
                            <Card key={section.title} className="hover:shadow-lg hover:border-red-500/50 transition-all">
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <section.icon className="w-6 h-6 text-red-500" />
                                        </div>
                                        <div>
                                            <CardTitle>{section.title}</CardTitle>
                                            <CardDescription className="mt-1">{section.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {section.items.map((item, i) => (
                                            <button
                                                key={i}
                                                className="w-full text-left p-3 rounded-lg hover:bg-red-500/5 transition-colors border border-transparent hover:border-red-500/20"
                                            >
                                                <div className="font-medium text-sm">{item.name}</div>
                                                <div className="text-xs text-muted-foreground mt-0.5">
                                                    {item.description}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Resources */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resources.map((resource) => (
                            <Link
                                key={resource.title}
                                href={resource.link}
                                target={resource.link.startsWith('http') ? '_blank' : undefined}
                                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                <Card className="h-full hover:shadow-lg hover:border-red-500/50 transition-all cursor-pointer group">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                                    <resource.icon className="w-5 h-5 text-red-500" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base group-hover:text-red-600 transition-colors">
                                                        {resource.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1 text-xs">
                                                        {resource.description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {resource.link.startsWith('http') && (
                                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Badge variant="secondary" className="w-fit mt-2">
                                            {resource.badge}
                                        </Badge>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                    <CardHeader>
                        <CardTitle>Need Help?</CardTitle>
                        <CardDescription>
                            Get support from our community and documentation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/skills">
                                <Button variant="outline">
                                    Browse Skills
                                </Button>
                            </Link>
                            <Link href="/agents">
                                <Button variant="outline">
                                    View Agents
                                </Button>
                            </Link>
                            <Link href="/commands">
                                <Button variant="outline">
                                    Command Reference
                                </Button>
                            </Link>
                            <Link href="https://github.com/combination989/Molt-Companion.git" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
