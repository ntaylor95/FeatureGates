import { FeatureGateHistory } from "../models/featureGateHistory";
import { Environment } from "../models/environment";

export interface FeatureGateEnvironment{
  environment: Environment;
  isDeleted: boolean;
  createdAt: string;
  version: number;
  history: Array<FeatureGateHistory>;
}

