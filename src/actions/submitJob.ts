'use server';
import { submitJobApplication as submitToStrapi } from '@/lib/strapi';

export async function submitJobAction(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const coverNote = formData.get('coverNote') as string;
  const jobPosition = formData.get('jobPosition') as string;
  const experienceYears = (formData.get('experienceYears') as string) || '';
  const currentCity = (formData.get('currentCity') as string) || '';
  const noticePeriod = (formData.get('noticePeriod') as string) || '';
  const resumeFile = formData.get('resumeFile') as File | null;

  return await submitToStrapi({
    fullName, email, phone, coverNote, jobPosition, experienceYears, currentCity, noticePeriod, resumeFile
  });
}
