import { supabase } from './supabase';
import { MediaCompany } from '@/types/database.types';
import publishersData from '../../data/publishers.json';

export async function getMediaCompanies(): Promise<MediaCompany[]> {
  try {
    // First try to load from local JSON data
    if (publishersData && publishersData.length > 0) {
      return publishersData as MediaCompany[];
    }

    // Fallback to Supabase if needed
    const { data, error } = await supabase
      .from('media_companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching media companies:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function getNewslettersByCompany(companyId: string) {
  try {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('company_id', companyId)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching newsletters:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
