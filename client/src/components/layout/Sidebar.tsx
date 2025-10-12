import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  BarChart3,
  Info,
  Bell,
  User,
  Users,
  Settings as SettingsIcon,
  ChevronRight,
  ChevronDown,
  Building2,
  UserCheck,
  List,
  Target,
  Database,
  KeyRound,
  MessageSquare,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navItems = [
  { href: "/dealer-info", label: "Dealer Info", icon: Info },
  { href: "/dealer-notification", label: "Dealer Notification", icon: Bell },
];

const profileItems = [
  { href: "/appointment/history", label: "Appointment History" },
  { href: "/my-statistics", label: "My Stats" },
  { href: "/call-history", label: "Call History" },
  { href: "/schedule-shift", label: "Schedule & Shift" },
  { href: "/rc-agent-activity", label: "RC - Agent Activity" },
];

const managerItems = [
  { href: "/", label: "Dashboard" },
  { href: "/admin/dealer-list", label: "Dealer List" },
  { href: "/admin/employee-list", label: "User List" },
  { href: "/admin/department-list", label: "Department List" },
  { href: "/admin/scenario-list", label: "Scenario List" },
  { href: "/admin/lead-source", label: "Lead Source" },
  { href: "/admin/dealership-logins", label: "Dealership Logins" },
  { href: "/admin/role-permission", label: "Role & Permission" },
  { href: "/admin/sms-logs", label: "Sms & Logs" },
  { href: "/admin/pending-sms", label: "Pending Sms" },
];

const adminItems = [
  { href: "/admin/dealer-list", label: "Dealer List", icon: Building2 },
  { href: "/admin/employee-list", label: "User List", icon: UserCheck },
  { href: "/admin/department-list", label: "Department List", icon: List },
  { href: "/admin/scenario-list", label: "Scenario List", icon: Target },
  { href: "/admin/lead-source", label: "Lead Source", icon: Database },
  { href: "/admin/dealership-logins", label: "Dealership Logins", icon: KeyRound },
  { href: "/admin/role-permission", label: "Role & Permission", icon: KeyRound },
  { href: "/admin/sms-logs", label: "Sms & Logs", icon: MessageSquare },
  { href: "/admin/pending-sms", label: "Pending Sms", icon: Clock },
];

const settingsItems = [
  { href: "/settings/general", label: "General Settings" },
  { href: "/settings/ring-central", label: "Ring Central Settings" },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 bg-white shadow-lg flex flex-col fixed lg:relative z-50 h-full transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg text-gray-800">TrueBDC</span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <User className="text-gray-400 h-5 w-5" />
            <span className="text-sm text-gray-600">Hi, Admin Admin!</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {/* Main navigation items */}
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isActive(item.href) && "bg-blue-50 text-blue-600"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}

            {/* My Profile Section */}
            <Collapsible open={profileOpen} onOpenChange={setProfileOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center">
                    <User className="mr-3 h-4 w-4" />
                    My Profile
                  </div>
                  {profileOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-8 space-y-1">
                {profileItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        isActive(item.href) && "text-blue-600"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Manager Section */}
            <Collapsible open={managerOpen} onOpenChange={setManagerOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center">
                    <Users className="mr-3 h-4 w-4" />
                    Manager
                  </div>
                  {managerOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-8 space-y-1">
                {managerItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        isActive(item.href) && "text-blue-600"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Admin Section */}
            <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between",
                    location.includes("/admin") && "bg-blue-50 text-blue-600"
                  )}
                >
                  <div className="flex items-center">
                    <SettingsIcon className="mr-3 h-4 w-4" />
                    Admin
                  </div>
                  {adminOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-8 space-y-1">
                {adminItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        isActive(item.href) && "text-blue-600"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Settings Section */}
            <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center">
                    <SettingsIcon className="mr-3 h-4 w-4" />
                    Settings
                  </div>
                  {settingsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-8 space-y-1">
                {settingsItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        isActive(item.href) && "text-blue-600"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </nav>
      </div>
    </>
  );
}
