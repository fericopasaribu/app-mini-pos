// components/CustomCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CustomCard({
  title,
  children,
  className = "",
}: CustomCardProps) {
  return (
    <Card className={`area-card ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
