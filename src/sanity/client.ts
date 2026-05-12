import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn, token } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token, // Required for preview/drafts or server-side mutations
});
