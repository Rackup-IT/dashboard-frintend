import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const initialRoles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Agent" },
];

export default function RolePermission() {
  const [roles, setRoles] = useState(initialRoles);

  const handleEdit = (id: number) => {
    console.log("Edit role:", id);
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: any) => (
        <Button
          size="sm"
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => handleEdit(row.id)}
        >
          <Edit className="mr-1 h-3 w-3" />
          Edit
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={roles}
      searchPlaceholder="Search roles..."
      addButtonLabel="Role"
      onAdd={() => console.log("Add role")}
    />
  );
}
