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
    }
  });

  try {
    // WeWorkRemotely Feed (Programming/Remote Jobs)
    const feed = await parser.parseURL('https://weworkremotely.com/categories/remote-programming-jobs.rss');

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
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return []; // Return empty to trigger fallback in actions.ts
  }
}

