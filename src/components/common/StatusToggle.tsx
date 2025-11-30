import { Switch } from "@/components/ui/switch";

interface StatusToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function StatusToggle({ 
  checked, 
  onCheckedChange, 
  disabled = false 
}: StatusToggleProps) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className="data-[state=checked]:bg-green-500"
    />
  );
}
