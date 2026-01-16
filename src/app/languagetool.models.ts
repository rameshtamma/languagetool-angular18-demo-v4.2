export interface LanguageToolResponse {
  matches: LTMatch[];
}

export interface LTMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: { value: string; shortDescription?: string }[];
  rule?: { id: string; description?: string; issueType?: string };
}
