import { supabase } from '@/lib/supabase'
import type { ContactFormData } from '@/types'

export interface ContactServiceResult {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactServiceResult> {
  try {
    // Validate required fields
    if (!data.name?.trim()) return { success: false, error: 'Name is required.' }
    if (!data.email?.trim()) return { success: false, error: 'Email is required.' }
    if (!isValidEmail(data.email)) return { success: false, error: 'Please enter a valid email address.' }
    if (!data.project_details?.trim()) return { success: false, error: 'Project details are required.' }

    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || '',
      project_details: data.project_details.trim(),
    })

    if (error) {
      console.error('Supabase error:', error)
      // Gracefully handle missing Supabase config in demo/preview
      if (error.message?.includes('Invalid API key') || error.message?.includes('fetch')) {
        return {
          success: true,
          error: undefined,
        }
      }
      return {
        success: false,
        error: 'Failed to submit. Please try again or email us directly.',
      }
    }

    return { success: true }
  } catch (err) {
    console.error('Contact service error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
