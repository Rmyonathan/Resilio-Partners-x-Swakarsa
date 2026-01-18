'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import { auth } from '@/auth' 
import bcrypt from 'bcryptjs' // Pastikan library ini sudah diinstall (npm install bcryptjs @types/bcryptjs)

// Inisialisasi Resend
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

// Inisialisasi Gmail SMTP (Alternative to Resend - FREE, no domain needed!)
const gmailTransporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

// Debug: Log email configuration status on server startup (only once)
let emailConfigLogged = false;
if (typeof window === 'undefined' && !emailConfigLogged) { // Only log on server side, once
  emailConfigLogged = true;
  console.log('\n📧 Email Configuration Status:');
  console.log('  Resend API Key:', process.env.RESEND_API_KEY ? '✅ Configured' : '❌ Not configured');
  console.log('  Gmail User:', process.env.GMAIL_USER ? `✅ ${process.env.GMAIL_USER}` : '❌ Not configured');
  console.log('  Gmail App Password:', process.env.GMAIL_APP_PASSWORD ? '✅ Configured (hidden)' : '❌ Not configured');
  console.log('  Admin Email:', process.env.ADMIN_EMAIL || 'swakarsadigital@gmail.com');
  if (!resend && !gmailTransporter) {
    console.warn('\n⚠️  WARNING: No email service configured! Emails will NOT be sent.');
    console.warn('    📝 To fix: Add these to your .env file:');
    console.warn('       GMAIL_USER=swakarsadigital@gmail.com');
    console.warn('       GMAIL_APP_PASSWORD=your_16_char_app_password_here');
    console.warn('       ADMIN_EMAIL=swakarsadigital@gmail.com');
    console.warn('    🔗 How to get Gmail App Password: https://myaccount.google.com/apppasswords\n');
  } else {
    console.log('  ✅ Email service ready!\n');
  }
}

// Helper function to send email (prioritizes Gmail SMTP, then Resend as fallback)
async function sendEmail(options: { to: string; subject: string; html: string; from?: string }) {
  // Try Gmail SMTP FIRST (FREE, works immediately without domain)
  if (gmailTransporter) {
    try {
      await gmailTransporter.sendMail({
        from: `Resilio Partners <${process.env.GMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return { success: true, method: 'gmail' };
    } catch (error) {
      console.error('Gmail SMTP email failed, trying Resend:', error);
      // Fall through to Resend
    }
  }

  // Fallback to Resend (requires domain verification)
  if (resend) {
    try {
      const fromEmail = options.from || 'Resilio Partners <noreply@resiliopartners.com>';
      await resend.emails.send({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return { success: true, method: 'resend' };
    } catch (error) {
      console.error('Resend email also failed:', error);
      return { success: false, error };
    }
  }

  // No email service configured
  console.warn('⚠️ No email service configured!');
  console.warn('To enable emails, add to your .env file:');
  console.warn('  Option 1 (Gmail - FREE): GMAIL_USER=your_email@gmail.com and GMAIL_APP_PASSWORD=your_app_password');
  console.warn('  Option 2 (Resend): RESEND_API_KEY=re_your_api_key');
  return { success: false, error: 'No email service configured' };
}

// ==========================================
// 1. PUBLIC: LANDING PAGE DATA
// ==========================================

export async function getLandingPageData() {
  try {
    const [team, portfolio, skills] = await Promise.all([
      prisma.teamMember.findMany({ orderBy: { order: 'asc' } }),
      prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.skill.findMany({ orderBy: { id: 'asc' } })
    ]);
    return { team, portfolio, skills };
  } catch (error) {
    console.error("Database Error (Landing Page):", error);
    return { team: [], portfolio: [], skills: [] };
  }
}

export async function getPortfolioPageData() {
  try {
    return await prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function getTeamPageData() {
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  } catch (error) {
    return [];
  }
}

// ==========================================
// 2. PUBLIC: FORM SUBMISSIONS
// ==========================================

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    honeypot: formData.get('company'),
  }

  if (rawData.honeypot) return { success: false, message: "Bot detected." };
  if (!rawData.name || !rawData.email || !rawData.message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: rawData.name,
        email: rawData.email,
        message: rawData.message,
        status: "UNREAD"
      }
    });

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'swakarsadigital@gmail.com',
      subject: `New Contact Message: ${rawData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Message</h2>
          <p><strong>Name:</strong> ${rawData.name}</p>
          <p><strong>Email:</strong> ${rawData.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            ${rawData.message.replace(/\n/g, '<br/>')}
          </div>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    
    return { success: true, message: "Message sent successfully! We'll get back to you within 24 hours." };
  } catch (error) {
    console.error("Contact Submit Error:", error);
    return { success: false, message: "Gagal mengirim pesan, coba lagi nanti." };
  }
}

export async function submitJobApplication(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      hasWorkspace: formData.get('hasWorkspace') === 'on',
      experience: formData.get('experience') as string,
    }

    if (!rawData.email || !rawData.fullName) {
      return { success: false, message: "Email dan Nama wajib diisi." };
    }

    await prisma.jobApplication.create({
      data: {
        fullName: rawData.fullName,
        email: rawData.email,
        phone: rawData.phone,
        location: rawData.location,
        hasWorkspace: rawData.hasWorkspace,
        experience: rawData.experience,
        status: "NEW" 
      }
    });

    if (resend) {
      await resend.emails.send({
        from: 'Swakarsa Careers <jobs@swakarsadigital.com>',
        to: 'swakarsadigital@gmail.com',
        subject: `Pelamar Baru Arise: ${rawData.fullName}`,
        html: `<h3>Lamaran Kerja Baru</h3><p><strong>Nama:</strong> ${rawData.fullName}</p><p><strong>Email:</strong> ${rawData.email}</p><p><strong>Lokasi:</strong> ${rawData.location}</p>`
      });
    }

    return { success: true, message: "Lamaran berhasil dikirim!" };
  } catch (error) {
    console.error("Job Submit Error:", error);
    return { success: false, message: "Terjadi kesalahan sistem saat melamar." };
  }
}

export async function submitAriseApplication(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      hasWorkspace: formData.get('hasWorkspace') === 'true', // Radio button value
      experience: formData.get('experience') as string || null,
      referralSource: formData.get('referralSource') as string || null,
      curatedJobId: formData.get('curatedJobId') as string || null, // Optional: for curated jobs
      jobAppliedFor: formData.get('jobAppliedFor') as string || 'Arise', // Track which job
    }

    if (!rawData.email || !rawData.fullName || !rawData.phone || !rawData.location) {
      return { success: false, message: "All required fields must be filled." };
    }

    // Create application in database
    const application = await prisma.jobApplication.create({
      data: {
        fullName: rawData.fullName,
        email: rawData.email,
        phone: rawData.phone,
        location: rawData.location,
        hasWorkspace: rawData.hasWorkspace,
        experience: rawData.experience,
        referralSource: rawData.referralSource,
        jobAppliedFor: rawData.jobAppliedFor,
        curatedJobId: rawData.curatedJobId || null,
        status: "NEW"
      }
    });

    // Send email notifications
    try {
      // Email 1: Confirmation email to applicant
      console.log('Sending confirmation email to:', rawData.email);
      const emailResult1 = await sendEmail({
        to: rawData.email,
        subject: 'Welcome to Resilio Partners - Next Steps',
        html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                  .steps { margin: 20px 0; }
                  .step { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; border-radius: 5px; }
                  .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                  .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Welcome to Resilio Partners!</h1>
                  </div>
                  <div class="content">
                    <p>Hi ${rawData.fullName},</p>
                    <p>Thank you for your interest in working with Resilio Partners! We've received your application and are excited to help you start your work-from-home journey.</p>
                    
                    <h3>What happens next:</h3>
                    <div class="steps">
                      <div class="step">
                        <strong>1. Application Review</strong><br>
                        We'll review your application within 2 business days
                      </div>
                      <div class="step">
                        <strong>2. Onboarding Email</strong><br>
                        If approved, you'll receive an onboarding email with detailed setup instructions
                      </div>
                      <div class="step">
                        <strong>3. Arise University Enrollment</strong><br>
                        We'll guide you through the Arise University enrollment process
                      </div>
                      <div class="step">
                        <strong>4. Get Certified & Start Earning</strong><br>
                        Our tech support team will help you get certified and start earning
                      </div>
                    </div>
                    
                    <p><strong>Questions?</strong> Reply to this email or contact us at <a href="mailto:support@resiliopartners.com">support@resiliopartners.com</a></p>
                    
                    <p>Best regards,<br><strong>Resilio Partners Team</strong></p>
                  </div>
                  <div class="footer">
                    <p>© 2025 Resilio Partners. All Rights Reserved.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
      });
      console.log('Confirmation email result:', emailResult1);

      // Email 2: Notification email to admin (you)
      const jobTitle = rawData.jobAppliedFor || 'Arise Platform';
      const adminEmail = process.env.ADMIN_EMAIL || 'swakarsadigital@gmail.com';
      console.log('Sending notification email to admin:', adminEmail);
      console.log('Gmail configured?', !!gmailTransporter);
      console.log('Resend configured?', !!resend);
      const emailResult2 = await sendEmail({
        to: adminEmail,
        subject: `New ${jobTitle} Agent Application Received: ${rawData.fullName}`,
        html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #f44336; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                  .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; border-radius: 5px; }
                  .info-box strong { display: inline-block; width: 150px; }
                  .badge { display: inline-block; padding: 5px 10px; background: #4caf50; color: white; border-radius: 5px; font-size: 12px; margin-left: 10px; }
                  .badge.no { background: #ff9800; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>New Job Application Received</h2>
                  </div>
                  <div class="content">
                    <p>A new application has been submitted for <strong>${jobTitle}</strong>.</p>
                    
                    <div class="info-box">
                      <p><strong>Full Name:</strong> ${rawData.fullName}</p>
                      <p><strong>Email:</strong> <a href="mailto:${rawData.email}">${rawData.email}</a></p>
                      <p><strong>Phone:</strong> <a href="tel:${rawData.phone}">${rawData.phone}</a></p>
                      <p><strong>Location:</strong> ${rawData.location}</p>
                      <p><strong>Workspace Ready:</strong> 
                        ${rawData.hasWorkspace ? '<span class="badge">Yes</span>' : '<span class="badge no">No</span>'}
                      </p>
                      ${rawData.experience ? `<p><strong>Experience:</strong><br>${rawData.experience}</p>` : ''}
                      ${rawData.referralSource ? `<p><strong>Referral Source:</strong> ${rawData.referralSource}</p>` : ''}
                      <p><strong>Application ID:</strong> ${application.id}</p>
                      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <p style="margin-top: 30px;">
                      <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/applications/${application.id}" 
                         style="display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">
                        View Full Application in Admin Panel
                      </a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
      });
      console.log('Admin notification email result:', emailResult2);
      
      if (!emailResult2.success) {
        console.error('Failed to send admin notification email:', emailResult2.error);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the application submission if email fails
      // The application is already saved to the database
    }

    revalidatePath('/jobs');
    return { success: true, message: "Application submitted successfully!" };
  } catch (error: any) {
    console.error("Arise Application Submit Error:", error);
    // Handle duplicate email error
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return { success: false, message: "An application with this email already exists." };
    }
    return { success: false, message: "An error occurred while submitting your application. Please try again." };
  }
}

// ==========================================
// 3. ADMIN: DASHBOARD DATA & ACTIONS
// ==========================================

export async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function getJobApplications(filterStatus?: string) {
  try {
    const where = filterStatus && filterStatus !== 'ALL' 
      ? { status: filterStatus as any }
      : {};
    
    return await prisma.jobApplication.findMany({ 
      where,
      include: {
        curatedJob: true // Include related curated job if exists
      },
      orderBy: { createdAt: 'desc' } 
    });
  } catch (error) {
    return [];
  }
}

export async function getJobApplicationById(id: string) {
  try {
    return await prisma.jobApplication.findUnique({ 
      where: { id },
      include: {
        curatedJob: true // Include related curated job if exists
      }
    });
  } catch (error) {
    return null;
  }
}

export async function updateApplicationStatus(formData: FormData) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;
    
    await prisma.jobApplication.update({
      where: { id },
      data: { status: status as any, updatedAt: new Date() }
    });
    
    revalidatePath('/admin/applications');
    revalidatePath(`/admin/applications/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update status." };
  }
}

export async function updateApplicationNotes(formData: FormData) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    const id = formData.get('id') as string;
    const notes = formData.get('notes') as string;
    
    await prisma.jobApplication.update({
      where: { id },
      data: { notes, updatedAt: new Date() }
    });
    
    revalidatePath(`/admin/applications/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update notes." };
  }
}

export async function getAllCuratedJobs() {
  try {
    return await prisma.curatedJob.findMany({ 
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching curated jobs:", error);
    return [];
  }
}

export async function getCuratedJobs() {
  try {
    return await prisma.curatedJob.findMany({ 
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 10 // Limit to 10 jobs
    });
  } catch (error) {
    console.error("Error fetching curated jobs:", error);
    return [];
  }
}

// ==========================================
// BLOG POSTS - RSS FEEDS
// ==========================================

// Fetch blogs from Wix RSS feed (Company Blog)
async function fetchWixBlogs() {
  try {
    const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://www.resilio-partners.com/blog-feed.xml";
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];
    
    return data.items.map((item: any) => {
      const imageMatch = item.enclosure?.link || 
        item.description?.match(/<img[^>]+src="([^"]+)"/)?.[1] ||
        "/assets/story-placeholder.jpg";
      
      const cleanDescription = item.description
        ? item.description.replace(/<[^>]+>/g, "").substring(0, 200) + "..."
        : "";
      
      return {
        id: `wix-${item.guid || item.link}`,
        slug: item.link,
        title: item.title,
        excerpt: cleanDescription,
        cover_image_url: imageMatch,
        published_at: item.pubDate,
        source: "Resilio Blog",
        external_link: item.link,
      };
    });
  } catch (error) {
    console.error("Error fetching Wix blogs:", error);
    return [];
  }
}

// Fetch blogs from Jon Irwin's Medium (Personal Blog)
async function fetchMediumBlogs() {
  try {
    const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jonathanirwin";
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];

    return data.items.map((item: any) => {
      const imageMatch = item.thumbnail || 
        item.description?.match(/<img[^>]+src="([^"]+)"/)?.[1] ||
        "/assets/story-placeholder.jpg";

      const cleanDescription = item.description
        ? item.description.replace(/<[^>]+>/g, "").substring(0, 200) + "..."
        : "";

      return {
        id: `medium-${item.guid}`,
        slug: item.link,
        title: item.title,
        excerpt: cleanDescription,
        cover_image_url: imageMatch,
        published_at: item.pubDate,
        source: "Jon's Medium",
        external_link: item.link,
      };
    });
  } catch (error) {
    console.error("Error fetching Medium blogs:", error);
    return [];
  }
}

// Fallback blog posts (custom blogs can be added here or via database)
const fallbackBlogPosts = [
  {
    id: "1",
    slug: "digital-transformation-strategic-guide",
    title: "Digital Transformation: A Strategic Guide for Modern Businesses",
    excerpt: "Discover how digital transformation can revolutionize your business operations, improve customer experience, and drive sustainable growth in today's competitive market.",
    cover_image_url: "/assets/story-placeholder.jpg",
    published_at: new Date("2024-01-15").toISOString(),
    source: "Resilio",
  },
  {
    id: "2",
    slug: "nextjs-15-whats-new",
    title: "Next.js 15: What's New and Why It Matters for Your Projects",
    excerpt: "Explore the latest features in Next.js 15, including server components, improved performance, and new routing capabilities that can accelerate your development workflow.",
    cover_image_url: "/assets/story-placeholder.jpg",
    published_at: new Date("2024-01-10").toISOString(),
    source: "Resilio",
  },
  {
    id: "3",
    slug: "marketing-strategies-2024",
    title: "Marketing Strategies That Actually Convert in 2024",
    excerpt: "Learn proven marketing strategies and tactics that deliver real results, from SEO optimization to social media campaigns that engage and convert your target audience.",
    cover_image_url: "/assets/story-placeholder.jpg",
    published_at: new Date("2024-01-05").toISOString(),
    source: "Resilio",
  },
];

export async function getBlogPosts() {
  try {
    const [wixPosts, mediumPosts] = await Promise.all([
      fetchWixBlogs(),
      fetchMediumBlogs(),
    ]);

    // Combine all posts
    let allPosts: any[] = [];
    
    if (wixPosts && wixPosts.length > 0) allPosts.push(...wixPosts);
    if (mediumPosts && mediumPosts.length > 0) allPosts.push(...mediumPosts);
    
    // Use fallback only if absolutely nothing else loaded
    if (allPosts.length === 0) {
      allPosts.push(...fallbackBlogPosts);
    }

    // Sort by published_at (newest first)
    allPosts.sort((a, b) => {
      const dateA = new Date(a.published_at || 0).getTime();
      const dateB = new Date(b.published_at || 0).getTime();
      return dateB - dateA;
    });

    return allPosts.slice(0, 6); // Limit to 6 posts for landing page
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return fallbackBlogPosts;
  }
}

export async function createCuratedJob(formData: FormData) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    await prisma.curatedJob.create({
      data: {
        jobTitle: formData.get('jobTitle') as string,
        companyName: formData.get('companyName') as string,
        description: formData.get('description') as string,
        salaryRange: formData.get('salaryRange') as string || null,
        applyUrl: formData.get('applyUrl') as string,
        isActive: formData.get('isActive') === 'true'
      }
    });
    
    revalidatePath('/admin/jobs');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to create job." };
  }
}

export async function updateCuratedJob(formData: FormData) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    const id = formData.get('id') as string;
    
    await prisma.curatedJob.update({
      where: { id },
      data: {
        jobTitle: formData.get('jobTitle') as string,
        companyName: formData.get('companyName') as string,
        description: formData.get('description') as string,
        salaryRange: formData.get('salaryRange') as string || null,
        applyUrl: formData.get('applyUrl') as string,
        isActive: formData.get('isActive') === 'true',
        updatedAt: new Date()
      }
    });
    
    revalidatePath('/admin/jobs');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to update job." };
  }
}

export async function deleteCuratedJob(id: string) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    await prisma.curatedJob.delete({ where: { id } });
    revalidatePath('/admin/jobs');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to delete job." };
  }
}

export async function toggleCuratedJobActive(formData: FormData) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    const id = formData.get('id') as string;
    const current = await prisma.curatedJob.findUnique({ where: { id } });
    
    if (!current) return { success: false, message: "Job not found." };
    
    await prisma.curatedJob.update({
      where: { id },
      data: { isActive: !current.isActive, updatedAt: new Date() }
    });
    
    revalidatePath('/admin/jobs');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to toggle job." };
  }
}

export async function getAllProjects() {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return [];

  try {
    return await prisma.clientProject.findMany({
      include: {
        client: true,
        members: true 
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

export async function approveProject(projectId: string) {
  const session = await auth();
  const user = session?.user as any;
  if (user?.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

  try {
    await prisma.clientProject.update({
      where: { id: projectId },
      data: { status: 'ACTIVE' }
    });
    revalidatePath('/admin');
    revalidatePath('/lab');
    revalidatePath('/guild');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal update status." };
  }
}

// ==========================================
// 4. PLATFORM: THE LAB (CLIENT)
// ==========================================

export async function getAvailableHeroes() {
  try {
    const heroes = await prisma.heroProfile.findMany({
      include: { user: true }
    });

    return heroes.map(hero => ({
      id: hero.userId, 
      name: hero.user.name || hero.nickname,
      role: "Specialist", 
      rate: 2500, 
      stats: {
        speed: hero.statSpeed,
        logic: hero.statLogic,
        aesthetic: hero.statAesthetic
      }
    }));
  } catch (error) {
    return [];
  }
}

export async function createProject(squadIds: string[], totalRate: number) {
  const session = await auth();
  const user = session?.user as any;
  const userId = user?.id;
  const userRole = user?.role;

  if (!userId) return { success: false, message: "Unauthorized" };
  if (userRole === 'CONSULTANT') return { success: false, message: "Konsultan tidak dapat membuat project." };
  if (squadIds.length === 0) return { success: false, message: "Squad kosong." };

  try {
    const project = await prisma.clientProject.create({
      data: {
        name: `Project Alpha #${Math.floor(Math.random() * 1000)}`,
        description: "Drafted team from The Lab",
        clientId: userId,
        totalRate: totalRate,
        status: "NEGOTIATION",
        members: {
          create: squadIds.map((heroId) => ({
            heroId: heroId
          }))
        }
      }
    });
    console.log(`✅ Project Created: ${project.id} by User ${userId}`);
    revalidatePath('/lab'); 
    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, message: "Gagal membuat project." };
  }
}

export async function getClientProjects() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  try {
    const projects = await prisma.clientProject.findMany({
      where: { clientId: userId },
      include: {
        members: {
          include: {
            hero: { include: { heroProfile: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  } catch (error) {
    return [];
  }
}

export async function getProjectDetails(projectId: string) {
  const session = await auth();
  // Casting user session
  const user = session?.user as any;
  const userId = user?.id;
  const userRole = user?.role;

  if (!userId) return null;

  try {
    const project = await prisma.clientProject.findUnique({
      where: { id: projectId },
      include: {
        client: true, // [BARU] Kita butuh data client untuk ditampilkan ke konsultan
        members: {
          include: {
            hero: { include: { heroProfile: true } }
          }
        }
      }
    });

    if (!project) return null;

    // Security Logic: Siapa yang boleh lihat?
    // 1. Admin
    const isAdmin = userRole === 'ADMIN';
    // 2. Pemilik Project (Client)
    const isOwner = project.clientId === userId;
    // 3. [BARU] Anggota Tim (Consultant yang terdaftar di project ini)
    const isMember = project.members.some(member => member.heroId === userId);

    // Jika bukan salah satu dari di atas, tolak akses
    if (!isOwner && !isAdmin && !isMember) {
      return null;
    }

    return project;
  } catch (error) {
    return null;
  }
}

// ==========================================
// 5. PLATFORM: THE GUILD (CONSULTANT)
// ==========================================

export async function getAssignedProjects() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return [];

  try {
    const projects = await prisma.clientProject.findMany({
      where: {
        members: { some: { heroId: userId } }
      },
      include: {
        client: true,
        members: { include: { hero: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });
    return projects;
  } catch (error) {
    return [];
  }
}

// ==========================================
// 6. GENERAL: USER SETTINGS (REAL)
// ==========================================

export async function updateProfile(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) return { success: false, message: "Unauthorized" };

  const name = formData.get("name") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Objek data yang akan diupdate (Defaultnya hanya nama)
  const updateData: any = { name };

  // Logika Ganti Password (Jika diisi)
  if (newPassword && newPassword.trim() !== "") {
    if (newPassword !== confirmPassword) {
      console.error("Password mismatch"); 
      return { success: false, message: "Password konfirmasi tidak cocok." };
    }
    
    if (newPassword.length < 6) {
        return { success: false, message: "Password minimal 6 karakter." };
    }

    // Hash password baru sebelum simpan ke DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateData.password = hashedPassword;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });
    
    revalidatePath('/settings');
    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Gagal update profil." };
  }
}