export type CommentId = `t1_${string}`;
export type UserId = `t2_${string}`;
export type PostId = `t3_${string}`;
export type SubredditId = `t5_${string}`;
export type PetId = string;

export type Page = "home" | "pokemon";

export type WebviewToBlockMessage = 
  | { type: "INIT" } 
  | { type: "GET_POKEMON_REQUEST"; payload: { name: string } };

export type BlocksToWebviewMessage = 
  | { type: "INIT_RESPONSE"; payload: { postId: string } } 
  | { type: "GET_POKEMON_RESPONSE"; payload: { number: number; name: string; error?: string } };

export type DevvitMessage = { 
  type: "devvit-message"; 
  data: { message: BlocksToWebviewMessage }; 
};

export interface UserData {
  flairRank: number;
}

export interface Pet {
  petId: PetId;
  name: string;
  imageUrl: string;
}

export interface UserProfile {
  username: string;
  score: number;
  streak: number;
  longestStreak: number;
  lastPlayed: number;
}

export interface GamePost {
  postId: PostId;
  title: string;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
}

export enum PetCategory {
  Dog = 'Dog',
  Cat = 'Cat',
  Rabbit = 'Rabbit',
  Bird = 'Bird'
}