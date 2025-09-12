import { LoaderCircle } from "lucide-react";

export default function Loading({ size = 16 }: { size?: number }) {
  return (
    <LoaderCircle className="animate-spin" size={size} />
  );
};
