import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import SEOHead, { createBreadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, CheckCircle2, Loader2, ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const BASE_URL = "https://build-a-lead.lovable.app";

const formValidationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  service_type: z.string().min(1, "Please select a service type"),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  project_description: z.string().trim().min(20, "Please provide at least 20 characters describing your project").max(2000, "Description must be less than 2000 characters"),
});

const serviceOptions = [
  { value: "web-design", label: "Web Design & Development" },
  { value: "software", label: "Custom Software Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "graphic-design", label: "Graphic Design & Branding" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "cybersecurity", label: "Cybersecurity Services" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "under-500", label: "Under KES 50,000" },
  { value: "500-2000", label: "KES 50,000 - 200,000" },
  { value: "2000-5000", label: "KES 200,000 - 500,000" },
  { value: "5000-10000", label: "KES 500,000 - 1,000,000" },
  { value: "over-10000", label: "Over KES 1,000,000" },
  { value: "discuss", label: "Let's Discuss" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-weeks", label: "1-2 Weeks" },
  { value: "1-month", label: "Within 1 Month" },
  { value: "1-3-months", label: "1-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "flexible", label: "Flexible" },
];

const QuoteRequestPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_type: "",
    budget_range: "",
    timeline: "",
    project_description: "",
  });

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user && profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || prev.name,
        email: user.email || prev.email,
        phone: profile.phone || prev.phone,
      }));
    }
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = formValidationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database with user_id if logged in
      const { error: dbError } = await supabase
        .from("quote_requests")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          company: formData.company.trim() || null,
          service_type: formData.service_type,
          budget_range: formData.budget_range || null,
          timeline: formData.timeline || null,
          project_description: formData.project_description.trim(),
          user_id: user?.id || null,
        });

      if (dbError) {
        throw new Error("Failed to save quote request");
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-quote-notification", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          company: formData.company.trim() || undefined,
          service_type: serviceOptions.find(s => s.value === formData.service_type)?.label || formData.service_type,
          budget_range: budgetOptions.find(b => b.value === formData.budget_range)?.label || formData.budget_range,
          timeline: timelineOptions.find(t => t.value === formData.timeline)?.label || formData.timeline,
          project_description: formData.project_description.trim(),
        },
      });

      if (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't throw - the quote was saved, email is secondary
      }

      setIsSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your project details and get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex items-center justify-center py-20">
          <div className="text-center max-w-lg mx-auto px-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Quote Request Received!
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Thank you for your interest in Mackdish Solutions. We've received your project details and will contact you within 24 hours.
            </p>
            <p className="text-muted-foreground mb-8">
              We'll review your requirements and provide a detailed estimate tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button variant="cta" size="lg">
                    View My Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="cta"
                  size="lg"
                  onClick={() => window.open("https://wa.me/254705186502", "_blank")}
                >
                  Chat on WhatsApp
                </Button>
              )}
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const quoteSchema = createBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Get a Quote", url: `${BASE_URL}/quote` },
  ]);

  return (
    <PageLayout>
      <SEOHead
        title="Get a Free Quote | Software & Web Design Pricing Kenya"
        description="Request a free project estimate for software development, web design, digital marketing or AI automation. No commitment. Fast response within 24 hours."
        keywords="free quote software development, web design pricing Kenya, software project estimate, digital marketing quote, custom software pricing"
        canonicalUrl={`${BASE_URL}/quote`}
        structuredData={quoteSchema}
      />
      <PageHero
        badge="Get a Quote"
        title="Request a Free Project Estimate"
        description="Tell us about your project and we'll provide a detailed quote tailored to your needs. No commitment required."
        ctaText="Chat on WhatsApp"
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              badge="Project Details"
              title="Tell Us About Your Project"
              description="The more details you provide, the more accurate our estimate will be."
              centered
            />

            <form onSubmit={handleSubmit} className="space-y-6 mt-12">
              {/* Personal Information */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm text-primary-foreground font-bold">1</span>
                  Your Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`h-12 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50">
                <h3 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm text-primary-foreground font-bold">2</span>
                  Project Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="service_type" className="block text-sm font-medium text-foreground mb-2">
                      Service Type <span className="text-destructive">*</span>
                    </label>
                    <Select value={formData.service_type} onValueChange={(value) => handleSelectChange("service_type", value)}>
                      <SelectTrigger className={`h-12 ${errors.service_type ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service_type && <p className="text-destructive text-sm mt-1">{errors.service_type}</p>}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget_range" className="block text-sm font-medium text-foreground mb-2">
                        Budget Range
                      </label>
                      <Select value={formData.budget_range} onValueChange={(value) => handleSelectChange("budget_range", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                        Expected Timeline
                      </label>
                      <Select value={formData.timeline} onValueChange={(value) => handleSelectChange("timeline", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="project_description" className="block text-sm font-medium text-foreground mb-2">
                      Project Description <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="project_description"
                      name="project_description"
                      placeholder="Describe your project in detail. What are your goals? What features do you need? Any specific requirements or preferences?"
                      value={formData.project_description}
                      onChange={handleChange}
                      rows={6}
                      className={errors.project_description ? "border-destructive" : ""}
                    />
                    {errors.project_description && <p className="text-destructive text-sm mt-1">{errors.project_description}</p>}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="cta" 
                size="xl" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Submit Quote Request
                  </>
                )}
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                By submitting this form, you agree to be contacted regarding your project inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default QuoteRequestPage;
