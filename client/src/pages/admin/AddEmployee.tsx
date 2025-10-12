import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function AddEmployee() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Handle form submission
    setLocation("/admin/employee-list");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Employee Form</h1>
        <div className="text-sm text-gray-500">
          <span>Dashboard</span> / <span>Employee List</span> / <span>Add Employee</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            {/* Personal Details Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <Input {...register("firstName")} className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <Input {...register("lastName")} className="w-full" />
                </div>

                {/* Row 2 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input {...register("email")} type="email" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input {...register("phone")} className="w-full" />
                </div>

                {/* Row 3 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Input {...register("password")} type="password" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password Confirmation</label>
                  <Input {...register("passwordConfirmation")} type="password" className="w-full" />
                </div>

                {/* Row 4 */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <Input {...register("role")} className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ringcentral User Id</label>
                  <Input {...register("ringcentralUserId")} className="w-full" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Create Employee
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}