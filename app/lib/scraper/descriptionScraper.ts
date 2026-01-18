import * as cheerio from 'cheerio';

export interface JobDescription {
  text: string | null;
  html: string | null;
}

export async function scrapeDescription(jobUrl: string): Promise<JobDescription> {
  try {
    const response = await fetch(jobUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.simplyhired.com/',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const $descContainer = $('div[data-testid="viewJobBodyJobFullDescriptionContent"]');
    
    return {
      text: $descContainer.text().replace(/\s+/g, ' ').trim(),
      html: $descContainer.html() || null
    };
  } catch (error) {
    console.error('Error scraping description:', error);
    return { text: null, html: null };
  }
}

