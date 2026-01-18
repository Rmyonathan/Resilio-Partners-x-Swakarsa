import { scrapeListings, ScrapedJob } from './listingScraper';
import { scrapeDescription } from './descriptionScraper';

export interface JobWithDescription extends ScrapedJob {
  description?: string | null;
  descriptionHtml?: string | null;
}

export async function getJobs(
  searchQuery: string = 'developer',
  location: string = 'remote',
  maxJobs: number = 6
): Promise<JobWithDescription[]> {
  try {
    // Build URL
    const baseUrl = 'https://www.simplyhired.com/search';
    const params = new URLSearchParams({
      q: searchQuery,
      l: location,
    });
    const url = `${baseUrl}?${params.toString()}`;

    // Scrape listings
    const jobs = await scrapeListings(url);
    
    // Slice to max jobs
    const limitedJobs = jobs.slice(0, maxJobs);
    
    // Scrape descriptions for each job (in parallel, but limit concurrency)
    const jobsWithDescriptions = await Promise.all(
      limitedJobs.map(async (job) => {
        if (!job.jobUrl) {
          return { ...job, description: null, descriptionHtml: null };
        }
        
        const desc = await scrapeDescription(job.jobUrl);
        return {
          ...job,
          description: desc.text,
          descriptionHtml: desc.html,
        };
      })
    );

    return jobsWithDescriptions;
  } catch (error) {
    console.error('Error in getJobs:', error);
    return [];
  }
}

