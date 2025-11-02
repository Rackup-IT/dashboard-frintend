import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Menu, ChevronDown, User, LogOut } from "lucide-react";
import { useLocation } from "wouter";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dealer-info": "Dealer Info",
  "/dealer-notification": "Dealer Notification",
  "/appointment/create": "Create Appointment",
  "/appointment/history": "Appointment History",
  "/my-statistics": "My Statistics",
  "/call-history": "My Call Log History",
  "/schedule-shift": "Schedule & Shift",
  "/rc-agent-activity": "RC - Agent Activity",
  "/admin/dealer-list": "Dealer List",
  "/admin/employee-list": "Employee List",
  "/admin/department-list": "Department List",
  "/admin/scenario-list": "Scenario List",
  "/admin/lead-source": "Lead Source List",
  "/admin/dealership-logins": "Dealership List",
  "/admin/role-permission": "Role List",
  "/admin/sms-logs": "Appointment Sms Logs",
  "/admin/pending-sms": "Pending Sms",
  "/settings/general": "General Settings",
};

export default function Header({ onMenuClick }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const title = pageTitles[location] || "Dashboard";

  const handleProfileClick = () => {
    setLocation("/schedule-shift");
  };

  const handleLogout = () => {
    setLocation("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            <div className="text-sm text-gray-500">
              <span>Dashboard</span>
              <span className="mx-1">/</span>
              <span>{title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4 text-gray-400" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                <User className="h-5 w-5 text-gray-400" />
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer" data-testid="menu-profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" data-testid="menu-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
