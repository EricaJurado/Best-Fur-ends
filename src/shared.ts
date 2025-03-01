export type CommentId = `t1_${string}`;
export type UserId = `t2_${string}`;
export type PostId = `t3_${string}`;
export type SubredditId = `t5_${string}`;

export type PetId = string;

export type UserData = {
  flairRank: number;
};

export interface Pet {
  petId: PetId;
  name: string;
  imageUrl: string;
}

export interface GameSession {
  username: string;
  pets: Pet[];
  startedAt: number; // Timestamp
}

export interface UserProfile {
  username: string;
  score: number;
  streak: number;
  longestStreak: number;
  lastPlayed: number;
}

/**
 * Reddit post linked to a game.
 */
export interface GamePost {
  postId: PostId;
  title: string;
  author: string;
  createdAt: number;
  upvotes: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
}

/**
 * Enum for different pet categories.
 */
export enum PetCategory {
  Dog = 'Dog',
  Cat = 'Cat',
  Rabbit = 'Rabbit',
  Bird = 'Bird'
}