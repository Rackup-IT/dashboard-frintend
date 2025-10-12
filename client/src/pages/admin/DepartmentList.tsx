import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const initialDepartments = [
  { id: 1, name: "Sales" },
  { id: 2, name: "SIS" },
  { id: 3, name: "Data Mining" },
  { id: 4, name: "Campaign" },
  { id: 5, name: "Follow Up" },
  { id: 6, name: "Confirmations" },
];

export default function DepartmentList() {
  const [departments, setDepartments] = useState(initialDepartments);

  const handleEdit = (id: number) => {
    console.log("Edit department:", id);
  };

  const handleDelete = (id: number) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    {
      key: "actions",
      label: "Action",
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => handleEdit(row.id)}
          >
            <Edit className="mr-1 h-3 w-3" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={departments}
      searchPlaceholder="Search departments..."
      addButtonLabel="Department"
      onAdd={() => console.log("Add department")}
    />
  );
}
