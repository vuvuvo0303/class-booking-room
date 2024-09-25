import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const DashboardCard = ({
    title,
    value,
    icon,
    headerStyle,
  }: {
    title: string;
    value: number;
    icon: ReactNode;
    headerStyle?: string;
  }) => {
    const [number, setNumber] = useState(0);
    const startNumber = 0;
    const endNumber = value;
    const duration = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    useEffect(() => {
      const increment = (endNumber - startNumber) / (duration / 100);
      let currentNumber = startNumber;
      const interval = setInterval(() => {
        if (currentNumber >= endNumber) {
          clearInterval(interval);
          setNumber(endNumber);
        } else {
          currentNumber += increment;
          setNumber(Math.round(currentNumber));
        }
      }, 100);
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, [startNumber, endNumber]);
    return (
      <Card className="drop-shadow-lg relative overflow-hidden">
        <CardHeader className={cn("text-white py-5 rounded-md", headerStyle)}>
          <CardTitle className="flex justify-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="py-7">
          <div className="flex items-center gap-4 justify-center">
            <span className="text-4xl font-light">{number}</span> {icon}
          </div>
        </CardContent>
      </Card>
    );
  };

  export default DashboardCard;