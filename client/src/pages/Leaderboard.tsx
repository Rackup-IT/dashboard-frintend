import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"appointment" | "call">(
    "appointment"
  );

  const [appointmentType, setAppointmentType] = useState("appointment");
  const [monthAppointmentType, setMonthAppointmentType] =
    useState("appointment");
  const [department, setDepartment] = useState("all-department");
  const [monthDepartment, setMonthDepartment] = useState("all-department");
  const [date, setDate] = useState<Date>(new Date());
  const [monthDate, setMonthDate] = useState<Date>(new Date());

  const [callDate, setCallDate] = useState<Date>(new Date());
  const [monthCallDate, setMonthCallDate] = useState<Date>(new Date());
  const [appointmentAgents, setAppointmentAgents] = useState([]);
  const [monthlyAppointmentAgents, setMonthlyAppointmentAgents] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [allAppointments, setAllAppointments] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [monthlyTotalPages, setMonthlyTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [monthlyPage, setMonthlyPage] = useState(1);
  useEffect(() => {
    loadData();
  }, [appointmentType, department]);
  const loadData = () => {
    apiRequest(
      "GET",
      `dashboard/leaderboard?type=${appointmentType}&department=${department}`
    ).then((data) => {
      setAppointmentAgents(data.leaderboard);
      setAllAppointments(data.totalAppointments);
      setTotalPages(data.totalPages);
    });
    apiRequest("GET", "department/get-all").then((data) => {
      const deptNames = data.departments.map((dept) => dept.name);
      setDepartments(["All Department", ...deptNames]);
    });
  };
  useEffect(() => {
    loadMonthlyData();
  }, [monthAppointmentType, monthDepartment, monthDate]);

  const loadMonthlyData = () => {
    apiRequest(
      "GET",
      `dashboard/leaderboard?type=${monthAppointmentType}&department=${monthDepartment}&month=${
        monthDate?.getMonth() + 1
      }&date=${monthDate?.getFullYear()}`
    ).then((data) => {
      setMonthlyAppointmentAgents(data.leaderboard);
      setMonthlyTotalPages(data.totalPages);
    });
  };

  const callAgents = [];

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
          COMPANY LIFETIME TOTAL APPOINTMENTS : {allAppointments}
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
        {/* <button
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
        </button> */}
      </div>

      {activeTab === "appointment" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              Total Count :{appointmentAgents.length}
            </h3>

            <div className="space-y-4">
              <RadioGroup
                value={appointmentType}
                onValueChange={setAppointmentType}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="appointment"
                      id="total-appointment"
                      data-testid="radio-total-appointment"
                    />
                    <Label htmlFor="total-appointment">Appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="follow-up"
                      id="total-followup"
                      data-testid="radio-total-followup"
                    />
                    <Label htmlFor="total-followup">Follow Ups</Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger
                    className="bg-white"
                    data-testid="select-total-department"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept}
                        value={dept.toLowerCase().replace(" ", "-")}
                      >
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
                    {appointmentAgents.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.agentName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.totalAppointments}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.timeSinceLastAppointment || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          </Card>

          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              Month Total Count :{monthlyAppointmentAgents.length}
            </h3>

            <div className="space-y-4">
              <RadioGroup
                value={monthAppointmentType}
                onValueChange={setMonthAppointmentType}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="appointment"
                      id="month-appointment"
                      data-testid="radio-month-appointment"
                    />
                    <Label htmlFor="month-appointment">Appointment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="follow-up"
                      id="month-followup"
                      data-testid="radio-month-followup"
                    />
                    <Label htmlFor="month-followup">Follow Ups</Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={monthDepartment}
                  onValueChange={setMonthDepartment}
                >
                  <SelectTrigger
                    className="bg-white"
                    data-testid="select-month-department"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept}
                        value={dept.toLowerCase().replace(" ", "-")}
                      >
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
                      {monthDate
                        ? format(monthDate, "MMMM yyyy")
                        : "Pick a month"}
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
                    {monthlyAppointmentAgents.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.agentName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.totalAppointments}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.dailyAverage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                totalPages={monthlyTotalPages}
                currentPage={monthlyPage}
                onPageChange={setMonthlyPage}
              />
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
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.totalCall || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.lastCallAt || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">
              Month Call Total Count : 36134
            </h3>

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
                    {monthCallDate
                      ? format(monthCallDate, "MMMM yyyy")
                      : "Pick a month"}
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
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.totalCalls}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {agent.dailyAverage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
