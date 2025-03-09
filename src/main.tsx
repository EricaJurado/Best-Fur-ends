import { Devvit, SettingsClient, useWebView } from "@devvit/public-api";
import {
  BlocksToWebviewMessage,
  WebviewToBlockMessage,
} from "../game/shared.js";
import { Preview } from "./components/Preview.js";

// Initialize settings for Petfinder API keys
Devvit.addSettings([
  {
    name: "petfinder-client-id",
    label: "Petfinder Client ID",
    type: "string",
    isSecret: true,
    scope: "app",
  },
  {
    name: "petfinder-client-secret",
    label: "Petfinder Client Secret",
    type: "string",
    isSecret: true,
    scope: "app",
  },
]);

Devvit.configure({
  redditAPI: true,
  http: true,
  redis: true,
});

// Function to fetch access token from Petfinder API
async function fetchAccessToken(settings: SettingsClient) {
  const clientId = await settings.get("petfinder-client-id");
  const clientSecret = await settings.get("petfinder-client-secret");

  const formData = new URLSearchParams();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", String(clientId));
  formData.append("client_secret", String(clientSecret));

  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: formData.toString(), // Convert URLSearchParams to a string
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token.");
  }

  const data = await response.json();
  return data.access_token;
}

// Function to fetch pets using fetch API
async function fetchPets(settings: SettingsClient) {
  try {
    const token = await fetchAccessToken(settings);
    const response = await fetch("https://api.petfinder.com/v2/animals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pets from Petfinder.");
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching pets from Petfinder", error);
    throw new Error("Failed to fetch pets.");
  }
}

// Example of adding a menu item to fetch pets
Devvit.addMenuItem({
  label: "Fetch Pets from Petfinder",
  location: "subreddit",
  onPress: async (_event, { ui, settings }) => {
    try {
      const pets = await fetchPets(settings);
      ui.showToast(`Found ${pets.length} pets!`);
    } catch (error) {
      ui.showToast(`Failed to fetch pets: ${error.message}`);
    }
  },
});

// Example of adding a custom post type
Devvit.addCustomPostType({
  name: "Experience Post",
  height: "tall",
  render: (context) => {
    const { mount } = useWebView<WebviewToBlockMessage, BlocksToWebviewMessage>(
      {
        onMessage: async (event, { postMessage }) => {
          console.log("Received message", event);
          const data = event as unknown as WebviewToBlockMessage;
          switch (data.type) {
            case "INIT":
              postMessage({
                type: "INIT_RESPONSE",
                payload: {
                  postId: context.postId!,
                },
              });
              break;

            default:
              console.error("Unknown message type", data satisfies never);
              break;
          }
        },
      }
    );

    return (
      <vstack height="100%" width="100%" alignment="center middle">
        <button
          onPress={() => {
            mount();
          }}
        >
          Launch Game
        </button>
      </vstack>
    );
  },
});

export default Devvit;
