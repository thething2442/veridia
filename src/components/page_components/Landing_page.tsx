import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Star, Users, Zap, Shield, Globe, CheckCircle, Play, Menu, X } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Veridia
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Pricing
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Reviews
                </a>
                <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-orange-500 hover:bg-red-900/20">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                Get Started
              </Button>
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
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Pricing
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Reviews
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Contact
              </a>
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
                Analyze Web content for you.
              </span>
              <br />
              <span className="text-white">I can read Books to</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with cutting-edge technology. Experience the power of innovation with our
              comprehensive platform designed for modern enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3"
              >
                Analyze URL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-700 text-white hover:bg-red-900/20 px-8 py-3 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-black to-red-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechCorp",
                content: "This platform transformed our entire workflow. The results exceeded our expectations.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "CTO, StartupXYZ",
                content: "Incredible performance and reliability. Our team productivity increased by 300%.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Product Manager, InnovateCo",
                content: "The best investment we've made. Customer support is outstanding and features are top-notch.",
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and transform your business today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-red-900/20 border-red-700 text-white placeholder-gray-400"
            />
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              Get Started
            </Button>
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
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Privacy
                  </a>
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
