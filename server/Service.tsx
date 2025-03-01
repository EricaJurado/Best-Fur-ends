import type {
  RedditAPIClient,
  RedisClient,
  Scheduler,
} from "@devvit/public-api";
// import { PetService } from "./PetService.js";
// import { GameService } from "./GameService.js";
// import { LeaderboardService } from "./LeaderboardService.js";
// import { UserService } from "./UserService.js";

export class Service {
  readonly redis: RedisClient;
  readonly reddit?: RedditAPIClient;
  readonly scheduler?: Scheduler;

  // public petService: PetService;
  // public gameService: GameService;
  // public leaderboardService: LeaderboardService;
  // public userService: UserService;

  constructor(context: {
    redis: RedisClient;
    reddit?: RedditAPIClient;
    scheduler?: Scheduler;
  }) {
    this.redis = context.redis;
    this.reddit = context.reddit;
    this.scheduler = context.scheduler;

    // this.petService = new PetService(context);
    // this.gameService = new GameService(context);
    // this.leaderboardService = new LeaderboardService(context);
    // this.userService = new UserService(context);
  }

  /**
   * Redis keys used for data storage.
   */
  readonly keys = {
    pets: () => `pets`, // Stores all cached pet data
    petById: (petId: string) => `pet:${petId}`, // Single pet info
    userScore: (username: string) => `user:${username}:score`,
    userStreak: (username: string) => `user:${username}:streak`,
    userLastPlayed: (username: string) => `user:${username}:lastPlayed`,
    leaderboard: () => `leaderboard`,
    gameSessions: (username: string) => `user:${username}:gameSession`, // Tracks ongoing game state
  };

  /*
   * User score handling + update leaderboard
   */
  async saveUserScore(username: string, score: number): Promise<void> {
    const key = this.keys.userScore(username);
    await this.redis.hSet(key, { score: score.toString() });

    // await this.leaderboardService.updateLeaderboard(username, score);
  }

  async getUserScore(username: string): Promise<number> {
    const key = this.keys.userScore(username);
    const score = await this.redis.hGet(key, "score");
    return score ? parseInt(score, 10) : 0;
  }
}
