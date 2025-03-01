import type {
  RedditAPIClient,
  RedisClient,
  Scheduler,
} from "@devvit/public-api";
import type { PostId } from "../src/shared.ts";

export abstract class ServiceBase {
  protected readonly redis: RedisClient;
  protected readonly reddit?: RedditAPIClient;
  protected readonly scheduler?: Scheduler;

  constructor(context: {
    redis: RedisClient;
    reddit?: RedditAPIClient;
    scheduler?: Scheduler;
  }) {
    this.redis = context.redis;
    this.reddit = context.reddit;
    this.scheduler = context.scheduler;
  }

  /**
   * Redis key management
   */
  protected readonly keys = {
    // Game session tracking
    gameSessions: (username: string) => `game:${username}:session`,
    userScore: (username: string) => `user:${username}:score`,
    userStreak: (username: string) => `user:${username}:streak`,
    userLongestStreak: (username: string) => `user:${username}:longestStreak`,
    userLastPlayed: (username: string) => `user:${username}:lastPlayed`,

    // Post tracking
    postData: (postId: PostId) => `post:${postId}`,
    userPosts: (username: string) => `user:${username}:posts`,

    // Leaderboards
    gameLeaderboard: "game-leaderboard",
    streakLeaderboard: "streak-leaderboard",

    // Game settings
    gameSettings: "game-settings",
  };

  /**
   * Retrieves a value from Redis.
   */
  protected async getRedisValue(
    key: string,
    field: string,
    defaultValue: string = ""
  ): Promise<string> {
    const value = await this.redis.hGet(key, field);
    return value ?? defaultValue;
  }
}
