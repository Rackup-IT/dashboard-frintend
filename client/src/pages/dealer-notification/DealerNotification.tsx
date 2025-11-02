import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DealerNotification() {
  const [formType, setFormType] = useState("appointment");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  
  const [formData, setFormData] = useState({
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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Appointment / Follow Up</h1>
        <p className="text-sm text-gray-500">Dashboard / Create Appointment</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="space-y-6">
          {/* Radio Selection for Appointment/Follow Up */}
          <div>
            <RadioGroup 
              value={formType} 
              onValueChange={setFormType}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="appointment" id="type-appointment" data-testid="radio-appointment" />
                <Label htmlFor="type-appointment">Appointment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="follow-up" id="type-followup" data-testid="radio-followup" />
                <Label htmlFor="type-followup">Follow Up</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Dealership */}
          <div className="space-y-2">
            <Label>Dealership</Label>
            <Select 
              value={formData.dealership} 
              onValueChange={(value) => setFormData(prev => ({...prev, dealership: value}))}
            >
              <SelectTrigger className="w-full" data-testid="select-dealership">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {dealerships.map((dealer) => (
                  <SelectItem key={dealer} value={dealer}>{dealer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department - Only show for Appointment type */}
          {formType === "appointment" && (
            <div className="space-y-2">
              <Label>Department</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData(prev => ({...prev, department: value}))}
              >
                <SelectTrigger className="w-full" data-testid="select-department">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Scenario */}
          <div className="space-y-2">
            <Label>Scenario</Label>
            <Select 
              value={formData.scenario} 
              onValueChange={(value) => setFormData(prev => ({...prev, scenario: value}))}
            >
              <SelectTrigger className="w-full" data-testid="select-scenario">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((scenario) => (
                  <SelectItem key={scenario} value={scenario}>{scenario}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Appointment Date and Time - Only show for Appointment type */}
          {formType === "appointment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Appointment Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  data-testid="input-appointment-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-time">Appointment Time</Label>
                <Input
                  id="appointment-time"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  data-testid="input-appointment-time"
                />
              </div>
            </div>
          )}

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                placeholder=""
                data-testid="input-first-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                placeholder=""
                data-testid="input-last-name"
              />
            </div>
          </div>

          {/* Phone Number and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))}
                placeholder=""
                data-testid="input-phone-number"
              />
              <RadioGroup 
                value={formData.phoneNumberType} 
                onValueChange={(value) => setFormData(prev => ({...prev, phoneNumberType: value}))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="phone-yes" data-testid="radio-phone-yes" />
                  <Label htmlFor="phone-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="phone-no" data-testid="radio-phone-no" />
                  <Label htmlFor="phone-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                placeholder=""
                data-testid="input-email"
              />
            </div>
          </div>

          {/* Vehicle of Interest */}
          <div className="space-y-2">
            <Label>Vehicle of Interest</Label>
            <RadioGroup 
              value={formData.vehicleInterest} 
              onValueChange={(value) => setFormData(prev => ({...prev, vehicleInterest: value}))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="vehicle-yes" data-testid="radio-vehicle-yes" />
                <Label htmlFor="vehicle-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="vehicle-no" data-testid="radio-vehicle-no" />
                <Label htmlFor="vehicle-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Year, Make, Model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({...prev, year: value}))}>
                <SelectTrigger data-testid="select-year">
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
              <Label>Make</Label>
              <Select value={formData.make} onValueChange={(value) => setFormData(prev => ({...prev, make: value}))}>
                <SelectTrigger data-testid="select-make">
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
              <Label>Model</Label>
              <Select value={formData.model} onValueChange={(value) => setFormData(prev => ({...prev, model: value}))}>
                <SelectTrigger data-testid="select-model">
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

          {/* Stock Number */}
          <div className="space-y-2">
            <Label htmlFor="stock-number">Stock # (Optional)</Label>
            <Input
              id="stock-number"
              value={formData.stockNumber}
              onChange={(e) => setFormData(prev => ({...prev, stockNumber: e.target.value}))}
              placeholder=""
              data-testid="input-stock-number"
            />
          </div>

          {/* Trade-in */}
          <div className="space-y-2">
            <Label>Trade-in</Label>
            <RadioGroup 
              value={formData.tradeIn} 
              onValueChange={(value) => setFormData(prev => ({...prev, tradeIn: value}))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="trade-yes" data-testid="radio-trade-yes" />
                <Label htmlFor="trade-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="trade-no" data-testid="radio-trade-no" />
                <Label htmlFor="trade-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Trade-in Year, Make, Model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={formData.tradeYear} onValueChange={(value) => setFormData(prev => ({...prev, tradeYear: value}))}>
                <SelectTrigger data-testid="select-trade-year">
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
              <Label>Make</Label>
              <Select value={formData.tradeMake} onValueChange={(value) => setFormData(prev => ({...prev, tradeMake: value}))}>
                <SelectTrigger data-testid="select-trade-make">
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
              <Label>Model</Label>
              <Select value={formData.tradeModel} onValueChange={(value) => setFormData(prev => ({...prev, tradeModel: value}))}>
                <SelectTrigger data-testid="select-trade-model">
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

          {/* Miles */}
          <div className="space-y-2">
            <Label htmlFor="miles">Miles</Label>
            <Input
              id="miles"
              type="number"
              value={formData.miles}
              onChange={(e) => setFormData(prev => ({...prev, miles: e.target.value}))}
              placeholder=""
              data-testid="input-miles"
            />
          </div>

          {/* Payment Preference */}
          <div className="space-y-2">
            <Label>Payment Preference</Label>
            <Select value={formData.paymentPreference} onValueChange={(value) => setFormData(prev => ({...prev, paymentPreference: value}))}>
              <SelectTrigger data-testid="select-payment-preference">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {paymentPreferences.map((pref) => (
                  <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({...prev, comment: e.target.value}))}
              placeholder=""
              rows={4}
              data-testid="textarea-comment"
            />
          </div>

          {/* Lead Source */}
          <div className="space-y-2">
            <Label>Lead Source</Label>
            <Select value={formData.leadSource} onValueChange={(value) => setFormData(prev => ({...prev, leadSource: value}))}>
              <SelectTrigger data-testid="select-lead-source">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {leadSources.map((source) => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label>Language</Label>
            <RadioGroup 
              value={formData.language} 
              onValueChange={(value) => setFormData(prev => ({...prev, language: value}))}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="lang-english" data-testid="radio-lang-english" />
                <Label htmlFor="lang-english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spanish" id="lang-spanish" data-testid="radio-lang-spanish" />
                <Label htmlFor="lang-spanish">Spanish</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              data-testid="button-submit"
            >
              Submit Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
