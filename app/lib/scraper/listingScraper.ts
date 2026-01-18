import * as cheerio from 'cheerio';

export interface ScrapedJob {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  jobUrl: string | null;
}

export async function scrapeListings(url: string): Promise<ScrapedJob[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.google.com/',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs: ScrapedJob[] = [];

    $('h2[data-testid="searchSerpJobTitle"]').each((index, element) => {
      const $jobCard = $(element).closest('article, div[data-testid], li').first();
      const $container = $jobCard.length ? $jobCard : $(element).parent().parent().parent();
      
      const title = $(element).find('a').text().trim();
      const href = $(element).find('a').attr('href');
      const jobUrl = href ? `https://www.simplyhired.com${href.split('?')[0]}` : null;
      const company = $container.find('span[data-testid="companyName"]').text().trim();
      const location = $container.find('span[data-testid="searchSerpJobLocation"]').text().trim();
      const salary = $container.find('span[data-testid="salaryChip-0"]').text().trim() || null;

      if (title) {
        jobs.push({ title, company, location, salary, jobUrl });
      }
    });
    
    return jobs;
  } catch (error) {
    console.error('Error scraping listings:', error);
    return [];
  }
}

