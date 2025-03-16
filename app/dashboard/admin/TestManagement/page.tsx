"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  FileUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

interface Test {
  id: string;
  title: string;
  category: string;
  type: "full" | "sectional" | "speed" | "previous";
  section?: string;
  status: "pending" | "approved" | "active";
  uploadDate: string;
}

const mockTests: Test[] = [
  {
    id: "1",
    title: "IBPS PO Prelims Full Test 1",
    category: "Banking",
    type: "full",
    status: "active",
    uploadDate: "2023-04-15",
  },
  {
    id: "2",
    title: "SSC CGL Reasoning Sectional Test",
    category: "SSC",
    type: "sectional",
    section: "Reasoning",
    status: "active",
    uploadDate: "2023-04-12",
  },
  {
    id: "3",
