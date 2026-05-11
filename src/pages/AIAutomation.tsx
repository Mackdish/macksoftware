import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Check, Workflow, MessageSquareText, Cog, BarChart3, Clock, DollarSign, TrendingUp } from "lucide-react";

import aiAutomationImg from "@/assets/portfolio/ai-automation-system.jpg";
import digitalMarketingImg from "@/assets/portfolio/digital-marketing-dashboard.jpg";
import inventoryImg from "@/assets/portfolio/inventory-system.jpg";
import cybersecurityImg from "@/assets/portfolio/cybersecurity-dashboard.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: Workflow,
    title: "AI Automation Services in Kenya | Intelligent Business Solutions | Mackdish Solutions",
    description: "Custom AI automation solutions in Kenya including chatbots, predictive analytics, and workflow automation to increase engagement and efficiency.",
    image: aiAutomationImg,
    features: [
      "Workflow design and implementation",
      "Task automation and scheduling",
      "System integrations",
      "Document automation",
      "Approval process automation",
    ],
  },
  {
    icon: MessageSquareText,
    title: "AI Chatbots",
    description: "24/7 customer support and lead generation with intelligent conversational AI.",
    image: digitalMarketingImg,
    features: [
      "Website chatbot integration",
      "WhatsApp business automation",
      "Lead qualification bots",
      "FAQ automation",
      "Appointment scheduling bots",
    ],
  },
  {
    icon: Cog,
    title: "Workflow Automation",
    description: "Connect your apps and automate data flow between different systems.",
    image: inventoryImg,
    features: [
      "App integrations (Zapier, Make)",
      "Data synchronization",
      "Automated reporting",
      "Email automation",
      "CRM automation",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description: "Turn your data into actionable insights with AI-powered analytics.",
    image: cybersecurityImg,
    features: [
      "Business intelligence dashboards",
      "Predictive analytics",
      "Automated reporting",
      "Data visualization",
      "Performance monitoring",
    ],
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    value: "40+ hours/month",
    description: "Automate repetitive tasks and focus on strategic work.",
  },
  {
    icon: DollarSign,
    title: "Reduce Costs",
    value: "60% savings",
    description: "Lower operational costs through intelligent automation.",
  },
  {
    icon: TrendingUp,
    title: "Scale Faster",
    value: "3x growth",
    description: "Handle more work without proportionally increasing staff.",
  },
];

const aiAutomationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "AI Automation Services",
      "Business process automation and AI chatbots for Kenyan businesses. Reduce costs, save time, and scale operations with intelligent automation.",
      "AI Automation"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "AI Automation", url: `${BASE_URL}/ai-automation` },
    ]),
  ],
};

const AIAutomationPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="AI Automation Services Kenya | Business Process Automation"
        description="Automate your business with AI in Kenya. Chatbots, workflow automation, data analytics & CRM integration. Save 40+ hours monthly. Free consultation available."
        keywords="AI automation Kenya, business process automation Nairobi, AI chatbots Kenya, workflow automation, CRM automation, business automation services"
        canonicalUrl={`${BASE_URL}/ai-automation`}
        structuredData={aiAutomationSchema}
      />
      <PageHero
        badge="AI Automation"
        title="Work Smarter with Intelligent Automation"
        description="Harness the power of AI to automate your business processes, reduce costs, and scale operations without increasing overhead. The future of business is automated."
        ctaText="Automate My Operations"
      />

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <div className="font-display font-bold text-3xl text-foreground mb-1">{benefit.value}</div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Automation Solutions"
            title="AI-Powered Automation Services"
            description="From simple task automation to complex AI implementations, we have solutions for every need."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover-lift"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Use Cases"
            title="Automation in Action"
            description="Real examples of how businesses are using AI automation to transform their operations."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Customer Support",
                description: "AI chatbots handling 80% of common inquiries, reducing response time from hours to seconds.",
              },
              {
                title: "Sales Process",
                description: "Automated lead scoring and follow-ups that increase conversion rates by 40%.",
              },
              {
                title: "Data Entry",
                description: "Automated data extraction and entry eliminating manual work and human errors.",
              },
              {
                title: "Invoice Processing",
                description: "AI-powered invoice processing reducing processing time by 90%.",
              },
              {
                title: "Report Generation",
                description: "Automated reports delivered to stakeholders on schedule without manual intervention.",
              },
              {
                title: "Appointment Scheduling",
                description: "AI assistants managing calendars and booking appointments 24/7.",
              },
            ].map((useCase, index) => (
              <div key={index} className="bg-muted rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Pricing"
            title="Automation Packages"
            description="Invest in automation and start saving time and money immediately."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Basic Automation"
              price="KES 25,000"
              description="One-time setup for essential automation"
              features={[
                "1 workflow automation",
                "Up to 3 app integrations",
                "Basic chatbot setup",
                "Setup & configuration",
                "Documentation",
                "1 month support",
              ]}
              ctaText="Get Started"
            />
            <PricingCard
              name="Business"
              price="KES 50,000"
              description="Comprehensive automation solution"
              features={[
                "3 workflow automations",
                "Up to 10 app integrations",
                "Advanced AI chatbot",
                "Custom automations",
                "Dashboard setup",
                "Training session",
                "3 months support",
              ]}
              ctaText="Automate Now"
              popular
            />
            <PricingCard
              name="Enterprise"
              price="KES 100,000+"
              description="Full business transformation"
              features={[
                "Unlimited automations",
                "Full system integration",
                "Custom AI solutions",
                "Data analytics setup",
                "Process optimization",
                "Team training",
                "Ongoing maintenance",
                "Dedicated support",
              ]}
              ctaText="Contact Us"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Get Started"
              title="Ready to Automate Your Business?"
              description="Let's identify the best automation opportunities in your business. Book a free consultation to discover how AI can transform your operations."
              light
            />
            <CTAButton text="Automate My Operations" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AIAutomationPage;
