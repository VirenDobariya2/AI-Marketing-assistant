interface WelcomeEmailProps {
  userName: string
  verificationUrl: string
  companyName?: string
}

export function WelcomeEmailTemplate({ userName, verificationUrl, companyName = "LeadNest" }: WelcomeEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          borderBottom: "2px solid #f0f0f0",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            fontSize: "28px",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          Welcome to {companyName}!
        </h1>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px 0" }}>
        <h2
          style={{
            color: "#1f2937",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Hi {userName},
        </h2>

        <p
          style={{
            color: "#4b5563",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "20px",
          }}
        >
          Thank you for joining LeadNest! We're excited to help you transform your email marketing with AI-powered
          tools.
        </p>

        <p
          style={{
            color: "#4b5563",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          To get started, please verify your email address by clicking the button below:
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={verificationUrl}
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "15px 30px",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Verify Email Address
          </a>
        </div>

        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: "1.5",
            marginTop: "20px",
          }}
        >
          If you can't click the button, copy and paste this link into your browser:
          <br />
          <a href={verificationUrl} style={{ color: "#2563eb", wordBreak: "break-all" }}>
            {verificationUrl}
          </a>
        </p>
      </div>

      {/* Features Section */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "30px",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <h3
          style={{
            color: "#1f2937",
            fontSize: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          What you can do with LeadNest:
        </h3>

        <div style={{ display: "grid", gap: "15px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "14px",
              }}
            >
              ✓
            </span>
            <span style={{ color: "#4b5563", fontSize: "16px" }}>Generate AI-powered email content</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "14px",
              }}
            >
              ✓
            </span>
            <span style={{ color: "#4b5563", fontSize: "16px" }}>Manage contacts and segments</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "14px",
              }}
            >
              ✓
            </span>
            <span style={{ color: "#4b5563", fontSize: "16px" }}>Track campaign performance</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                backgroundColor: "#10b981",
                color: "#ffffff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "15px",
                fontSize: "14px",
              }}
            >
              ✓
            </span>
            <span style={{ color: "#4b5563", fontSize: "16px" }}>Access professional templates</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "2px solid #f0f0f0",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            margin: "0 0 10px 0",
          }}
        >
          Need help? Contact our support team at{" "}
          <a href={`mailto:${process.env.SUPPORT_EMAIL}`} style={{ color: "#2563eb" }}>
            {process.env.SUPPORT_EMAIL}
          </a>
        </p>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "12px",
            margin: "0",
          }}
        >
          © 2024 LeadNest. All rights reserved.
        </p>
      </div>
    </div>
  )
}
