"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  FolderOpen, 
  Users, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

// Type for menu items
type MenuItem = {
  title: string
  icon: React.ReactNode
  path?: string
  badge?: number | string
  submenu?: MenuItem[]
}

// Props for the component
interface CollapsibleSidebarProps {
  isLoggedIn: boolean
}

export function DashboardNav({ isLoggedIn }: CollapsibleSidebarProps) {
  const pathname = usePathname()
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})
  const [collapsed, setCollapsed] = useState(false)

  // Don't render the sidebar if user is not logged in
  if (!isLoggedIn) {
    return null
  }

  // Toggle submenu open/closed state
  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Toggle sidebar collapsed state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  // Menu configuration
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard"
    },
    {
      title: "Files",
      icon: <FolderOpen className="h-5 w-5" />,
      path: "/files",
      submenu: [
        {
          title: "Recent",
          path: "/files/recent",
          badge: 8,
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "Sent",
          path: "/files/sent",
          badge: 2,
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "Uploaded",
          path: "/files/uploaded",
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "Draft",
          path: "/files/draft",
          badge: 4,
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "Deleted",
          path: "/files/deleted",
          badge: 6,
          icon: <FileText className="h-5 w-5" />
        }
      ]
    },
  ]

  // Footer menu items
  const footerMenuItems: MenuItem[] = [
    {
      title: "Help",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/help"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings"
    }
  ]

  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 py-3">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"> */}
              {/* <span className="text-sm font-medium">I</span> */}
            {/* </div> */}
            <span className="text-lg font-semibold">Tavio</span>
          </div>
        )}
        {/* {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-medium">IS</span>
          </div>
        )} */}
        <button 
          onClick={toggleCollapsed}
          className={cn(
            "flex h-8 w-8 items-center justify-center  rounded-md hover:bg-muted",
            collapsed && "mx-auto"
          )}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      
      {/* Main menu */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {!item.submenu ? (
                <Link 
                  href={item.path || "#"}
                  className={cn(
                    "flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                    pathname === item.path 
                      ? "bg-muted text-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/10 text-xs font-medium">
                      {item.badge}
                    </div>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.title)}
                    className={cn(
                      "flex h-10 w-full items-center rounded-md px-3 text-sm font-medium transition-colors",
                      openSubMenus[item.title] ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                      {item.icon}
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <div className="ml-auto flex items-center">
                        {item.badge && (
                          <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/10 text-xs font-medium">
                            {item.badge}
                          </div>
                        )}
                        {openSubMenus[item.title] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </button>
                  
                  {openSubMenus[item.title] && !collapsed && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 pl-4 border-l border-border">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.path || "#"}
                          className={cn(
                            "flex h-8 items-center rounded-md px-3 text-sm transition-colors",
                            pathname === subItem.path 
                              ? "bg-muted text-foreground" 
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{subItem.title}</span>
                          {subItem.badge && (
                            <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/10 text-xs font-medium">
                              {subItem.badge}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Footer menu */}
      <div className="border-t px-3 py-2">
        <nav className="flex flex-col gap-1">
          {footerMenuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path || "#"}
              className={cn(
                "flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
                pathname === item.path 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            </Link>
          ))}
          {/* logout button */}
          {
            !collapsed && (
              <Button variant='outline' className="mt-5" onClick={() => 
                {
                  signOut();
                  toast.success("Logged out successfully!");
                }}>Logout</Button>
            )
          }
          
        </nav>
      </div>
    </div>
  )
} 