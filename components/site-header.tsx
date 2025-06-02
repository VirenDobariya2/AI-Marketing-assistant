"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
  
export function SiteHeader() {
  const pathname = usePathname()
  // Remove the existing useState and useEffect for authentication
  // Replace with:
  const { user, logout } = useAuth()
  const isLoggedIn = !!user
  const { theme } = useTheme()

  // Remove the existing useEffect and authentication logic
  // useEffect(() => {
  //   // Check if user is logged in
  //   const token = localStorage.getItem("authToken")
  //   const storedUser = localStorage.getItem("user")

  //   if (token && storedUser) {
  //     setIsLoggedIn(true)
  //     setUser(JSON.parse(storedUser))
  //   } else {
  //     setIsLoggedIn(false)
  //     setUser(null)
  //   }
  // }, [pathname])

  // Update the handleLogout function:
  const handleLogout = async () => {
    await logout()
  }

  // Navigation items before login
  const publicNavItems = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Blog", href: "/blog" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
  ]

  // Navigation items after login - for dashboard
  const dashboardNavItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Leads", href: "/dashboard/leads" },
    { title: "Campaigns", href: "/dashboard/campaigns" },
    { title: "Analytics", href: "/dashboard/analytics" },
    { title: "Integrations", href: "/dashboard/integrations" },
  ]

  // Choose which nav items to display based on login status and path
  const navItems = isLoggedIn && pathname.includes("/dashboard") ? dashboardNavItems : publicNavItems

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="mb-4">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">Lead</span>
                    <span>Nest</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-sm font-medium ${
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      } hover:text-primary`}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
                {!isLoggedIn && (
                  <>
                    <SheetClose asChild>
                      <Link href="/auth/signin">
                        <Button variant="outline" size="sm" className="w-full">
                          Log In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/auth/signup">
                        <Button size="sm" className="w-full">
                          Sign Up
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Lead</span>
            <span>Nest</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              } hover:text-primary`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-default" disabled>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuItem>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
