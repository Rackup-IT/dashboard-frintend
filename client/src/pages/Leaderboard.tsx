import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"appointment" | "call">("appointment");
  
  const [appointmentType, setAppointmentType] = useState("appointment");
  const [monthAppointmentType, setMonthAppointmentType] = useState("appointment");
  const [department, setDepartment] = useState("all-department");
  const [monthDepartment, setMonthDepartment] = useState("all-department");
  const [date, setDate] = useState<Date>(new Date());
  const [monthDate, setMonthDate] = useState<Date>(new Date());
  
  const [callDate, setCallDate] = useState<Date>(new Date());
  const [monthCallDate, setMonthCallDate] = useState<Date>(new Date());

  const departments = [
    "All Department",
    "Sales",
    "B2B",
    "Data Mining",
    "Campaign",
    "Follow Up",
    "Confirmations"
  ];

  const appointmentAgents = [
    { name: "Admin Admin", totalAppointments: 18, dailyAverage: 1.13 },
    { name: "Adrian Mclauighlin", totalAppointments: 402, dailyAverage: 40.2 },
    { name: "Alex Vertus", totalAppointments: 154, dailyAverage: 9.63 },
    { name: "Amanda Jones", totalAppointments: 291, dailyAverage: 18.19 },
    { name: "Andrea Riveros", totalAppointments: 103, dailyAverage: 6.44 },
  ];

  const callAgents = [
    { name: "Adrian Mclauighlin", totalCall: 8, lastCallAt: "2025-10-16 08:03:15", totalCalls: 3336, dailyAverage: 111.2 },
    { name: "Alex Vertus", totalCall: 6, lastCallAt: "2025-10-16 08:05:45", totalCalls: 3458, dailyAverage: 115.27 },
    { name: "Daron Changieux", totalCall: 2, lastCallAt: "2025-10-16 08:01:10", totalCalls: 4457, dailyAverage: 148.57 },
    { name: "John Cial", totalCall: 2, lastCallAt: "2025-10-16 08:00:37", totalCalls: 3140, dailyAverage: 104.67 },
    { name: "Lester Delgado", totalCall: 10, lastCallAt: "2025-10-16 08:08:13", totalCalls: 2954, dailyAverage: 98.47 },
    { name: "Amanda Jones", totalCall: null, lastCallAt: null, totalCalls: 4487, dailyAverage: 149.57 },
    { name: "Jeremy Mora", totalCall: null, lastCallAt: null, totalCalls: 2954, dailyAverage: 98.47 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leaderboard</h1>
          <p className="text-sm text-gray-500">Dashboard / Leaderboard</p>
        </div>
        <Button 
          onClick={() => setLocation("/dealer-notification")}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-add-appointment"
        >
          <Plus className="mr-2 h-4 w-4" />
          Appointment
        </Button>
      </div>

      <div className="text-center py-4 bg-gray-50 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900">
          COMPANY LIFETIME TOTAL APPOINTMENTS : 112109
        </h2>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("appointment")}
          className={cn(
            "px-6 py-3 font-medium text-sm transition-colors",
            activeTab === "appointment"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          data-testid="tab-appointment-leaderboard"
        >
          Appointment Leaderboard
        </button>
        <button
          onClick={() => setActiveTab("call")}
          className={cn(
            "px-6 py-3 font-medium text-sm transition-colors",
            activeTab === "call"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
          data-testid="tab-call-leaderboard"
        >
          Call Leaderboard
        </button>
      </div>

      {activeTab === "appointment" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Total Count : 0</h3>
            
            <div className="space-y-4">
              <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="appointment" id="total-appointment" data-testid="radio-total-appointment" />
                    <Label htmlFor="total-appointment">Appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="followup" id="total-followup" data-testid="radio-total-followup" />
                    <Label htmlFor="total-followup">Follow Ups</Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="bg-white" data-testid="select-total-department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(" ", "-")}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal bg-white",
                        !date && "text-muted-foreground"
                      )}
                      data-testid="button-total-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "MM/dd/yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="bg-white rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Appointments
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Time since last appointment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        No appointment or calls found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Month Total Count : 3041</h3>
            
            <div className="space-y-4">
              <RadioGroup value={monthAppointmentType} onValueChange={setMonthAppointmentType}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="appointment" id="month-appointment" data-testid="radio-month-appointment" />
                    <Label htmlFor="month-appointment">Appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="followup" id="month-followup" data-testid="radio-month-followup" />
                    <Label htmlFor="month-followup">Follow Ups</Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <Select value={monthDepartment} onValueChange={setMonthDepartment}>
                  <SelectTrigger className="bg-white" data-testid="select-month-department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(" ", "-")}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal bg-white",
                        !monthDate && "text-muted-foreground"
                      )}
                      data-testid="button-month-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {monthDate ? format(monthDate, "MMMM yyyy") : "Pick a month"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={monthDate}
                      onSelect={(date) => date && setMonthDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="bg-white rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Appointments
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Daily Average
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentAgents.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.totalAppointments}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.dailyAverage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm" className="bg-blue-600">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">4</Button>
                <Button variant="outline" size="sm">5</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "call" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Total Call Count : 8</h3>
            
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !callDate && "text-muted-foreground"
                    )}
                    data-testid="button-call-total-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {callDate ? format(callDate, "MM/dd/yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={callDate}
                    onSelect={(date) => date && setCallDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="bg-white rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Call
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Last Call At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {callAgents.slice(0, 5).map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.totalCall || "-"}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.lastCallAt || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm" className="bg-blue-600">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Month Call Total Count : 36134</h3>
            
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !monthCallDate && "text-muted-foreground"
                    )}
                    data-testid="button-call-month-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {monthCallDate ? format(monthCallDate, "MMMM yyyy") : "Pick a month"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={monthCallDate}
                    onSelect={(date) => date && setMonthCallDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="bg-white rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Calls
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Daily Average
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {callAgents.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.totalCalls}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{agent.dailyAverage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm" className="bg-blue-600">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
