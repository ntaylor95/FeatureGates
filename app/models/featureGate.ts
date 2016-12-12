import { FeatureGateEnvironment } from "../models/featureGateEnvironment";

export interface FeatureGate{
  id: string;
  featureTitle: string;
  featureKey: string;
  featureDescription: string;
  environment: Array<FeatureGateEnvironment>;
}
