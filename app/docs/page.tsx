"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Copy, ExternalLink, Book, Zap, Shield, Users } from "lucide-react"

export default function APIDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      method: "POST",
      path: "/api/auth/signup",
      description: "Register a new user account",
      category: "Authentication",
      requestBody: {
        name: "string",
        email: "string",
        password: "string (min 8 chars)",
      },
      response: {
        success: "boolean",
        message: "string",
        data: { userId: "string", email: "string" },
      },
    },
    {
      method: "POST",
      path: "/api/auth/signin",
      description: "Authenticate user and get JWT token",
      category: "Authentication",
      requestBody: {
        email: "string",
        password: "string",
      },
      response: {
        success: "boolean",
        data: { user: "object", token: "string" },
      },
    },
    {
      method: "GET",
      path: "/api/contacts",
      description: "List contacts with pagination and filtering",
      category: "Contacts",
      headers: { Authorization: "Bearer <token>" },
      queryParams: {
        page: "number (default: 1)",
        limit: "number (default: 20)",
        search: "string",
        tags: "string[]",
      },
      response: {
        success: "boolean",
        data: "Contact[]",
        pagination: "object",
      },
    },
    {
      method: "POST",
      path: "/api/ai/generate-email",
      description: "Generate AI-powered email content",
      category: "AI Tools",
      headers: { Authorization: "Bearer <token>" },
      requestBody: {
        prompt: "string",
        tone: "professional | casual | friendly | urgent",
        type: "newsletter | promotional | welcome | follow-up",
        contactName: "string (optional)",
        companyName: "string (optional)",
      },
      response: {
        success: "boolean",
        data: {
          subject: "string",
          content: "string",
          suggestions: "string[]",
        },
      },
    },
  ]

  const codeExamples = {
    javascript: `// Sign up a new user
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword123'
  })
});

const data = await response.json();
console.log(data);`,

    curl: `# Sign up a new user
curl -X POST \\
  https://your-domain.com/api/auth/signup \\
  -H 'Content-Type: application/json' \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'`,

    python: `import requests

# Sign up a new user
response = requests.post(
    'https://your-domain.com/api/auth/signup',
    json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'password': 'securepassword123'
    }
)

data = response.json()
print(data)`,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">LeadNest API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive API documentation for integrating with LeadNest's AI-powered email marketing platform
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="outline" className="px-3 py-1">
              <Zap className="h-4 w-4 mr-1" />
              REST API
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Shield className="h-4 w-4 mr-1" />
              JWT Auth
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Book className="h-4 w-4 mr-1" />
              OpenAPI 3.0
            </Badge>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start
            </CardTitle>
            <CardDescription>Get started with the LeadNest API in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Sign Up</h3>
                <p className="text-sm text-gray-600">Create your LeadNest account and get API access</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Authenticate</h3>
                <p className="text-sm text-gray-600">Get your JWT token via the signin endpoint</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Start Building</h3>
                <p className="text-sm text-gray-600">Make API calls and integrate with your app</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="errors">Error Handling</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="grid gap-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={endpoint.method === "GET" ? "default" : "secondary"}
                          className={
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : endpoint.method === "POST"
                                ? "bg-blue-100 text-blue-800"
                                : endpoint.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <Badge variant="outline">{endpoint.category}</Badge>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {endpoint.headers && (
                        <div>
                          <h4 className="font-semibold mb-2">Headers</h4>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <code className="text-sm">{JSON.stringify(endpoint.headers, null, 2)}</code>
                          </div>
                        </div>
                      )}

                      {endpoint.queryParams && (
                        <div>
                          <h4 className="font-semibold mb-2">Query Parameters</h4>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <code className="text-sm">{JSON.stringify(endpoint.queryParams, null, 2)}</code>
                          </div>
                        </div>
                      )}

                      {endpoint.requestBody && (
                        <div>
                          <h4 className="font-semibold mb-2">Request Body</h4>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <code className="text-sm">{JSON.stringify(endpoint.requestBody, null, 2)}</code>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">Response</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-sm">{JSON.stringify(endpoint.response, null, 2)}</code>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(codeExamples).map(([language, code]) => (
                <Card key={language}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize">{language}</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(code, language)}>
                        {copiedCode === language ? (
                          "Copied!"
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JWT Authentication</CardTitle>
                <CardDescription>LeadNest uses JWT tokens for API authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Get Token</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    First, authenticate with your credentials to get a JWT token:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <code className="text-sm">
                      POST /api/auth/signin
                      <br />
                      Content-Type: application/json
                      <br />
                      <br />
                      {JSON.stringify({ email: "your@email.com", password: "yourpassword" }, null, 2)}
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. Use Token</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Include the token in the Authorization header for protected endpoints:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <code className="text-sm">Authorization: Bearer YOUR_JWT_TOKEN</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Token Expiry</h4>
                  <p className="text-sm text-gray-600">
                    JWT tokens expire after 24 hours. You'll need to refresh or re-authenticate when they expire.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Handling</CardTitle>
                <CardDescription>Understanding API error responses and status codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">HTTP Status Codes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <code className="font-mono">200 OK</code>
                        <span className="text-sm">Request successful</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <code className="font-mono">201 Created</code>
                        <span className="text-sm">Resource created successfully</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <code className="font-mono">400 Bad Request</code>
                        <span className="text-sm">Invalid request data</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <code className="font-mono">401 Unauthorized</code>
                        <span className="text-sm">Authentication required</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <code className="font-mono">403 Forbidden</code>
                        <span className="text-sm">Insufficient permissions</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <code className="font-mono">429 Too Many Requests</code>
                        <span className="text-sm">Rate limit exceeded</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <code className="font-mono">500 Internal Server Error</code>
                        <span className="text-sm">Server error</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Error Response Format</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <code className="text-sm">
                        {JSON.stringify(
                          {
                            success: false,
                            message: "Error description",
                            errors: ["Detailed error messages"],
                            code: "ERROR_CODE",
                          },
                          null,
                          2,
                        )}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Rate Limiting</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      API requests are rate limited. When you exceed the limit, you'll receive a 429 status code with
                      headers:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <code className="text-sm">
                        X-RateLimit-Limit: 100
                        <br />
                        X-RateLimit-Remaining: 0<br />
                        X-RateLimit-Reset: 1640995200
                        <br />
                        Retry-After: 60
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-gray-600 mb-4">
            Need help? Check out our{" "}
            <Button variant="link" className="p-0 h-auto">
              <ExternalLink className="h-4 w-4 mr-1" />
              Support Center
            </Button>{" "}
            or contact us at{" "}
            <a href={`mailto:${process.env.SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
              {process.env.SUPPORT_EMAIL}
            </a>
          </p>
          <Button asChild>
            <a href="/api/docs" target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View OpenAPI Spec
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
