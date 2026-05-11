import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  budget_range?: string;
  timeline?: string;
  project_description: string;
}

// HTML escape function to prevent XSS attacks
function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteRequest = await req.json();
    
    // Sanitize all user inputs
    const safeName = escapeHtml(quoteData.name);
    const safeEmail = escapeHtml(quoteData.email);
    const safePhone = escapeHtml(quoteData.phone);
    const safeCompany = escapeHtml(quoteData.company);
    const safeServiceType = escapeHtml(quoteData.service_type);
    const safeBudgetRange = escapeHtml(quoteData.budget_range);
    const safeTimeline = escapeHtml(quoteData.timeline);
    const safeProjectDescription = escapeHtml(quoteData.project_description);

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Mackdish Solutions</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1e293b; margin-top: 0; font-size: 18px;">Client Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;"><a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></td>
            </tr>
            ${safePhone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;"><a href="tel:${safePhone}" style="color: #2563eb;">${safePhone}</a></td>
            </tr>
            ` : ''}
            ${safeCompany ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeCompany}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2 style="color: #1e293b; margin-top: 24px; font-size: 18px;">Project Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Service Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${safeServiceType}</td>
            </tr>
            ${safeBudgetRange ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Budget Range</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeBudgetRange}</td>
            </tr>
            ` : ''}
            ${safeTimeline ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Timeline</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${safeTimeline}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2 style="color: #1e293b; margin-top: 24px; font-size: 18px;">Project Description</h2>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="color: #475569; margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeProjectDescription}</p>
          </div>
          
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <a href="https://wa.me/254705186502?text=Hi%20${encodeURIComponent(safeName)}%2C%20thank%20you%20for%20your%20quote%20request." 
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
              Reply via WhatsApp
            </a>
            <a href="mailto:${safeEmail}" 
               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-left: 10px;">
              Reply via Email
            </a>
          </div>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
          This email was automatically generated from your website quote request form.
        </p>
      </div>
    `;

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mackdish Solutions <onboarding@resend.dev>",
        to: ["macknonvulimu@gmail.com"],
        subject: `New Quote Request from ${quoteData.name}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
