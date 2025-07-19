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
        <CardTitle className="card-title">{title}</CardTitle>
      </CardHeader>
      <CardContent className="card-content">{children}</CardContent>
    </Card>
  );
}
