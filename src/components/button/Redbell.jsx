import { Bell } from "lucide-react";

export default function Redbell() {
  return (
    <div className="relative">
      <Bell />
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
    </div>
  );
}
