const backendOrigin = (
  process.env.BackendURL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3001'
).replace(/\/+$/, '');

const BackendURL = backendOrigin.endsWith('/api/v1')
  ? backendOrigin
  : `${backendOrigin}/api/v1`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BackendURL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}

// 1. PUBLIC PORTFOLIO
export async function getShowcases() {
  return request<any[]>('/showcases');
}

export async function getShowcaseBySlug(slug: string) {
  return request<any>(`/showcases/${slug}`);
}

// 2. PUBLIC LEADS
export async function submitContactLead(form: {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  message: string;
}) {
  return request<{ success: boolean; leadId: string }>('/leads/contact', {
    method: 'POST',
    body: JSON.stringify(form),
  });
}

export async function submitNewsletterLead(email: string) {
  return request<{ success: boolean; leadId: string }>('/leads/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// 3. PUBLIC SEO
export async function getSeoMetadata(path: string) {
  return request<any>(`/seo?path=${encodeURIComponent(path)}`);
}

// 4. ADMIN & AUTHENTICATION
export async function loginAdmin(credentials: any) {
  return request<any>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function logoutAdmin(token: string) {
  return request<any>('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 5. ADMINISTRATIVE ANALYTICS
export async function getAdminAnalytics(token: string) {
  return request<any>('/admin/analytics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 6. ADMINISTRATIVE SHOWCASE CRUD
export async function getAdminShowcases(token: string) {
  return request<any[]>('/showcases/admin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createShowcase(token: string, showcaseData: any) {
  return request<any>('/showcases', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(showcaseData),
  });
}

export async function updateShowcase(token: string, id: string, showcaseData: any) {
  return request<any>(`/showcases/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(showcaseData),
  });
}

export async function deleteShowcase(token: string, id: string) {
  return request<any>(`/showcases/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 7. ADMINISTRATIVE LEADS MANAGEMENT
export async function getAdminLeads(token: string) {
  return request<any[]>('/leads/admin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateLeadStatus(token: string, id: string, status: string) {
  return request<any>(`/leads/admin/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}

export async function deleteLead(token: string, id: string) {
  return request<any>(`/leads/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 8. ADMINISTRATIVE SEO METADATA TRACKER
export async function getAdminSeoPaths(token: string) {
  return request<any[]>('/seo/admin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateSeoPath(token: string, seoData: any) {
  return request<any>('/seo/admin', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(seoData),
  });
}

export async function deleteSeoPath(token: string, id: string) {
  return request<any>(`/seo/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
