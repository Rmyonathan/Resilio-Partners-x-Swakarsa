import Parser from 'rss-parser';

export interface RSSJob {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  jobUrl: string | null;
  description?: string | null;
}

export async function fetchRSSJobs(maxJobs: number = 6): Promise<RSSJob[]> {
  const parser = new Parser({
    customFields: {
      item: ['contentSnippet', 'content', 'guid']
    },
    timeout: 5000, // 5 second timeout
  });

  try {
    // WeWorkRemotely Feed (Programming/Remote Jobs)
    // Add timeout wrapper for extra safety
    const feedPromise = parser.parseURL('https://weworkremotely.com/categories/remote-programming-jobs.rss');
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('RSS feed timeout')), 8000)
    );
    
    const feed = await Promise.race([feedPromise, timeoutPromise]) as any;

    if (!feed.items || feed.items.length === 0) {
      console.warn('RSS feed returned no items');
      return [];
    }

    const jobs: RSSJob[] = feed.items.slice(0, maxJobs).map((item) => {
      // WeWorkRemotely titles are usually "Company: Job Title"
      const titleParts = item.title?.split(':') || [];
      let company = 'Unknown Company';
      let title = item.title || 'Untitled Role';

      if (titleParts.length > 1) {
        // Format: "Company: Job Title"
        company = titleParts[0].trim();
        title = titleParts.slice(1).join(':').trim();
      } else if (item.title?.includes(' at ')) {
        // Alternative format: "Job Title at Company"
        const atParts = item.title.split(' at ');
        if (atParts.length > 1) {
          title = atParts[0].trim();
          company = atParts.slice(1).join(' at ').trim();
        }
      }

      // Clean up description (strip HTML, limit length)
      let cleanDesc: string | null = null;
      if (item.contentSnippet) {
        cleanDesc = item.contentSnippet.substring(0, 200).trim();
        if (item.contentSnippet.length > 200) {
          cleanDesc += '...';
        }
      } else if (item.content) {
        // Strip HTML tags if content is HTML
        cleanDesc = item.content.replace(/<[^>]+>/g, '').substring(0, 200).trim();
        if (item.content.length > 200) {
          cleanDesc += '...';
        }
      }

      return {
        title: title,
        company: company,
        location: 'Remote',
        salary: null, // RSS feeds rarely include salary
        jobUrl: item.link || null,
        description: cleanDesc,
      };
    });

    return jobs;
  } catch (error: any) {
    // Silently handle RSS errors - don't break the page
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('RSS Feed Error (non-blocking):', error?.message || error);
    }
    return []; // Return empty array - page will show Arise job only
  }
}

