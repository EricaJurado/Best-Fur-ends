import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { PetTileDroppable } from "../components/PetTile";

// Draggable Component
interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
};

// GuessPage Component
interface GuessPageProps {
  postId: string;
}

const GuessPage = ({ postId }: GuessPageProps) => {
  const [petList, setPetList] = useState<
    {
      id: string;
      petId: string;
      name: string;
      imageUrl: string;
      parent: UniqueIdentifier | null;
    }[]
  >([
    {
      id: "1",
      petId: "1",
      name: "Simon",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
    {
      id: "2",
      petId: "2",
      name: "Maestro",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
    {
      id: "3",
      petId: "3",
      name: "Purry",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
    {
      id: "4",
      petId: "4",
      name: "Apple",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
    {
      id: "5",
      petId: "5",
      name: "Bubs",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
    {
      id: "6",
      petId: "6",
      name: "MewMew",
      imageUrl:
        "https://www.petfinder.com/cat/tom-75344086/ny/buffalo/city-of-buffalo-animal-shelter-ny341/",
      parent: null,
    },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const updatedPetList = [...petList];

    if (over) {
      // Check if the droppable already has a pet
      const existingPetIndex = updatedPetList.findIndex(
        (item) => item.parent === over.id
      );

      if (existingPetIndex !== -1) {
        // Replace the existing pet in the droppable
        updatedPetList[existingPetIndex].parent = null;
      }

      // Assign the dragged pet to the droppable
      const draggedPetIndex = updatedPetList.findIndex(
        (item) => item.id === active.id
      );
      if (draggedPetIndex !== -1) {
        updatedPetList[draggedPetIndex].parent = over.id;
      }
    }

    setPetList(updatedPetList);
  };

  const renderDraggables = (parent: UniqueIdentifier | null) => {
    return petList
      .filter((item) => item.parent === parent)
      .map((item) => (
        <Draggable key={item.id} id={item.id}>
          {item.name}
        </Draggable>
      ));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Show petList that aren't assigned a parent */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {renderDraggables(null)}{" "}
      </div>

      {petList.map((pet) => (
        <PetTileDroppable key={pet.id} id={pet.id} pet={pet}>
          {renderDraggables(pet.id)}{" "}
          {/* Show "Drop here" if no other pets are assigned */}
          {petList.every((item) => item.parent !== pet.id) && "Drop here"}
        </PetTileDroppable>
      ))}
    </DndContext>
  );
};

export default GuessPage;
