import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Clock, 
  Zap, 
  History,
  ChevronRight 
} from "lucide-react";
import Link from "next/link";

interface TestCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  route: string;
}

const testCategories: Record<string, TestCategory[]> = {
  "ibps-po": [
    {
      id: "full",
      title: "Full Length Tests",
      description: "Complete mock tests with all sections",
      icon: <BookOpen className="w-6 h-6" />,
      count: 15,
      route: "full"
    },
    {
      id: "sectional",
      title: "Sectional Tests",
      description: "Practice specific sections",
      icon: <Clock className="w-6 h-6" />,
      count: 30,
      route: "sectional"
    },
    {
      id: "speed",
      title: "Speed Tests",
      description: "Quick practice for rapid improvement",
      icon: <Zap className="w-6 h-6" />,
      count: 25,
      route: "speed"
    },
    {
      id: "previous",
      title: "Previous Year Papers",
      description: "Solve past year questions",
      icon: <History className="w-6 h-6" />,
      count: 10,
      route: "previous"
    }
  ]
};

const examNames: Record<string, string> = {
  "ibps-po": "IBPS PO",
  "sbi-po": "SBI PO",
  "ibps-clerk": "IBPS Clerk",
  "ssc-cgl": "SSC CGL"
};

export function generateStaticParams() {
  return [
    { exam: "ibps-po" },
    { exam: "sbi-po" },
    { exam: "ibps-clerk" },
    { exam: "ssc-cgl" }
  ];
}

export default function ExamPage({ params }: { params: { exam: string } }) {
  const examId = params.exam;
  const categories = testCategories[examId] || testCategories["ibps-po"];
  const examName = examNames[examId] || examId.toUpperCase();

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{examName} Test Series</h1>
          <p className="text-muted-foreground">
            Choose a test category to start practicing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/tests/${examId}/${category.route}`}
            >
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      {category.count} tests available
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}