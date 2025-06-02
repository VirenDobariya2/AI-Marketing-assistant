"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [name]
 * @property {string} [role]
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isLoading
 * @property {(email: string, password: string) => Promise<boolean>} signin
 * @property {(email: string, password: string, name: string) => Promise<boolean>} signup
 * @property {() => Promise<void>} signout
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // Return default values if context is not available
    return {
      user: null,
      isLoading: false,
      signin: async () => false,
      signup: async () => false,
      signout: async () => {},
    }
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signin = async (email, password) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        toast({ title: "Success", description: "Signed in successfully!" })
        router.push("/dashboard")
        return true
      } else {
        toast({ title: "Error", description: data.error || "Sign in failed", variant: "destructive" })
        return false
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error occurred", variant: "destructive" })
      return false
    }
  }

  const signup = async (email, password, name) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Success", description: "Account created successfully! Please verify your email." })
        router.push("/auth/verify")
        return true
      } else {
        toast({ title: "Error", description: data.error || "Signup failed", variant: "destructive" })
        return false
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error occurred", variant: "destructive" })
      return false
    }
  }

  const signout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" })
      setUser(null)
      router.push("/")
      toast({ title: "Success", description: "Signed out successfully!" })
    } catch (error) {
      console.error("Signout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signin, signup, signout }}>{children}</AuthContext.Provider>
}
