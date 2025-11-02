import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { roleStore, MODULE_PERMISSIONS, type Permission } from "@/lib/roleStore";

export default function EditRole() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/roles/:id/edit");
  const { toast } = useToast();
  
  const roleId = params?.id ? parseInt(params.id) : 0;

  const [roleTitle, setRoleTitle] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (roleId) {
      const role = roleStore.getRole(roleId);
      if (role) {
        setRoleTitle(role.title);
        setPermissions(role.permissions);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [roleId]);

  const handlePermissionToggle = (moduleName: string, permission: string) => {
    setPermissions(prev => {
      const moduleIndex = prev.findIndex(p => p.module === moduleName);
      if (moduleIndex === -1) {
        // Module doesn't exist, add it with this permission
        return [...prev, { module: moduleName, permissions: [permission] }];
      }

      const updatedPermissions = [...prev];
      const modulePermissions = updatedPermissions[moduleIndex].permissions;
      
      if (modulePermissions.includes(permission)) {
        // Remove permission
        updatedPermissions[moduleIndex] = {
          ...updatedPermissions[moduleIndex],
          permissions: modulePermissions.filter(p => p !== permission)
        };
      } else {
        // Add permission
        updatedPermissions[moduleIndex] = {
          ...updatedPermissions[moduleIndex],
          permissions: [...modulePermissions, permission]
        };
      }

      return updatedPermissions;
    });
  };

  const isPermissionChecked = (moduleName: string, permission: string): boolean => {
    const module = permissions.find(p => p.module === moduleName);
    return module ? module.permissions.includes(permission) : false;
  };

  const handleUpdate = () => {
    roleStore.updatePermissions(roleId, permissions);
    toast({
      title: "Success",
      description: "Role permissions updated successfully",
    });
    setLocation('/admin/roles');
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-4">
        <p>Role not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Edit Role Permission</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Edit Role Permission
              </div>
            </div>
            <Button 
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-update"
            >
              Update
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Role Title */}
            <div className="space-y-2">
              <Label htmlFor="roleTitle">Role Title</Label>
              <Input
                id="roleTitle"
                value={roleTitle}
                readOnly
                className="bg-gray-50"
                data-testid="input-role-title"
              />
            </div>

            {/* Permissions Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Module</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(MODULE_PERMISSIONS).map(([module, availablePermissions]) => (
                    <tr key={module} className="border-b last:border-0">
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id={`module-${module}`}
                            className="mt-1"
                            data-testid={`checkbox-module-${module}`}
                          />
                          <label htmlFor={`module-${module}`} className="text-sm">
                            {module}
                          </label>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-4">
                          {availablePermissions.map(permission => (
                            <div key={permission} className="flex items-center gap-2">
                              <Checkbox
                                id={`${module}-${permission}`}
                                checked={isPermissionChecked(module, permission)}
                                onCheckedChange={() => handlePermissionToggle(module, permission)}
                                data-testid={`checkbox-${module}-${permission}`}
                              />
                              <label
                                htmlFor={`${module}-${permission}`}
                                className="text-sm cursor-pointer"
                              >
                                {permission}
                              </label>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
