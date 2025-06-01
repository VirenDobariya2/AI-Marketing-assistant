interface PasswordResetEmailProps {
  userName: string
  resetUrl: string
  expiryTime: string
}

export function PasswordResetEmailTemplate({ userName, resetUrl, expiryTime }: PasswordResetEmailProps) {
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
            color: "#dc2626",
            fontSize: "28px",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          Password Reset Request
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
          We received a request to reset your password for your LeadNest account.
        </p>

        <p
          style={{
            color: "#4b5563",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Click the button below to reset your password:
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={resetUrl}
            style={{
              backgroundColor: "#dc2626",
              color: "#ffffff",
              padding: "15px 30px",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Reset Password
          </a>
        </div>

        {/* Security Notice */}
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "8px",
            padding: "20px",
            margin: "30px 0",
          }}
        >
          <h3
            style={{
              color: "#92400e",
              fontSize: "18px",
              margin: "0 0 10px 0",
            }}
          >
            ⚠️ Security Notice
          </h3>
          <p
            style={{
              color: "#92400e",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            This password reset link will expire in {expiryTime}. If you didn't request this reset, please ignore this
            email or contact our support team.
          </p>
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
          <a href={resetUrl} style={{ color: "#dc2626", wordBreak: "break-all" }}>
            {resetUrl}
          </a>
        </p>
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
          <a href={`mailto:${process.env.SUPPORT_EMAIL}`} style={{ color: "#dc2626" }}>
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
