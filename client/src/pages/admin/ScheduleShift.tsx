import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Copy } from "lucide-react";
import { dealerListStore } from "@/lib/dealerListStore";
import { cn } from "@/lib/utils";

export default function ScheduleShift() {
  const [, params] = useRoute("/admin/dealer/:id/schedule-shift");
  const [, setLocation] = useLocation();
  
  const dealerId = params?.id ? parseInt(params.id) : null;
  const dealer = dealerId ? dealerListStore.getDealerById(dealerId) : null;

  const [scheduleDate, setScheduleDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [lastAppointmentTime, setLastAppointmentTime] = useState("14:00");
  const [noLastAppointment, setNoLastAppointment] = useState(false);

  if (!dealer) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dealer Not Found</h1>
        </div>
        <Button onClick={() => setLocation("/admin/dealer-list")} data-testid="button-back">
          Back to Dealer List
        </Button>
      </div>
    );
  }

  const handleCopy = () => {
    // Copy functionality placeholder
    console.log("Copy shift details");
  };

  const handleSubmit = () => {
    // Save schedule and shift
    console.log({
      dealerId,
      scheduleDate,
      startTime,
      endTime,
      lastAppointmentTime: noLastAppointment ? null : lastAppointmentTime,
    });
    setLocation("/admin/dealer-list");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Dealer schedule & shift form</h1>
        <p className="text-sm text-muted-foreground">
          Dashboard / Dealer List / Dealer Schedule & Shift
        </p>
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold" data-testid="text-section-title">
          Schedule & Shift - {dealer.name}
        </h2>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Schedule Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="schedule"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-100",
                      !scheduleDate && "text-muted-foreground"
                    )}
                    data-testid="button-schedule-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduleDate ? format(scheduleDate, "MM/dd/yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduleDate}
                    onSelect={(date) => date && setScheduleDate(date)}
                    initialFocus
                    data-testid="calendar-schedule"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Shift Section */}
            <div className="space-y-4">
                <Label className="text-base font-semibold">Shift</Label>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
                  {/* Day (read-only, shows selected date) */}
                  <div className="space-y-2">
                    <Label htmlFor="day" className="text-sm">Day</Label>
                    <Input
                      id="day"
                      value={scheduleDate ? format(scheduleDate, "MM/dd/yyyy") : ""}
                      readOnly
                      className="bg-gray-100"
                      data-testid="input-day"
                    />
                  </div>

                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="bg-gray-100"
                      data-testid="input-start-time"
                    />
                  </div>

                  {/* End Time */}
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="bg-gray-100"
                      data-testid="input-end-time"
                    />
                  </div>

                  {/* Last Appointment Time */}
                  <div className="space-y-2">
                    <Label htmlFor="lastAppointmentTime" className="text-sm">Last Appointment Time</Label>
                    <Input
                      id="lastAppointmentTime"
                      type="time"
                      value={lastAppointmentTime}
                      onChange={(e) => setLastAppointmentTime(e.target.value)}
                      disabled={noLastAppointment}
                      className={cn(
                        noLastAppointment ? "bg-gray-100" : "bg-yellow-400 text-black font-medium"
                      )}
                      data-testid="input-last-appointment-time"
                    />
                  </div>

                  {/* No Last Appointment Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="noLastAppointment"
                      checked={noLastAppointment}
                      onCheckedChange={(checked) => setNoLastAppointment(checked as boolean)}
                      data-testid="checkbox-no-last-appointment"
                    />
                    <Label htmlFor="noLastAppointment" className="text-sm whitespace-nowrap cursor-pointer">
                      No last appointment time
                    </Label>
                  </div>

                  {/* Copy Button */}
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCopy}
                      data-testid="button-copy"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-submit"
              >
                Change Schedule & Shift
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
