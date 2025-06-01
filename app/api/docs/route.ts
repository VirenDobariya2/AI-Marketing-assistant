import { NextResponse } from "next/server"

const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "LeadNest API",
    version: "1.0.0",
    description: "AI-powered contact marketing assistant API",
    contact: {
      name: "LeadNest Support",
      email: process.env.SUPPORT_EMAIL,
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL,
      description: "Production server",
    },
  ],
  paths: {
    "/api/auth/signup": {
      post: {
        summary: "User Registration",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 8 },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        userId: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: "Validation error" },
          409: { description: "User already exists" },
        },
      },
    },
    "/api/contacts": {
      get: {
        summary: "List Contacts",
        tags: ["Contacts"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 20 },
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Contacts retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          name: { type: "string" },
                          email: { type: "string" },
                          phone: { type: "string" },
                          tags: { type: "array", items: { type: "string" } },
                          engagementScore: { type: "number" },
                        },
                      },
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        limit: { type: "integer" },
                        total: { type: "integer" },
                        pages: { type: "integer" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create Contact",
        tags: ["Contacts"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  phone: { type: "string" },
                  company: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["name", "email"],
              },
            },
          },
        },
        responses: {
          201: { description: "Contact created successfully" },
          400: { description: "Validation error" },
        },
      },
    },
    "/api/ai/generate-email": {
      post: {
        summary: "Generate AI Email",
        tags: ["AI Tools"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  prompt: { type: "string" },
                  tone: { type: "string", enum: ["professional", "casual", "friendly", "urgent"] },
                  type: { type: "string", enum: ["newsletter", "promotional", "welcome", "follow-up"] },
                  contactName: { type: "string" },
                  companyName: { type: "string" },
                },
                required: ["prompt", "tone", "type"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Email generated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "object",
                      properties: {
                        subject: { type: "string" },
                        content: { type: "string" },
                        suggestions: { type: "array", items: { type: "string" } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
}

export async function GET() {
  return NextResponse.json(openApiSpec)
}
