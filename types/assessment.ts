export interface AssessmentMistake {
  original: string;
  correction: string;
  explanation: string;
}

export interface Assessment {
  level: string;
  summary: string;
  mistakes: AssessmentMistake[];
  tip: string;
}
