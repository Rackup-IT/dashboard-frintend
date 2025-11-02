import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { User, Lock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

type TabType = "schedule" | "password" | "profile";

interface ShiftTime {
  day: string;
  startTime: string;
  endTime: string;
  lunchStart: string;
  lunchEnd: string;
}

export default function ScheduleShift() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Profile form state
  const [name, setName] = useState("Admin Admin");
  const [email, setEmail] = useState("manager@truebdc.com");
  const [phone, setPhone] = useState("+15618926919");

  // Schedule state
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [shiftTimes, setShiftTimes] = useState<ShiftTime[]>([]);

  // Time picker states
  const [timePickerOpen, setTimePickerOpen] = useState<{day: string; field: string} | null>(null);

  // Handle date selection
  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setSelectedDates(dates);
      // Create shift entries for selected dates
      const newShifts: ShiftTime[] = dates.map(date => ({
        day: format(date, "MM/dd/yyyy"),
        startTime: "8:00 AM",
        endTime: "5:00 PM",
        lunchStart: "2:00 PM",
        lunchEnd: "3:00 PM"
      }));
      setShiftTimes(newShifts);
    }
  };

  // Time picker component
  const TimePicker = ({ value, onChange }: { value: string; onChange: (time: string) => void }) => {
    const [hour, setHour] = useState(value.split(":")[0] || "12");
    const [minute, setMinute] = useState(value.split(":")[1]?.split(" ")[0] || "00");
    const [period, setPeriod] = useState(value.includes("PM") ? "PM" : "AM");

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

    const handleApply = () => {
      onChange(`${hour}:${minute} ${period}`);
      setTimePickerOpen(null);
    };

    return (
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Hour</Label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              data-testid="select-hour"
            >
              {hours.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <Label className="text-xs">Minute</Label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              data-testid="select-minute"
            >
              {minutes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <Label className="text-xs">Period</Label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              data-testid="select-period"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <Button 
          onClick={handleApply} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          data-testid="button-apply-time"
        >
          Apply
        </Button>
      </div>
    );
  };

  const updateShiftTime = (index: number, field: keyof ShiftTime, value: string) => {
    const newShifts = [...shiftTimes];
    newShifts[index][field] = value;
    setShiftTimes(newShifts);
  };

  const renderScheduleContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Schedule</Label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <div 
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg cursor-pointer transition-colors min-h-[60px] flex items-center"
              data-testid="button-open-calendar"
            >
              <p className="text-sm text-gray-700">
                {selectedDates.length > 0 
                  ? selectedDates.map(d => format(d, "MM/dd/yyyy")).join(", ")
                  : "Click to select dates"}
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <Label className="text-base font-semibold mb-3 block">Shift</Label>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center font-semibold">Day</TableHead>
                <TableHead className="text-center font-semibold">Start Time</TableHead>
                <TableHead className="text-center font-semibold">End Time</TableHead>
                <TableHead className="text-center font-semibold">Lunch Start Time</TableHead>
                <TableHead className="text-center font-semibold">Lunch End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shiftTimes.length > 0 ? (
                shiftTimes.map((shift, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{shift.day}</TableCell>
                    <TableCell className="text-center">
                      <Popover 
                        open={timePickerOpen?.day === shift.day && timePickerOpen?.field === "startTime"}
                        onOpenChange={(open) => !open && setTimePickerOpen(null)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 border-gray-300"
                            onClick={() => setTimePickerOpen({day: shift.day, field: "startTime"})}
                            data-testid={`button-start-time-${index}`}
                          >
                            {shift.startTime}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <TimePicker 
                            value={shift.startTime}
                            onChange={(time) => updateShiftTime(index, "startTime", time)}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center">
                      <Popover 
                        open={timePickerOpen?.day === shift.day && timePickerOpen?.field === "endTime"}
                        onOpenChange={(open) => !open && setTimePickerOpen(null)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-200 border-gray-300"
                            onClick={() => setTimePickerOpen({day: shift.day, field: "endTime"})}
                            data-testid={`button-end-time-${index}`}
                          >
                            {shift.endTime}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <TimePicker 
                            value={shift.endTime}
                            onChange={(time) => updateShiftTime(index, "endTime", time)}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center">
                      <Popover 
                        open={timePickerOpen?.day === shift.day && timePickerOpen?.field === "lunchStart"}
                        onOpenChange={(open) => !open && setTimePickerOpen(null)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-gray-900"
                            onClick={() => setTimePickerOpen({day: shift.day, field: "lunchStart"})}
                            data-testid={`button-lunch-start-${index}`}
                          >
                            {shift.lunchStart}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <TimePicker 
                            value={shift.lunchStart}
                            onChange={(time) => updateShiftTime(index, "lunchStart", time)}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center">
                      <Popover 
                        open={timePickerOpen?.day === shift.day && timePickerOpen?.field === "lunchEnd"}
                        onOpenChange={(open) => !open && setTimePickerOpen(null)}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-gray-900"
                            onClick={() => setTimePickerOpen({day: shift.day, field: "lunchEnd"})}
                            data-testid={`button-lunch-end-${index}`}
                          >
                            {shift.lunchEnd}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <TimePicker 
                            value={shift.lunchEnd}
                            onChange={(time) => updateShiftTime(index, "lunchEnd", time)}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Select dates above to create shift schedule
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            data-testid="button-change-schedule-shift"
          >
            Change Schedule & Shift
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPasswordContent = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1"
            data-testid="input-current-password"
          />
        </div>

        <div>
          <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1"
            data-testid="input-new-password"
          />
        </div>

        <div>
          <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1"
            data-testid="input-confirm-password"
          />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-base">Password requirements:</h4>
        <p className="text-sm text-gray-600 mb-3">Ensure that these requirements are met:</p>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            Lowercase & Uppercase
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            Number (0-9)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            Special Character (!@#$%^&*)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            Atleast 8 Character
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          data-testid="button-change-password"
        >
          Change Password
        </Button>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-6">
        <div className="flex flex-col items-start">
          <Label className="text-sm font-medium mb-2">Profile</Label>
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <svg 
              className="w-16 h-16 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
              data-testid="input-name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">Phone (Optional)</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              data-testid="input-phone"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          data-testid="button-update-profile"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );

  const getBreadcrumb = () => {
    switch (activeTab) {
      case "password":
        return "Dashboard / Change Password";
      case "profile":
        return "Dashboard / My Account";
      default:
        return "Dashboard / Schedule & Shift";
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "password":
        return "Change Password";
      case "profile":
        return "Basic Info";
      default:
        return "Schedule & Shift";
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar Navigation */}
      <div className="w-64 space-y-1">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors text-sm ${
            activeTab === "profile" 
              ? "bg-blue-50 text-blue-600 font-medium" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
          data-testid="nav-profile-setting"
        >
          <User className="h-4 w-4" />
          Profile Setting
        </button>
        
        <button
          onClick={() => setActiveTab("password")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors text-sm ${
            activeTab === "password" 
              ? "bg-blue-50 text-blue-600 font-medium" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
          data-testid="nav-change-password"
        >
          <Lock className="h-4 w-4" />
          Change Password
        </button>
        
        <button
          onClick={() => setActiveTab("schedule")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors text-sm ${
            activeTab === "schedule" 
              ? "bg-blue-50 text-blue-600 font-medium" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
          data-testid="nav-schedule-shift"
        >
          <CalendarIcon className="h-4 w-4" />
          Schedule & Shift
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              {activeTab === "schedule" && <CalendarIcon className="h-5 w-5" />}
              {activeTab === "password" && <Lock className="h-5 w-5" />}
              {activeTab === "profile" && <User className="h-5 w-5" />}
              <div>
                <CardTitle className="text-lg">{getTitle()}</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {getBreadcrumb()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {activeTab === "schedule" && renderScheduleContent()}
            {activeTab === "password" && renderPasswordContent()}
            {activeTab === "profile" && renderProfileContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
