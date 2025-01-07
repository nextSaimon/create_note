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
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const handleEdit = (note) => {
    setEditData({ title: note.title, description: note.description });
    setSelectedNote(note);
    setIsModalOpen(true); // Open modal for editing
    
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/private/note/${selectedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        // Update the note in the local state
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === selectedNote._id ? { ...note, ...editData } : note
          )
        );
        setIsModalOpen(false); // Close the modal
        setSelectedNote(null);
      } else {
        console.error("Error updating note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async (noteId) => {
    setNotes(notes.filter((note) => note._id !== noteId));

    if (selectedNote && selectedNote._id === noteId) {
      setSelectedNote(null);
    }

    await fetch(`/api/private/note/${noteId}`, { method: "DELETE" });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/private/note/notes", {
          cache: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          setNotes(data.notes);
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

  const handleCloseDetails = () => {
    setSelectedNote(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
              <Loading />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes
                  .slice()
                  .reverse()
                  .map((note) => (
                    <Card
                      key={note._id}
                      className="flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div
                        onClick={() => handleEdit(note)}
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
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(note)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(note._id)}
                        >
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

      {/* Modal for Editing Note */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
            <CardTitle>Edit Note</CardTitle>
          </ModalHeader>
          <ModalContent>
            <Input
              placeholder="Title"
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mb-4"
            />
            <Textarea
              placeholder="Description"
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </ModalContent>
          <ModalFooter>
            <Button onClick={handleSaveEdit}>Save</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
