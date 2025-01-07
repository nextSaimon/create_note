"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ModalForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      return;
    }

    try {
      const response = await fetch("/api/private/note/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setTitle("");
        setDescription("");
        setSuccess(true);
        setIsOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to create note. Please check your connection and try again."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
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
      </DialogContent>
    </Dialog>
  );
}
