"use client"

import  React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Users, Zap, Shield, Globe, CheckCircle, Menu, X, Sparkles, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useFetch } from "@/hooks/useFetch"

export default function LandingPage() {
  const router = useRouter()
  const setSessionId = (id) => localStorage.setItem("currentAnalysisId", id)

  // API endpoint for creating a new web analysis
  const apiInput = process.env.NEXT_PUBLIC_VERIDIA_API_MAIN || "/api/analyze"

  // useFetch hook for making POST requests to the API
  const { error, data, isLoading, post } = useFetch(apiInput)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [actionType, setActionType] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url || !actionType) {
      alert("Please enter both a URL and an action type.")
      return
    }

    // Construct the full JSON payload for the create API
    const payload = {
      url: url,
      requestPrompt: actionType,
      analysisContext: actionType,
      geminiModel: "gemini-1.5-flash",
    }

    console.log("Sending payload:", payload)

    try {
      const result = await post(payload)
      if (result && result.id) {
        setSessionId(result.id)
        router.push("/analyzer/dashboard")
      } else {
        console.error("API response did not contain an ID:", result)
        alert("Analysis failed: No ID received from the server.")
      }
    } catch (e) {
      console.error("Error during analysis submission:", e)
      alert(`Analysis failed: ${error || (e).message}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                WebAnalyzer Pro
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-300 hover:text-orange-500 transition-colors">
                  How It Works
                </Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Reviews
                </Link>
                <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white">✨ AI Powered</Badge>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Features
              </Link>
              <Link href="#how-it-works" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                How It Works
              </Link>
              <Link href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Reviews
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-red-900 to-orange-900 text-white border-red-700">
              🚀 Powered by Gemini AI
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Advanced Website
              </span>
              <br />
              <span className="text-white">Analyzer Tool</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get comprehensive AI-powered insights about any website. Analyze performance, SEO, security, and more with
              custom analysis types. Simply enter a URL and specify what you want to analyze.
            </p>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-12">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <Input
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-700 text-white placeholder-gray-400 flex-1 text-center py-6 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 rounded-xl"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <Input
                  placeholder="Analysis type (e.g., SEO Audit, Performance Check, Security Scan)"
                  className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-2 border-orange-700 text-white placeholder-gray-400 flex-1 text-center py-6 text-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 rounded-xl"
                  type="text"
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-semibold transition-all duration-200 rounded-xl whitespace-nowrap min-w-[140px]"
                >
                  {isLoading ? "Analyzing..." : "Analyze Now"}
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Press Enter to analyze • Free analysis • Powered by Gemini AI
              </p>
            </form>

            {/* Loading and Error States */}
            {isLoading && (
              <div className="mt-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-3"></div>
                <p className="text-lg text-orange-500">Analyzing your website...</p>
              </div>
            )}
            {error && (
              <div className="mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg max-w-2xl mx-auto">
                <p className="text-red-400">Error: {error}</p>
              </div>
            )}

            {/* Quick Action Suggestions */}
            <div className="mt-12 max-w-4xl mx-auto">
              <p className="text-sm text-gray-400 mb-4">Popular analysis types:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "SEO Audit",
                  "Performance Check",
                  "Security Scan",
                  "Content Analysis",
                  "Mobile Optimization",
                  "Accessibility Review",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setActionType(suggestion)}
                    className="border-red-700/50 text-gray-300 hover:bg-red-900/20 hover:text-orange-500 bg-transparent text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500">50K+</div>
              <div className="text-gray-300">Websites Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">99.9%</div>
              <div className="text-gray-300">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">15+</div>
              <div className="text-gray-300">Analysis Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">24/7</div>
              <div className="text-gray-300">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get comprehensive website analysis in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Globe className="h-8 w-8" />,
                title: "Enter URL & Analysis Type",
                description:
                  "Provide the website URL and specify what type of analysis you want - SEO, performance, security, or custom analysis.",
              },
              {
                step: "02",
                icon: <Sparkles className="h-8 w-8" />,
                title: "AI Processing",
                description:
                  "Our Gemini AI analyzes your website comprehensively, checking all aspects based on your specified analysis type.",
              },
              {
                step: "03",
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Get Detailed Results",
                description:
                  "Receive actionable insights, recommendations, and detailed reports to improve your website's performance.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-red-900/20 to-black border-red-900/30 hover:border-orange-500/50 transition-all duration-300 relative"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-orange-500">{item.icon}</div>
                    <div className="text-4xl font-bold text-red-500/30">{item.step}</div>
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-black to-red-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Powerful Analysis Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive website analysis powered by advanced AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Performance Analysis",
                description: "Deep dive into loading speeds, Core Web Vitals, and optimization opportunities",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Security Assessment",
                description: "Comprehensive security scanning including SSL, headers, and vulnerability detection",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "SEO Optimization",
                description: "Complete SEO audit with keyword analysis, meta tags, and ranking factors",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "User Experience",
                description: "UX analysis covering accessibility, mobile responsiveness, and usability",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Content Quality",
                description: "AI-powered content analysis for readability, structure, and engagement",
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Custom Analysis",
                description: "Specify your own analysis requirements for tailored insights",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-red-900/20 to-black border-red-900/30 hover:border-orange-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="text-orange-500 mb-2">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Digital Marketing Manager",
                content:
                  "The custom analysis feature is incredible. I can specify exactly what I need and get detailed, actionable insights every time.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Web Developer",
                content:
                  "This tool has revolutionized how I audit websites. The AI-powered analysis is more thorough than any manual review.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "SEO Specialist",
                content:
                  "The dual input system is genius. I can analyze for specific SEO issues and get targeted recommendations instantly.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-red-900/30 to-black border-red-900/40">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-orange-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/30 to-black border-t border-red-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                WebAnalyzer Pro
              </div>
              <p className="text-gray-400">
                Advanced AI-powered website analysis tool for comprehensive insights and optimization recommendations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-orange-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-orange-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-900/20 text-center text-gray-400">
            <p>&copy; 2024 WebAnalyzer Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
