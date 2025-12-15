export interface TechTool {
  name: string;
  category: string;
  description: string;
}

export interface AvoidTool {
  tool: string;
  reason: string;
}

export interface MvpStrategy {
  mustBuild: string[];
  mustCut: string[];
}

export interface RecommendationResponse {
  classification: string;
  buildApproach: string;
  stack: TechTool[];
  whatNotToUse: AvoidTool[];
  mvpCutLine: MvpStrategy;
  commonMistake: string;
  whyThisStackWins: string[];
}
