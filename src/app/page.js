"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Users, Zap, Shield, Globe, CheckCircle, Menu, X } from "lucide-react"
import { useState } from "react"
import { useFetch } from "@/hooks/useFetch" // Assuming this hook handles Axios post requests

export default function LandingPage() {
  const router = useRouter()
  // Ensure this environment variable is correctly set in Netlify for production
  // and in .env.local for development (e.g., http://localhost:3000/your-api-endpoint)
  const apiInput = process.env.NEXT_PUBLIC_VERIDIA_API_MAIN 
  const { error, data, isLoading, post } = useFetch(apiInput)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [actionType, setActionType] = useState("") 

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url || !actionType) return // Ensure both fields are filled

    // Construct the full JSON payload
    const payload = {
      url: url,
      requestPrompt: actionType, // Using actionType for requestPrompt
      analysisContext: actionType, // Using actionType for analysisContext (you might want a separate input for this in the future)
      geminiModel: "gemini-1.5-flash" // Hardcoding the model as per your example
    };

    console.log("Sending payload:", payload); // Good for debugging

    const result = await post(payload); // Pass the full payload object
    if (result) {
      router.push('/dashboard'); // Navigate only on success
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
                BrandName
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Pricing
                </Link>
                <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4"></div>

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
              <Link href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Pricing
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
              🚀 New Feature Launch
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Website Analyzer
              </span>
              <br />
              <span className="text-white">Tool</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Analyze any website instantly. Get comprehensive insights about performance, SEO, security, and technical
              details. Simply enter a URL and desired action below to get started.
            </p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12">
              <div className="relative flex flex-col sm:flex-row gap-4"> {/* Added flex container for inputs */}
                <Input
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-700 text-white placeholder-gray-400 w-full text-center py-6 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 rounded-xl"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {/* New Input for Action Type */}
                <Input
                  placeholder="e.g., Summarize, SEO Audit, Performance Check"
                  className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-700 text-white placeholder-gray-400 w-full text-center py-6 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 rounded-xl"
                  type="text" 
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                />
                <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-semibold transition-all duration-200 rounded-xl whitespace-nowrap">
                  Analyze
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                Press Enter to analyze • Free analysis • No registration required
              </p>
            </form>

            {isLoading && <p className="mt-8 text-lg text-orange-500">Analyzing...</p>}
            {error && <p className="mt-8 text-lg text-red-500">Error: {error}</p>}
            {data && (
              <Card className="mt-12 max-w-4xl mx-auto bg-gradient-to-br from-red-900/20 to-black border-red-900/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-500">Analysis Results</CardTitle>
                  <CardDescription className="text-gray-300">Results for: {data.url}</CardDescription>
                </CardHeader>
                <CardContent className="text-left">
                  <pre className="bg-black/50 p-4 rounded-lg text-white overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500">10M+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">150+</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to scale your business and stay ahead of the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Experience blazing fast performance with our optimized infrastructure",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "Bank-level security with end-to-end encryption and compliance",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Scale",
                description: "Deploy worldwide with our distributed network and CDN",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Collaboration",
                description: "Work together seamlessly with real-time collaboration tools",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Premium Support",
                description: "Get help when you need it with our 24/7 expert support team",
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Easy Integration",
                description: "Connect with your existing tools through our robust API",
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

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/30 to-black border-t border-red-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                BrandName
              </div>
              <p className="text-gray-400">
                Transforming businesses with innovative solutions and cutting-edge technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Pricing
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
            <p>&copy; 2024 BrandName. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}