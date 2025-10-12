import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Bell } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DealerNotification() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [appointmentDate, setAppointmentDate] = useState<Date>();
  const [appointmentTime, setAppointmentTime] = useState("");
  
  // Form states for appointment
  const [appointmentForm, setAppointmentForm] = useState({
    dealership: "",
    department: "",
    scenario: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneNumberType: "yes",
    email: "",
    vehicleInterest: "yes",
    year: "",
    make: "",
    model: "",
    stockNumber: "",
    tradeIn: "yes",
    tradeYear: "",
    tradeMake: "",
    tradeModel: "",
    miles: "",
    paymentPreference: "",
    comment: "",
    leadSource: "",
    language: "english"
  });

  // Form states for follow up
  const [followUpForm, setFollowUpForm] = useState({
    dealership: "",
    scenario: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneNumberType: "yes",
    email: "",
    vehicleInterest: "yes",
    year: "",
    make: "",
    model: "",
    stockNumber: "",
    tradeIn: "yes",
    tradeYear: "",
    tradeMake: "",
    tradeModel: "",
    miles: "",
    paymentPreference: "",
    comment: "",
    leadSource: "",
    language: "english"
  });

  const dealerships = [
    "All American Chevrolet of Midland",
    "Andrews Auto",
    "Augusta Mitsubishi",
    "Daytona Kia",
    "Daytona Mitsubishi"
  ];

  const departments = [
    "Sales",
    "Service",
    "Parts",
    "Finance"
  ];

  const scenarios = [
    "New Vehicle Inquiry",
    "Used Vehicle Inquiry",
    "Service Appointment",
    "Parts Inquiry",
    "Finance Application"
  ];

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());
  
  const makes = [
    "Chevrolet", "Ford", "Toyota", "Honda", "Nissan", "BMW", "Mercedes-Benz", 
    "Audi", "Volkswagen", "Hyundai", "Kia", "Mazda", "Subaru", "Mitsubishi"
  ];

  const models = [
    "Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible", "Wagon"
  ];

  const paymentPreferences = [
    "Cash", "Finance", "Lease", "Trade-In"
  ];

  const leadSources = [
    "Website", "Phone Call", "Walk-In", "Referral", "Social Media", "Advertisement"
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const handleSubmit = () => {
    console.log("Form submitted:", activeTab === "appointment" ? appointmentForm : followUpForm);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <div>
              <CardTitle>Appointment / Follow Up</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Create Appointment
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="appointment">Appointment</TabsTrigger>
              <TabsTrigger value="follow-up">Follow Up</TabsTrigger>
            </TabsList>

            {/* Appointment Tab */}
            <TabsContent value="appointment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealership">Dealership</Label>
                  <Select value={appointmentForm.dealership} onValueChange={(value) => setAppointmentForm(prev => ({...prev, dealership: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {dealerships.map((dealer) => (
                        <SelectItem key={dealer} value={dealer}>{dealer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={appointmentForm.department} onValueChange={(value) => setAppointmentForm(prev => ({...prev, department: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scenario">Scenario</Label>
                  <Select value={appointmentForm.scenario} onValueChange={(value) => setAppointmentForm(prev => ({...prev, scenario: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {scenarios.map((scenario) => (
                        <SelectItem key={scenario} value={scenario}>{scenario}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-date">Appointment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !appointmentDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={appointmentDate}
                        onSelect={setAppointmentDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-time">Appointment Time</Label>
                  <Select value={appointmentTime} onValueChange={setAppointmentTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    value={appointmentForm.firstName}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, firstName: e.target.value}))}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    value={appointmentForm.lastName}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, lastName: e.target.value}))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="space-y-2">
                    <Input
                      value={appointmentForm.phoneNumber}
                      onChange={(e) => setAppointmentForm(prev => ({...prev, phoneNumber: e.target.value}))}
                      placeholder="Enter phone number"
                    />
                    <RadioGroup 
                      value={appointmentForm.phoneNumberType} 
                      onValueChange={(value) => setAppointmentForm(prev => ({...prev, phoneNumberType: value}))}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="phone-yes" />
                        <Label htmlFor="phone-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="phone-no" />
                        <Label htmlFor="phone-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm(prev => ({...prev, email: e.target.value}))}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle of Interest</Label>
                <RadioGroup 
                  value={appointmentForm.vehicleInterest} 
                  onValueChange={(value) => setAppointmentForm(prev => ({...prev, vehicleInterest: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="vehicle-yes" />
                    <Label htmlFor="vehicle-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="vehicle-no" />
                    <Label htmlFor="vehicle-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={appointmentForm.year} onValueChange={(value) => setAppointmentForm(prev => ({...prev, year: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Select value={appointmentForm.make} onValueChange={(value) => setAppointmentForm(prev => ({...prev, make: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select value={appointmentForm.model} onValueChange={(value) => setAppointmentForm(prev => ({...prev, model: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock-number">Stock # (Optional)</Label>
                <Input
                  id="stock-number"
                  value={appointmentForm.stockNumber}
                  onChange={(e) => setAppointmentForm(prev => ({...prev, stockNumber: e.target.value}))}
                  placeholder="Enter stock number"
                />
              </div>

              <div className="space-y-2">
                <Label>Trade-in</Label>
                <RadioGroup 
                  value={appointmentForm.tradeIn} 
                  onValueChange={(value) => setAppointmentForm(prev => ({...prev, tradeIn: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="trade-yes" />
                    <Label htmlFor="trade-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="trade-no" />
                    <Label htmlFor="trade-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trade-year">Year</Label>
                  <Select value={appointmentForm.tradeYear} onValueChange={(value) => setAppointmentForm(prev => ({...prev, tradeYear: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trade-make">Make</Label>
                  <Select value={appointmentForm.tradeMake} onValueChange={(value) => setAppointmentForm(prev => ({...prev, tradeMake: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trade-model">Model</Label>
                  <Select value={appointmentForm.tradeModel} onValueChange={(value) => setAppointmentForm(prev => ({...prev, tradeModel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="miles">Miles</Label>
                <Input
                  id="miles"
                  type="number"
                  value={appointmentForm.miles}
                  onChange={(e) => setAppointmentForm(prev => ({...prev, miles: e.target.value}))}
                  placeholder="Enter miles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-preference">Payment Preference</Label>
                <Select value={appointmentForm.paymentPreference} onValueChange={(value) => setAppointmentForm(prev => ({...prev, paymentPreference: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentPreferences.map((pref) => (
                      <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={appointmentForm.comment}
                  onChange={(e) => setAppointmentForm(prev => ({...prev, comment: e.target.value}))}
                  placeholder="Enter comment"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-source">Lead Source</Label>
                <Select value={appointmentForm.leadSource} onValueChange={(value) => setAppointmentForm(prev => ({...prev, leadSource: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadSources.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <RadioGroup 
                  value={appointmentForm.language} 
                  onValueChange={(value) => setAppointmentForm(prev => ({...prev, language: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="lang-english" />
                    <Label htmlFor="lang-english">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spanish" id="lang-spanish" />
                    <Label htmlFor="lang-spanish">Spanish</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-center pt-4">
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Submit Appointment
                </Button>
              </div>
            </TabsContent>

            {/* Follow Up Tab */}
            <TabsContent value="follow-up" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealership-followup">Dealership</Label>
                  <Select value={followUpForm.dealership} onValueChange={(value) => setFollowUpForm(prev => ({...prev, dealership: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {dealerships.map((dealer) => (
                        <SelectItem key={dealer} value={dealer}>{dealer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scenario-followup">Scenario</Label>
                  <Select value={followUpForm.scenario} onValueChange={(value) => setFollowUpForm(prev => ({...prev, scenario: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {scenarios.map((scenario) => (
                        <SelectItem key={scenario} value={scenario}>{scenario}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name-followup">First Name</Label>
                  <Input
                    id="first-name-followup"
                    value={followUpForm.firstName}
                    onChange={(e) => setFollowUpForm(prev => ({...prev, firstName: e.target.value}))}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name-followup">Last Name</Label>
                  <Input
                    id="last-name-followup"
                    value={followUpForm.lastName}
                    onChange={(e) => setFollowUpForm(prev => ({...prev, lastName: e.target.value}))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="space-y-2">
                    <Input
                      value={followUpForm.phoneNumber}
                      onChange={(e) => setFollowUpForm(prev => ({...prev, phoneNumber: e.target.value}))}
                      placeholder="Enter phone number"
                    />
                    <RadioGroup 
                      value={followUpForm.phoneNumberType} 
                      onValueChange={(value) => setFollowUpForm(prev => ({...prev, phoneNumberType: value}))}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="phone-yes-followup" />
                        <Label htmlFor="phone-yes-followup">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="phone-no-followup" />
                        <Label htmlFor="phone-no-followup">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-followup">Email</Label>
                  <Input
                    id="email-followup"
                    type="email"
                    value={followUpForm.email}
                    onChange={(e) => setFollowUpForm(prev => ({...prev, email: e.target.value}))}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle of Interest</Label>
                <RadioGroup 
                  value={followUpForm.vehicleInterest} 
                  onValueChange={(value) => setFollowUpForm(prev => ({...prev, vehicleInterest: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="vehicle-yes-followup" />
                    <Label htmlFor="vehicle-yes-followup">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="vehicle-no-followup" />
                    <Label htmlFor="vehicle-no-followup">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year-followup">Year</Label>
                  <Select value={followUpForm.year} onValueChange={(value) => setFollowUpForm(prev => ({...prev, year: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="make-followup">Make</Label>
                  <Select value={followUpForm.make} onValueChange={(value) => setFollowUpForm(prev => ({...prev, make: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-followup">Model</Label>
                  <Select value={followUpForm.model} onValueChange={(value) => setFollowUpForm(prev => ({...prev, model: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock-number-followup">Stock # (Optional)</Label>
                <Input
                  id="stock-number-followup"
                  value={followUpForm.stockNumber}
                  onChange={(e) => setFollowUpForm(prev => ({...prev, stockNumber: e.target.value}))}
                  placeholder="Enter stock number"
                />
              </div>

              <div className="space-y-2">
                <Label>Trade-in</Label>
                <RadioGroup 
                  value={followUpForm.tradeIn} 
                  onValueChange={(value) => setFollowUpForm(prev => ({...prev, tradeIn: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="trade-yes-followup" />
                    <Label htmlFor="trade-yes-followup">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="trade-no-followup" />
                    <Label htmlFor="trade-no-followup">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trade-year-followup">Year</Label>
                  <Select value={followUpForm.tradeYear} onValueChange={(value) => setFollowUpForm(prev => ({...prev, tradeYear: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trade-make-followup">Make</Label>
                  <Select value={followUpForm.tradeMake} onValueChange={(value) => setFollowUpForm(prev => ({...prev, tradeMake: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trade-model-followup">Model</Label>
                  <Select value={followUpForm.tradeModel} onValueChange={(value) => setFollowUpForm(prev => ({...prev, tradeModel: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="miles-followup">Miles</Label>
                <Input
                  id="miles-followup"
                  type="number"
                  value={followUpForm.miles}
                  onChange={(e) => setFollowUpForm(prev => ({...prev, miles: e.target.value}))}
                  placeholder="Enter miles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-preference-followup">Payment Preference</Label>
                <Select value={followUpForm.paymentPreference} onValueChange={(value) => setFollowUpForm(prev => ({...prev, paymentPreference: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentPreferences.map((pref) => (
                      <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment-followup">Comment</Label>
                <Textarea
                  id="comment-followup"
                  value={followUpForm.comment}
                  onChange={(e) => setFollowUpForm(prev => ({...prev, comment: e.target.value}))}
                  placeholder="Enter comment"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-source-followup">Lead Source</Label>
                <Select value={followUpForm.leadSource} onValueChange={(value) => setFollowUpForm(prev => ({...prev, leadSource: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadSources.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <RadioGroup 
                  value={followUpForm.language} 
                  onValueChange={(value) => setFollowUpForm(prev => ({...prev, language: value}))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="lang-english-followup" />
                    <Label htmlFor="lang-english-followup">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spanish" id="lang-spanish-followup" />
                    <Label htmlFor="lang-spanish-followup">Spanish</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-center pt-4">
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Submit Appointment
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}