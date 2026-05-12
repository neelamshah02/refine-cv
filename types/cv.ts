export interface KeyQualifications {
  roles: string[];
  technology: string[];
  tools: string[];
  methods: string[];
}

export interface ProjectEngagement {
  client: string;
  industry: string;
  dateRange: string;
  projectName: string;
  roles: string[];
  description: string;
  bulletPoints: string[];
  methodAndTechnology: string[];
}

export interface Employment {
  dateRange: string;
  company: string;
  title: string;
}

export interface Education {
  dateRange: string;
  degree: string;
  institution: string;
}

export interface Certification {
  date: string;
  name: string;
  issuer: string;
}

export interface Course {
  date: string;
  name: string;
  provider: string;
}

export interface Honor {
  date: string;
  name: string;
  issuer: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface CVData {
  name: string;
  title: string;
  profileSummary: string;
  keyQualifications: KeyQualifications;
  employments: Employment[];
  education: Education[];
  certifications: Certification[];
  courses: Course[];
  honorsAndAwards: Honor[];
  languages: Language[];
  projects: ProjectEngagement[];
}

export interface RefinementResult {
  profile_summary: string;
  key_qualifications: KeyQualifications;
  projects: ProjectEngagement[];
  gaps: string[];
  suggestions: string[];
  pitch_note: string;
  data_issues: string[];
}

export type ApprovalStatus = "original" | "refined" | "edited";

export interface ReviewState {
  profileSummary: ApprovalStatus;
  profileSummaryText: string;
  keyQualifications: ApprovalStatus;
  keyQualificationsData: KeyQualifications;
  projects: { status: ApprovalStatus; data: ProjectEngagement }[];
  pitchNote: string;
}
