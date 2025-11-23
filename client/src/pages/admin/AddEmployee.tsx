import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

export default function AddEmployee() {
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // console.log("Form data:", data);
    apiRequest("POST", "signup", data).then((response) => {
      setLocation("/admin/employee-list");
    });
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Employee Form</h1>
        <div className="text-sm text-gray-500">
          Dashboard / Employee List / Add Employee
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6">
            {/* Personal Details Section */}
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-sm">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    {...register("firstName")}
                    className="w-full"
                    data-testid="input-first-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    {...register("lastName")}
                    className="w-full"
                    data-testid="input-last-name"
                  />
                </div>

                {/* Row 2 */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    className="w-full"
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    className="w-full"
                    data-testid="input-phone"
                  />
                </div>

                {/* Row 3 */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                    className="w-full"
                    data-testid="input-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirmation" className="text-sm">
                    Password Confirmation
                  </Label>
                  <Input
                    id="password-confirmation"
                    {...register("passwordConfirmation")}
                    type="password"
                    className="w-full"
                    data-testid="input-password-confirmation"
                  />
                </div>

                {/* Row 4 */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm">
                    Role
                  </Label>
                  <Input
                    id="role"
                    {...register("role")}
                    className="w-full"
                    data-testid="input-role"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ringcentral-user-id" className="text-sm">
                    Ringcentral User Id
                  </Label>
                  <Input
                    id="ringcentral-user-id"
                    {...register("ringcentralUserId")}
                    className="w-full"
                    placeholder="manager@truebdc.com"
                    data-testid="input-ringcentral-user-id"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                data-testid="button-create-employee"
              >
                Create Employee
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
