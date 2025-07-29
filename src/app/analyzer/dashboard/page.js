"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Globe,
  Shield,
  Zap,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  RefreshCw,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

// Helper function to manage the session ID (web_analyses.id) in localStorage
const getSessionId = () => localStorage.getItem("currentAnalysisId")
const setSessionId = (id) => localStorage.setItem("currentAnalysisId", id)
const clearSessionId = () => localStorage.removeItem("currentAnalysisId")

export default function Dashboard() {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Function to fetch a specific analysis by its ID
  const fetchAnalysisById = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`https://webanalyzer-veridia.onrender.com/web-analyzer/${id}`)
      setAnalysisData(response.data)
    } catch (err) {
      console.error("Error fetching analysis:", err)
      setError(err)
      clearSessionId()
      setAnalysisData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Effect to load existing session ID and fetch data on component mount
  useEffect(() => {
    const storedId = getSessionId()
    if (storedId) {
      fetchAnalysisById(storedId)
    } else {
      setAnalysisData(null)
      setLoading(false)
    }
  }, [fetchAnalysisById])

  const handleRefresh = () => {
    const storedId = getSessionId()
    if (storedId) {
      fetchAnalysisById(storedId)
    }
  }

  const handleExport = () => {
    if (analysisData) {
      const content = `# Website Analysis Report\n\n**URL:** ${analysisData.url}\n**Analysis Type:** ${analysisData.requestPrompt || "General Analysis"}\n**Date:** ${new Date().toLocaleDateString()}\n\n## Analysis Results\n\n${analysisData.analysisSummary}`
      const blob = new Blob([content], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `website-analysis-${new Date().getTime()}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:text-orange-500">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analyzer
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6 bg-red-900/30" />
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Analysis Results
                </div>
                <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
            </div>

            {analysisData && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="border-red-700 text-white hover:bg-red-900/20 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="border-orange-700 text-white hover:bg-orange-900/20 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <Card className="bg-gradient-to-br from-orange-900/20 to-black border-orange-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500 mr-3" />
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Loading Analysis Results...</p>
                  <p className="text-gray-400 text-sm mt-1">Please wait while we fetch your data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-gradient-to-br from-red-900/40 to-black border-red-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <AlertCircle className="h-8 w-8 text-red-400 mr-3" />
                <div className="text-center">
                  <p className="text-red-400 font-semibold text-lg">Error Loading Analysis</p>
                  <p className="text-gray-400 text-sm mt-1">{error.message}</p>
                  <Button
                    onClick={handleRefresh}
                    className="mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisData && !loading && (
          <div className="space-y-6">
            {/* Analysis Header */}
            <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-900/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white flex items-center text-2xl mb-2">
                      <Globe className="h-6 w-6 mr-3 text-orange-500" />
                      Website Analysis Report
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base">
                      Comprehensive AI-powered analysis results
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {analysisData.status || "Complete"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-400">Analyzed URL:</span>
                    </div>
                    <a
                      href={analysisData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 transition-colors break-all font-mono text-sm"
                    >
                      {analysisData.url}
                    </a>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-400">Analysis Type:</span>
                    </div>
                    <p className="text-white font-medium">{analysisData.requestPrompt || "General Website Analysis"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-orange-900/20 to-black border-orange-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Zap className="h-8 w-8 text-orange-500" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-400">Performance</p>
                      <p className="text-lg font-semibold text-white">Analyzed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-red-500" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-400">Security</p>
                      <p className="text-lg font-semibold text-white">Checked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/20 to-black border-orange-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Globe className="h-8 w-8 text-orange-500" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-400">SEO</p>
                      <p className="text-lg font-semibold text-white">Reviewed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-900/30">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-red-500" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-400">Insights</p>
                      <p className="text-lg font-semibold text-white">Generated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Analysis Content */}
            {analysisData.analysisSummary && (
              <Card className="bg-gradient-to-br from-red-900/10 to-black border-red-900/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-xl">
                    <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
                    AI Analysis Summary
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Detailed insights and recommendations powered by Gemini AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div
                      className="text-gray-200 leading-relaxed
                                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-orange-400 [&_h1]:border-b [&_h1]:border-red-900/30 [&_h1]:pb-3
                                  [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4 [&_h2]:text-orange-300 [&_h2]:mt-8
                                  [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-3 [&_h3]:text-red-300 [&_h3]:mt-6
                                  [&_h4]:text-lg [&_h4]:font-medium [&_h4]:mb-2 [&_h4]:text-orange-200
                                  [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-200
                                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
                                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
                                  [&_li]:text-gray-200 [&_li]:leading-relaxed
                                  [&_strong]:font-bold [&_strong]:text-orange-300
                                  [&_em]:italic [&_em]:text-red-300
                                  [&_code]:bg-red-900/30 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-orange-300 [&_code]:font-mono [&_code]:text-sm
                                  [&_pre]:bg-red-900/20 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-red-900/30
                                  [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:bg-orange-900/10 [&_blockquote]:py-2
                                  [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-red-900/30 [&_table]:rounded-lg [&_table]:overflow-hidden
                                  [&_th]:bg-red-900/30 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-orange-300 [&_th]:border-b [&_th]:border-red-900/30
                                  [&_td]:p-3 [&_td]:border-b [&_td]:border-red-900/20 [&_td]:text-gray-200
                                  [&_a]:text-orange-400 [&_a]:hover:text-orange-300 [&_a]:underline [&_a]:transition-colors"
                    >
                      <ReactMarkdown>{analysisData.analysisSummary}</ReactMarkdown>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex-1 sm:flex-none">
                  Analyze Another Website
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleExport}
                className="border-red-700 text-white hover:bg-red-900/20 bg-transparent flex-1 sm:flex-none"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="border-orange-700 text-white hover:bg-orange-900/20 bg-transparent flex-1 sm:flex-none"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysisData && !loading && !error && (
          <Card className="bg-gradient-to-br from-red-900/10 to-black border-red-900/20">
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-3">No Analysis Data Found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  No analysis data is available for this session. Please start a new analysis from the main page.
                </p>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Start New Analysis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
