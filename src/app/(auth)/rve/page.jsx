"use client";
import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setError("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/rve", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Email sent");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-black h-screen flex flex-col justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Resend Verification Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Mail className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Verification Email"
              )}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">{success}</p>
            )}
            <p className="text-sm text-center w-full">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="font-medium  text-blue-500 hover:underline "
              >
                Back to Signin
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
