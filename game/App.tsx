import { useEffect, useState } from "react";
import { Page, AppContext } from "./shared";
import GuessPage from "./pages/GuessPage";
import { usePage } from "./hooks/usePage";
import { sendToDevvit } from "./utils";

interface PageComponentProps {
  page: Page;
  postId: string;
}

const PageComponent = ({ page, postId }: PageComponentProps) => {
  switch (page) {
    case "home":
      return <GuessPage postId={postId} />;
    default:
      throw new Error(`Unknown page: ${page}`);
  }
};

export const App = () => {
  const [postId, setPostId] = useState<string>("");
  const page = usePage();

  useEffect(() => {
    sendToDevvit({ type: "INIT" });
  }, []);

  return (
    <div className="h-full">
      <PageComponent page={page} postId={postId} />
    </div>
  );
};
