import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function AddDealer() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit, watch, setValue } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Handle form submission
    setLocation("/admin/dealer-list");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Dealer</h1>
        <div className="text-sm text-gray-500">
          <span>Dashboard</span> / <span>Dealer List</span> / <span>Add Dealer</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Row 1 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Name</label>
                <Input {...register("dealerName")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">SALES</SelectItem>
                    <SelectItem value="sales-szs">SALES/SZS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Website</label>
                <Input {...register("dealerWebsite")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Pronunciation</label>
                <Input {...register("dealerPronunciation")} />
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Zone</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacific">Pacific Time Zone</SelectItem>
                    <SelectItem value="mountain">Mountain Time Zone</SelectItem>
                    <SelectItem value="central">Central Time Zone</SelectItem>
                    <SelectItem value="eastern">Eastern Time Zone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Crm Email</label>
                <Input {...register("crmEmail")} />
              </div>

              {/* Row 4 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Crm Source</label>
                <Input {...register("crmSource")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Crm Up Type</label>
                <Input {...register("crmUpType")} />
              </div>

              {/* Row 5 */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Crm Email Subject</label>
                <div className="flex gap-2">
                  <Input 
                    {...register("crmEmailSubject")} 
                    placeholder="Enter dealer phone number with country code"
                    className="flex-1"
                  />
                  <Button type="button" className="bg-green-500 hover:bg-green-600 text-white">
                    Add New Number
                  </Button>
                </div>
              </div>

              {/* Row 6 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sales Crm</label>
                <Input {...register("salesCrm")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link</label>
                <Input {...register("link")} />
              </div>

              {/* Row 7 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Id</label>
                <Input {...register("dealerId")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input {...register("username")} />
              </div>

              {/* Row 8 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" {...register("password")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Code</label>
                <Input {...register("textCode")} />
              </div>

              {/* Row 9 */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email Code</label>
                <Input {...register("emailCode")} />
              </div>

              {/* Section 2 - Data Mining / SZS CRM */}
              <div className="md:col-span-2 mt-8">
                <hr className="border-gray-200 mb-6" />
              </div>

              {/* Row 10 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Mining / SZS CRM</label>
                <Input {...register("dataMining")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link</label>
                <Input {...register("dataMiningLink")} />
              </div>

              {/* Row 11 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Id</label>
                <Input {...register("dataMiningDealerId")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input {...register("dataMiningUsername")} />
              </div>

              {/* Row 12 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" {...register("dataMiningPassword")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Code</label>
                <Input {...register("dataMiningTextCode")} />
              </div>

              {/* Row 13 */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email Code</label>
                <Input {...register("dataMiningEmailCode")} />
              </div>

              {/* Section 3 - Service Crm */}
              <div className="md:col-span-2 mt-8">
                <hr className="border-gray-200 mb-6" />
              </div>

              {/* Row 14 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Crm</label>
                <Input {...register("serviceCrm")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link</label>
                <Input {...register("serviceCrmLink")} />
              </div>

              {/* Row 15 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Dealer Id</label>
                <Input {...register("serviceCrmDealerId")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input {...register("serviceCrmUsername")} />
              </div>

              {/* Row 16 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" {...register("serviceCrmPassword")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Code</label>
                <Input {...register("serviceCrmTextCode")} />
              </div>

              {/* Row 17 */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email Code</label>
                <Input {...register("serviceCrmEmailCode")} />
              </div>

              {/* Section 4 - Additional Fields */}
              <div className="md:col-span-2 mt-8">
                <hr className="border-gray-200 mb-6" />
              </div>

              {/* Row 18 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Special Attention</label>
                <Textarea {...register("specialAttention")} rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Up Manager #</label>
                <Input {...register("upManager")} />
              </div>

              {/* Row 19 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sales Transfer #</label>
                <Input {...register("salesTransfer")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Transfer #</label>
                <Input {...register("serviceTransfer")} />
              </div>

              {/* Row 20 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Parts Transfer #</label>
                <Input {...register("partsTransfer")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Body Contact #</label>
                <Input {...register("bodyContact")} />
              </div>

              {/* Row 21 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Manager #</label>
                <Input {...register("manager")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hours #</label>
                <Input {...register("hours")} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}