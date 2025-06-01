# LeadNest - AI-Powered Contact Marketing Assistant

LeadNest is a comprehensive SaaS platform that helps businesses automate and optimize their contact marketing campaigns using artificial intelligence.

## Features

### 🤖 AI-Powered Marketing
- **AI Content Generation**: Generate compelling email content, subject lines, and CTAs
- **Smart Personalization**: Personalize content based on contact behavior and preferences
- **Predictive Analytics**: AI-driven insights for campaign optimization
- **Lead Scoring**: Automatically score contacts based on engagement and profile data

### 📧 Email Marketing
- **Visual Campaign Builder**: Drag-and-drop email editor with pre-built templates
- **Advanced Segmentation**: Segment contacts based on behavior, demographics, and custom fields
- **A/B Testing**: Test different versions of campaigns to optimize performance
- **Automated Workflows**: Set up automated email sequences and triggers

### 📊 Analytics & Insights
- **Real-time Analytics**: Track opens, clicks, conversions, and revenue
- **Performance Benchmarks**: Compare your metrics against industry standards
- **Custom Reports**: Build and export custom analytics reports
- **Revenue Attribution**: Track how campaigns contribute to revenue

### 🔧 Integrations
- **CRM Integration**: Connect with Salesforce, HubSpot, and other CRMs
- **E-commerce**: Integrate with Shopify, WooCommerce, and more
- **API Access**: Full REST API for custom integrations
- **Webhooks**: Real-time event notifications

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Email**: Nodemailer with SMTP
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Payments**: Stripe for subscriptions
- **3D Graphics**: Three.js with React Three Fiber
- **UI Components**: Radix UI primitives with shadcn/ui

## Project Structure

\`\`\`
leadnest/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── (public pages)/    # Public marketing pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page components
│   └── email-templates/  # Email template components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── models/          # Database models
│   ├── auth.ts          # Authentication utilities
│   ├── email.ts         # Email utilities
│   ├── mongodb.ts       # Database connection
│   ├── openai.ts        # AI integration
│   └── stripe.ts        # Payment processing
└── middleware.ts         # Next.js middleware
\`\`\`

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/leadnest.git
   cd leadnest
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in the required environment variables:
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `SMTP_*`: Email configuration
   - `OPENAI_API_KEY`: OpenAI API key
   - `STRIPE_*`: Stripe configuration

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Environment Variables

### Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token signing
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email server configuration

### Optional
- `STRIPE_SECRET_KEY`: For payment processing
- `NEXT_PUBLIC_APP_URL`: Public URL of your application
- `RATE_LIMIT_*`: Rate limiting configuration

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Contacts
- `GET /api/contacts` - Get user contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact
- `POST /api/contacts/import` - Import contacts from CSV

### Campaigns
- `GET /api/campaigns` - Get user campaigns
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign
- `POST /api/campaigns/[id]/send` - Send campaign

### AI Features
- `POST /api/ai/generate-email` - Generate email content
- `POST /api/ai/score-contacts` - Score contact quality
- `POST /api/ai/suggest-reply` - AI reply suggestions

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/campaigns/[id]` - Campaign-specific analytics

## Features by Plan

### Starter ($29/month)
- Up to 1,000 contacts
- 5 email campaigns per month
- Basic segmentation
- AI content suggestions
- Email templates
- Basic analytics

### Professional ($79/month)
- Up to 10,000 contacts
- Unlimited email campaigns
- Advanced segmentation
- AI content generation
- Custom workflows
- Detailed analytics
- A/B testing
- Priority support

### Business ($199/month)
- Unlimited contacts
- Unlimited campaigns
- Advanced AI features
- Custom integrations
- Dedicated account manager
- Advanced analytics & reporting
- Team collaboration tools
- API access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@leadnest.com or join our Discord community.

## Roadmap

- [ ] SMS marketing campaigns
- [ ] Social media integration
- [ ] Advanced automation workflows
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] Advanced AI features
- [ ] More integrations

---

Built with ❤️ by the LeadNest team
