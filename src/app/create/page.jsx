"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function NoteCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    try {
      const response = await fetch("/api/private/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      }else{
        setError("");
        setTitle("");
        setDescription("");
        setSuccess(true);
      }

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to create note. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Create a New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Textarea
                placeholder="Note Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 mt-4 text-red-500">
                <AlertCircle size={16} />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 mt-4 text-green-500">
                <CheckCircle2 size={16} />
                <p className="text-sm">Note created successfully!</p>
              </div>
            )}
            <Button type="submit" className="w-full">
              Create Note
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
