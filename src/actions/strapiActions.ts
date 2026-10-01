'use server';
import { submitFormSubmission, getJobPositions, getJobDepartments, getNavbarSetting } from '@/lib/strapi';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  branch: z.string().optional(),
  branchCode: z.string().optional(),
  enquiryType: z.string().optional(),
  sourceForm: z.string().optional(),
  purity: z.string().optional(),
  weight: z.string().optional(),
  details: z.any().optional(),
});


export async function submitFormSubmissionAction(data?: any) {
  const parsed = formSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'Invalid input data: ' + parsed.error.issues.map(i => i.message).join(', ') };
  }
  return (submitFormSubmission as any)(parsed.data);
}
export async function getJobPositionsAction() { return (getJobPositions as any)(); }
export async function getJobDepartmentsAction() { return getJobDepartments(); }
export async function getNavbarSettingAction() { return getNavbarSetting(); }
