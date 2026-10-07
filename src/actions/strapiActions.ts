'use server';
import { submitFormSubmission, getJobPositions, getJobDepartments, getNavbarSetting } from '@/lib/strapi';
import { getDailyCachedBranchMasterData } from '@/lib/branchMaster';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  branch: z.string().optional(),
  branchCode: z.string().min(1, 'Branch is required'),
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

  const submission = parsed.data;

  // Server-side branch validation
  try {
    const branchData = await getDailyCachedBranchMasterData();
    if (branchData && branchData.allBranches && branchData.allBranches.length > 0) {
      const found = branchData.allBranches.find(
        (b) => b.branchCode.toLowerCase() === submission.branchCode.toLowerCase()
      );
      if (!found) {
        return { success: false, error: 'Please re-select your branch.' };
      }
    }
  } catch (err) {
    console.warn('[submitFormSubmissionAction] Branch lookup error, passing through:', err);
  }

  return (submitFormSubmission as any)(submission);
}
export async function getJobPositionsAction() { return (getJobPositions as any)(); }
export async function getJobDepartmentsAction() { return getJobDepartments(); }
export async function getNavbarSettingAction() { return getNavbarSetting(); }
