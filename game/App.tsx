import { useEffect, useState } from "react";
import { Page } from "./shared";
import { PokemonPage } from "./pages/PokemonPage";
import GuessPage from "./pages/GuessPage";
import { usePage } from "./hooks/usePage";
import { sendToDevvit } from "./utils";
import { useDevvitListener } from "./hooks/useDevvitListener";

const PageComponent = ({ page, postId }: { page: Page; postId: string }) => {
  switch (page) {
    case "home":
      return <GuessPage postId={postId} />;
    case "pokemon":
      return <PokemonPage />;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
};

export const App = () => {
  const [postId, setPostId] = useState<string>("");
  const page = usePage();
  const initData = useDevvitListener("INIT_RESPONSE");

  useEffect(() => {
    sendToDevvit({ type: "INIT" });
  }, []);

  useEffect(() => {
    if (initData) {
      setPostId(initData.postId);
    }
  }, [initData]);

  return (
    <div className="h-full">
      <PageComponent page={page} postId={postId} />
    </div>
  );
};
