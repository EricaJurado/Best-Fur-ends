import { useDroppable } from "@dnd-kit/core";
import { Pet } from "../shared";

interface PetTileDroppableProps {
  id: string;
  pet: Pet;
  children: React.ReactNode;
}

export const PetTileDroppable = ({
  id,
  pet,
  children,
}: PetTileDroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style: React.CSSProperties = {
    border: isOver ? "2px dashed green" : "2px dashed gray",
    padding: "10px",
    minHeight: "50px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <img src={pet.imageUrl} alt={pet.name} />
      {children}
    </div>
  );
};
