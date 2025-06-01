"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client";

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {boolean} isVerified
 * @property {{status: string, plan: string}=} subscription
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} loading
 * @property {(email: string, password: string) => Promise<boolean>} login
 * @property {(userData: any) => Promise<boolean>} signup
 * @property {() => Promise<void>} logout
 * @property {(email: string, otp: string) => Promise<boolean>} verifyOtp
 * @property {(email: string) => Promise<boolean>} forgotPassword
 * @property {(token: string, password: string) => Promise<boolean>} resetPassword

 * @property {() => Promise<void>} refreshUser
 */

/**
 * TypeScript type for User
 */
/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {boolean} isVerified
 * @property {{status: string, plan: string}=} subscription
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} loading
 * @property {(email: string, password: string) => Promise<boolean>} login
 * @property {(userData: any) => Promise<boolean>} signup
 * @property {() => Promise<void>} logout
 * @property {(email: string, otp: string) => Promise<boolean>} verifyOtp
 * @property {(email: string) => Promise<boolean>} forgotPassword
 * @property {(token: string, password: string) => Promise<boolean>} resetPassword
* 
 * @property {() => Promise<void>} refreshUser
 */

// TypeScript interfaces for User and AuthContextType
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  subscription?: {
    status: string;
    plan: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  // updateProfile: (profileData: any) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await apiClient.getProfile()
      if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        (response as any).data &&
        typeof (response as any).data === "object" &&
        "_id" in (response as any).data
      ) {
        setUser((response as any).data)
      } else {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
      }
    } catch (error) {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.signin(email, password)

      if (
        response &&
        typeof response === "object" &&
        "data" in response &&
        response.data &&
        typeof response.data === "object" &&
        "user" in response.data &&
        "token" in response.data
      ) {
        const { user, token } = (response as any).data
        setUser(user)
        localStorage.setItem("authToken", token)
        localStorage.setItem("user", JSON.stringify(user))

        if (!user.isVerified) {
          router.push("/auth/verify")
        } else {
          router.push("/dashboard")
        }

        return true
      } else {
        toast({
          title: "Login Failed",
          description: (response as any).error || "Invalid credentials",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    }
  }

  const signup = async (userData: any) => {
    try {
      const response = await apiClient.signup(
        userData.name,
        userData.email,
        userData.password,
        userData.role
      )

      if (response && typeof response === "object" && "data" in response && (response as any).data) {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account",
        })
        router.push("/auth/verify")
        return true
      } else {
        toast({
          title: "Signup Failed",
          description: (typeof response === "object" && response !== null && "error" in response ? (response as any).error : "Failed to create account"),
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await apiClient.verifyOTP(email, otp)

      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response &&
        (response as any).data &&
        typeof (response as any).data === "object" &&
        "user" in (response as any).data &&
        "token" in (response as any).data
      ) {
        const { user, token } = (response as any).data
        setUser(user)
        localStorage.setItem("authToken", token)
        localStorage.setItem("user", JSON.stringify(user))

        toast({
          title: "Email Verified",
          description: "Your account has been verified successfully",
        })
        router.push("/dashboard")
        return true
      } else {
        toast({
          title: "Verification Failed",
          description: (typeof response === "object" && response !== null && "error" in response ? (response as any).error : "Invalid OTP"),
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "An error occurred during verification",
        variant: "destructive",
      })
      return false
    }
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await apiClient.forgotPassword(email)

      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response &&
        (response as any).data
      ) {
        toast({
          title: "Reset Email Sent",
          description: "Please check your email for password reset instructions",
        })
        return true
      } else {
        toast({
          title: "Request Failed",
          description: (typeof response === "object" && response !== null && "error" in response ? (response as any).error : "Failed to send reset email"),
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "An error occurred while sending reset email",
        variant: "destructive",
      })
      return false
    }
  }

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.resetPassword(token, password)

      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response &&
        (response as any).data
      ) {
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully",
        })
        router.push("/auth/signin")
        return true
      } else {
        toast({
          title: "Reset Failed",
          description: (typeof response === "object" && response !== null && "error" in response ? (response as any).error : "Failed to reset password"),
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "An error occurred while resetting password",
        variant: "destructive",
      })
      return false
    }
  }

  // const updateProfile = async (profileData: any): Promise<boolean> => {
  //   try {
  //     const response = await apiClient.updateProfile(profileData)

  //     if (
  //       typeof response === "object" &&
  //       response !== null &&
  //       "data" in response &&
  //       (response as any).data
  //     ) {
  //       setUser((response as any).data)
  //       localStorage.setItem("user", JSON.stringify((response as any).data))
  //       toast({
  //         title: "Profile Updated",
  //         description: "Your profile has been updated successfully",
  //       })
  //       return true
  //     } else {
  //       toast({
  //         title: "Update Failed",
  //         description: (typeof response === "object" && response !== null && "error" in response ? (response as any).error : "Failed to update profile"),
  //         variant: "destructive",
  //       })
  //       return false
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Update Failed",
  //       description: "An error occurred while updating profile",
  //       variant: "destructive",
  //     })
  //     return false
  //   }
  // }

  const refreshUser = async () => {
    try {
      const response = await apiClient.getProfile()
      if (
        typeof response === "object" &&
        response !== null &&
        "data" in response &&
        (response as any).data
      ) {
        setUser((response as any).data)
        localStorage.setItem("user", JSON.stringify((response as any).data))
      }
    } catch (error) {
      console.error("Failed to refresh user:", error)
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    verifyOtp,
    forgotPassword,
    resetPassword,
    
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
