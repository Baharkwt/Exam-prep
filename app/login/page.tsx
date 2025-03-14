"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [showRoles, setShowRoles] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (role: string) => {
    switch (role) {
      case "student":
        router.push("/dashboard/student");
        break;
      case "admin":
        router.push("/dashboard/admin");
        break;
      case "employee":
        router.push("/dashboard/employee");
        break;
      case "owner":
        router.push("/dashboard/owner");
        break;
    }
  };

  const handleLoginSubmit = () => {
    setShowRoles(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] p-6">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            Moct Platform
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue learning</p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full h-14 font-semibold">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Input
            type="email"
            placeholder="Email"
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="password"
            placeholder="Password"
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          {!showRoles ? (
            <Button
              className="w-full h-14 text-lg font-bold tracking-wide bg-[#4C51BF] hover:bg-[#434190]"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleLogin("student")}
                className="h-14 font-semibold bg-[#4C51BF] hover:bg-[#434190]"
              >
                Student Login
              </Button>
              <Button
                onClick={() => handleLogin("admin")}
                className="h-14 font-semibold bg-[#4C51BF] hover:bg-[#434190]"
              >
                Admin Login
              </Button>
              <Button
                onClick={() => handleLogin("employee")}
                className="h-14 font-semibold bg-[#4C51BF] hover:bg-[#434190]"
              >
                Employee Login
              </Button>
              <Button
                onClick={() => handleLogin("owner")}
                className="h-14 font-semibold bg-[#4C51BF] hover:bg-[#434190]"
              >
                Owner Login
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
