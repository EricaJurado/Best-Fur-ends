import { ComponentProps } from "react";
import { useSetPage } from "../hooks/usePage";

export const HomePage = ({ postId }: { postId: string }) => {
  const setPage = useSetPage();

  return (
    <div>
      <p>PostId: {postId}</p>
      <MagicButton
        onClick={() => {
          setPage("pokemon");
        }}
      >
        Show me more
      </MagicButton>
    </div>
  );
};

const MagicButton = ({ children, ...props }: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <span />
      <span>{children}</span>
    </button>
  );
};
