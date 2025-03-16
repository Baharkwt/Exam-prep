"use client";

import { DashboardLayout } from "@/components/layouts/MainLayout";
import { StudentManagement } from "@/components/admin/StudentManagement";

export default function AdminStudentsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            Manage student accounts and enrollments
          </p>
        </div>

        <StudentManagement />
      </div>
    </DashboardLayout>
  );
}
