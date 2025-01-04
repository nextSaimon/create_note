"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Loading from "@/app/loading";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/private/notes", {
          case: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          setNotes(data);
        } else {
          console.error("Error fetching notes:", data.error);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseDetails = () => {
    setSelectedNote(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        {selectedNote && (
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>{selectedNote.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{selectedNote.description}</p>
            <Button onClick={handleCloseDetails} className="mt-4">
              Close
            </Button>
          </CardContent>
        </Card>
      )}
      <Card className="w-full max-w-4xl mt-3">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            All Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            {loading ? (
              <Loading /> // Show loading component while data is being fetched
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                  <Card
                    key={note._id}
                    className="flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div
                      onClick={() => handleNoteClick(note)}
                      className="cursor-pointer"
                    >
                      <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-3">
                          {note.description}
                        </p>
                      </CardContent>
                    </div>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" disabled>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" disabled>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

    
    </div>
  );
}
