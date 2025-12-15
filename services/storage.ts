import { supabase } from './supabaseClient';
import { Project, Testimonial, ContactSubmission, User } from '../types';

// --- PROJECTS ---
export const getProjects = async (): Promise<Project[]> => {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  
  return (data || []).map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    technologies: p.technologies || [],
    demoUrl: p.demo_url,
    githubUrl: p.github_url,
    thumbnailUrl: p.thumbnail_url,
    category: p.category,
    dateCompleted: p.date_completed,
    isVisible: p.is_visible
  }));
};

export const saveProject = async (project: Project): Promise<void> => {
  // If the ID is a long number (Date.now) or undefined/short, handle accordingly.
  // UUIDs are 36 chars. Date.now() is 13 chars.
  const id = (project.id && project.id.length > 20) ? project.id : undefined;
  
  const payload = {
    ...(id ? { id } : {}),
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    demo_url: project.demoUrl,
    github_url: project.githubUrl,
    thumbnail_url: project.thumbnailUrl,
    category: project.category,
    date_completed: project.dateCompleted,
    is_visible: project.isVisible
  };

  await supabase.from('projects').upsert(payload);
};

export const deleteProject = async (id: string): Promise<void> => {
  await supabase.from('projects').delete().eq('id', id);
};

// --- TESTIMONIALS ---
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

  return (data || []).map((t: any) => ({
    id: t.id,
    clientName: t.client_name,
    companyName: t.company_name,
    text: t.text,
    photoUrl: t.photo_url,
    rating: t.rating,
    dateReceived: t.date_received,
    isVisible: t.is_visible,
    isFeatured: t.is_featured
  }));
};

export const saveTestimonial = async (item: Testimonial): Promise<void> => {
  const id = (item.id && item.id.length > 20) ? item.id : undefined;
  const payload = {
    ...(id ? { id } : {}),
    client_name: item.clientName,
    company_name: item.companyName,
    text: item.text,
    photo_url: item.photoUrl,
    rating: item.rating,
    date_received: item.dateReceived,
    is_visible: item.isVisible,
    is_featured: item.isFeatured
  };

  await supabase.from('testimonials').upsert(payload);
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await supabase.from('testimonials').delete().eq('id', id);
};

// --- MESSAGES ---
export const getMessages = async (): Promise<ContactSubmission[]> => {
  const { data } = await supabase.from('messages').select('*').order('submitted_at', { ascending: false });
  return (data || []).map((m: any) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    message: m.message,
    status: m.status,
    submittedAt: m.submitted_at
  }));
};

export const saveMessage = async (msg: Omit<ContactSubmission, 'id' | 'status' | 'submittedAt'>): Promise<void> => {
  await supabase.from('messages').insert({
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    message: msg.message,
    submitted_at: new Date().toISOString()
  });
};

export const markMessageRead = async (id: string): Promise<void> => {
  // We use .select() to ensure the row is returned, confirming the update happened.
  const { data, error } = await supabase
    .from('messages')
    .update({ status: 'read' })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
  
  // If no data returned, no row was updated (e.g. ID mismatch or permissions)
  if (!data || data.length === 0) {
    throw new Error('Message not updated. Check ID or permissions.');
  }
};

export const deleteMessage = async (id: string): Promise<void> => {
  await supabase.from('messages').delete().eq('id', id);
};

// --- AUTH ---
export const loginUser = async (email: string, pass: string): Promise<boolean> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
  return !error && !!data.session;
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Placeholder to satisfy typescript errors if referenced elsewhere
export const getUser = (): User => ({ username: 'Admin', passwordHash: '', lastLogin: '' });
export const updateUser = async (updates: Partial<User>): Promise<void> => {};
export const setSession = (isActive: boolean) => {};