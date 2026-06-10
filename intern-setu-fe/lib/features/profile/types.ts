export type UserRole = "STUDENT" | "TEACHER" | "TPO" | "SUPER_ADMIN" | "COLLEGE_ADMIN" | "HR" | "RECRUITER";

export interface Skill {
  id: number;
  name: string;
}

export interface Project {
  id: number | string;
  name: string;
  description: string;
}

export interface Certificate {
  id: number | string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  url: string;
}

export interface SocialMediaPlatform {
  id: number;
  name: string;
  iconUrl: string;
}

export interface StudentSocialLinks {
  id: number;
  socialMediaPlatform: SocialMediaPlatform;
  link: string;
}

export interface StudentProfile {
  id: number | string;
  prn: string;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  dateOfBirth: string | null;
  graduationYear: string | null;
  course: string | null;
  branch: string | null;
  panel: string | null;
  about: string | null;
  resumeLink: string | null;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  socials: StudentSocialLinks[];
}

export interface TpoProfile {
  id: number | string;
  employeeId: string | null;
  designation: string | null;
  phoneNumber: string | null;
  cabinLocation: string | null;
}

export interface TeacherProfile {
  id: number | string;
  employeeId: string | null;
  designation: string | null;
  department: string | null;
  qualification: string | null;
  specialization: string | null;
  phoneNumber: string | null;
  cabinLocation: string | null;
}

interface BaseProfile {
  id: number;
  email: string;
  isActive: boolean;
  role: UserRole;
}

export interface EmployerProfile {
  id: number;
  linkedinProfile: string | null;
}

export interface StudentProfileState extends BaseProfile {
  profile: StudentProfile | null;
}

export interface TpoProfileState extends BaseProfile {
  profile: TpoProfile | null;
}

export interface TeacherProfileState extends BaseProfile {
  profile: TeacherProfile | null;
}

export interface EmployerProfileState extends BaseProfile {
  role: "HR" | "RECRUITER";
  profile: EmployerProfile | null;
}

export interface CollegeAdminProfile {
  id: number | string;
  employeeId: string | null;
  designation: string | null;
  phoneNumber: string | null;
  department: string | null;
}

export interface CollegeAdminProfileState extends BaseProfile {
  profile: CollegeAdminProfile | null;
}
