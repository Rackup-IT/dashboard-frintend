import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Calendar, Phone, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

// Statistics data matching the screenshot
const todayStats = [
  { label: "Total Appointments", value: "0", icon: "📅", color: "bg-green-100" },
  { label: "Avg. Hourly Appointment", value: "0", icon: "📊", color: "bg-green-100" },
  { label: "Total Follow Ups", value: "0", icon: "📞", color: "bg-purple-100" },
  { label: "Avg. Hourly Follow Ups", value: "0", icon: "📈", color: "bg-purple-100" },
];

const todayCallStats = [
  { label: "Total Calls", value: "0", icon: "📞", color: "bg-green-100" },
  { label: "Avg. Hourly Calls", value: "0", icon: "📊", color: "bg-green-100" },
];

const monthToDateStats = [
  { label: "Total Appointments", value: "42", icon: "📅", color: "bg-green-100" },
  { label: "Avg. Daily Appointment", value: "162", icon: "📊", color: "bg-green-100" },
  { label: "Total Follow Ups", value: "34", icon: "📞", color: "bg-purple-100" },
  { label: "Avg. Daily Follow Up", value: "131", icon: "📈", color: "bg-purple-100" },
];

const monthToDateCallStats = [
  { label: "Total Calls", value: "0", icon: "📞", color: "bg-green-100" },
  { label: "Avg. Daily Calls", value: "0", icon: "📊", color: "bg-green-100" },
];

const lifetimeStats = [
  { label: "Total Appointments", value: "450", icon: "📅", color: "bg-green-100" },
  { label: "Average Daily Appointments", value: "726", icon: "📊", color: "bg-green-100" },
  { label: "Total Follow Ups", value: "185", icon: "📞", color: "bg-purple-100" },
  { label: "Average daily follow ups", value: "25", icon: "📈", color: "bg-purple-100" },
];

// Today Hourly Metrics data matching the screenshot
const hourlyMetrics = [
  { time: "08 AM", appointments: 0 },
  { time: "09 AM", appointments: 0 },
  { time: "10 AM", appointments: 0 },
  { time: "11 AM", appointments: 0 },
  { time: "12 PM", appointments: 0 },
  { time: "01 PM", appointments: 0 },
  { time: "02 PM", appointments: 1 },
  { time: "03 PM", appointments: 0 },
  { time: "04 PM", appointments: 0 },
];

export default function MyStatistics() {
  const [, setLocation] = useLocation();

  const handleAddAppointment = () => {
    setLocation("/dealer-notification");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <div>
                <CardTitle>My Statistics</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  Dashboard / My Statistics
                </div>
              </div>
            </div>
            <Button onClick={handleAddAppointment} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Today Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Today :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {todayStats.map((stat, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {todayCallStats.map((stat, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Month To Date Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Month To Date :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {monthToDateStats.map((stat, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {monthToDateCallStats.map((stat, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Lifetime Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Lifetime :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {lifetimeStats.map((stat, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Today Hourly Metrics Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Today Hourly Metrics</h3>
              <Card className="border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-center font-medium">Appointment</TableHead>
                        {hourlyMetrics.map((metric) => (
                          <TableHead key={metric.time} className="text-center font-medium">
                            {metric.time}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-center font-medium">Appointment</TableCell>
                        {hourlyMetrics.map((metric) => (
                          <TableCell key={metric.time} className="text-center">
                            {metric.appointments}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}