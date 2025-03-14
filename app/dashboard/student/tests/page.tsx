"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardLayout } from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Mock Tests Data
const mockTests = [
  { id: 1, title: "Banking Aptitude Test", duration: "60 mins", questions: 100, type: "banking" },
  { id: 2, title: "SSC General Knowledge", duration: "45 mins", questions: 75, type: "ssc" },
  { id: 3, title: "Railway Exam Practice", duration: "90 mins", questions: 120, type: "railway" }
];

// Exam Categories with Logos
const examCategories = [
  {
    category: "Banking Exams",
    exams: [
      { name: "IBPS PO", slug: "ibps-po", logo: "/logos/ibps.png" },
      { name: "IBPS Clerk", slug: "ibps-clerk", logo: "/logos/ibps.png" },
      { name: "IBPS SO", slug: "ibps-so", logo: "/logos/ibps.png" },
      { name: "SBI PO", slug: "sbi-po", logo: "/logos/sbi.png" },
      { name: "SBI Clerk", slug: "sbi-clerk", logo: "/logos/sbi.png" },
      { name: "RBI Grade B", slug: "rbi-grade-b", logo: "/logos/rbi.png" },
      { name: "RBI Assistant", slug: "rbi-assistant", logo: "/logos/rbi.png" },
      { name: "NABARD Grade A & B", slug: "nabard-grade-a-b", logo: "/logos/nabard.png" },
      { name: "IDBI Bank Executive", slug: "idbi-executive", logo: "/logos/idbi.png" },
      { name: "Regional Rural Banks Officer (RRB)", slug: "rrb-officer", logo: "/logos/rrb.png" }
    ]
  },
  {
    category: "SSC Exams",
    exams: [
      { name: "SSC CGL", slug: "ssc-cgl", logo: "/logos/ssc.png" },
      { name: "SSC CHSL", slug: "ssc-chsl", logo: "/logos/ssc.png" },
      { name: "SSC JE", slug: "ssc-je", logo: "/logos/ssc.png" },
      { name: "SSC GD Constable", slug: "ssc-gd", logo: "/logos/ssc.png" },
      { name: "SSC CPO", slug: "ssc-cpo", logo: "/logos/ssc.png" },
      { name: "SSC Stenographer", slug: "ssc-steno", logo: "/logos/ssc.png" },
      { name: "SSC MTS", slug: "ssc-mts", logo: "/logos/ssc.png" }
    ]
  },
  {
    category: "Insurance Exams",
    exams: [
      { name: "LIC AAO", slug: "lic-aao", logo: "/logos/lic.png" },
      { name: "NIACL AO", slug: "niacl-ao", logo: "/logos/niacl.png" },
      { name: "UIIC AO", slug: "uiic-ao", logo: "/logos/uiic.png" },
      { name: "OICL AO", slug: "oicl-ao", logo: "/logos/oicl.png" },
      { name: "GIC Scale I Officer", slug: "gic-scale-1", logo: "/logos/gic.png" },
      { name: "Rural Insurance Exams", slug: "rural-insurance", logo: "/logos/rural.png" }
    ]
  },
  {
    category: "UPSC Exams",
    exams: [
      { name: "UPSC CSE", slug: "upsc-cse", logo: "/logos/upsc.png" },
      { name: "UPSC CDS", slug: "upsc-cds", logo: "/logos/upsc.png" },
      { name: "UPSC NDA", slug: "upsc-nda", logo: "/logos/upsc.png" },
      { name: "UPSC IFS", slug: "upsc-ifs", logo: "/logos/upsc.png" },
      { name: "UPSC ESE", slug: "upsc-ese", logo: "/logos/upsc.png" },
      { name: "UPSC CMS", slug: "upsc-cms", logo: "/logos/upsc.png" }
    ]
  },
  {
    category: "Railway Exams",
    exams: [
      { name: "RRB NTPC", slug: "rrb-ntpc", logo: "/logos/rrb.png" },
      { name: "RRB ALP", slug: "rrb-alp", logo: "/logos/rrb.png" },
      { name: "RRB JE", slug: "rrb-je", logo: "/logos/rrb.png" },
      { name: "RRB Group D", slug: "rrb-group-d", logo: "/logos/rrb.png" }
    ]
  },
  {
    category: "Defense Exams",
    exams: [
      { name: "Indian Army Exams", slug: "army-exams", logo: "/logos/army.png" },
      { name: "Indian Navy Exams", slug: "navy-exams", logo: "/logos/navy.png" },
      { name: "Indian Air Force (AFCAT)", slug: "afcat", logo: "/logos/airforce.png" },
      { name: "NDA", slug: "nda", logo: "/logos/nda.png" },
      { name: "CDS", slug: "cds", logo: "/logos/cds.png" }
    ]
  }
];

export default function TestsPage() {
  const router = useRouter();

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Available Tests</h1>
          <p className="text-muted-foreground">Practice tests and assessments</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search tests..." />
          </div>
          <Button>Filter</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card key={test.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">Duration: {test.duration}</p>
                <p className="text-sm text-muted-foreground">Questions: {test.questions}</p>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/tests/${test.type}`}>Start Test</Link>
              </Button>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-10 mb-4">Select an Exam</h2>
          {examCategories.map((category) => (
            <div key={category.category} className="mb-6">
              <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {category.exams.map((exam) => (
                  <div
                    key={exam.slug}
                    onClick={() => router.push(`/tests/${exam.slug}`)}
                    className="border p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-gray-100 transition transform hover:scale-105"
                  >
                    <Image src={exam.logo} alt={exam.name} width={50} height={50} className="mb-3" />
                    <span className="font-semibold text-center">{exam.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
