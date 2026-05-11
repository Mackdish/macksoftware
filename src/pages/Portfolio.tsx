import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import SEOHead, { createBreadcrumbSchema } from "@/components/SEOHead";
import { ExternalLink } from "lucide-react";

// Import portfolio images
import schoolFinanceSystem from "@/assets/portfolio/school-finance-system.jpg";
import examManagement from "@/assets/portfolio/exam-management.jpg";
import inventorySystem from "@/assets/portfolio/inventory-system.jpg";
import rentalManagement from "@/assets/portfolio/rental-management.jpg";
import ecommerceWebsite from "@/assets/portfolio/ecommerce-website.jpg";
import corporateWebsite from "@/assets/portfolio/corporate-website.jpg";
import schoolWebsite from "@/assets/portfolio/school-website.jpg";
import restaurantWebsite from "@/assets/portfolio/restaurant-website.jpg";
import healthcareWebsite from "@/assets/portfolio/healthcare-website.jpg";
import digitalMarketingDashboard from "@/assets/portfolio/digital-marketing-dashboard.jpg";
import aiAutomationSystem from "@/assets/portfolio/ai-automation-system.jpg";
import cybersecurityDashboard from "@/assets/portfolio/cybersecurity-dashboard.jpg";
import brandIdentity from "@/assets/portfolio/brand-identity.jpg";
import socialMediaDesigns from "@/assets/portfolio/social-media-designs.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const softwareProjects = [
  {
    title: "School Finance Management System",
    category: "Software Solution",
    description: "Comprehensive fee collection and financial tracking system for educational institutions with M-Pesa integration.",
    image: schoolFinanceSystem,
    tags: ["React", "Node.js", "PostgreSQL", "M-Pesa API"],
  },
  {
    title: "Exam Management System",
    category: "Software Solution",
    description: "End-to-end exam creation, administration, and automated grading system with detailed analytics.",
    image: examManagement,
    tags: ["React", "Python", "Machine Learning", "Analytics"],
  },
  {
    title: "Inventory Management System",
    category: "Software Solution",
    description: "Real-time stock tracking with barcode scanning, automated reordering, and multi-location support.",
    image: inventorySystem,
    tags: ["React", "Node.js", "MongoDB", "Barcode API"],
  },
  {
    title: "Rental Property Management",
    category: "Software Solution",
    description: "Complete property management solution with tenant tracking, rent collection, and maintenance management.",
    image: rentalManagement,
    tags: ["React", "PostgreSQL", "Payment Gateway", "SMS API"],
  },
];

const websiteProjects = [
  {
    title: "E-Commerce Fashion Store",
    category: "E-Commerce Website",
    description: "Modern online fashion store with product catalog, cart functionality, and secure checkout.",
    image: ecommerceWebsite,
    tags: ["React", "Shopify", "Payment Integration", "SEO"],
  },
  {
    title: "Corporate Business Website",
    category: "Business Website",
    description: "Professional corporate website with service showcases, team profiles, and lead generation forms.",
    image: corporateWebsite,
    tags: ["React", "CMS", "Lead Forms", "Analytics"],
  },
  {
    title: "Educational Institution Portal",
    category: "School Website",
    description: "Comprehensive school website with student portal, course information, and online enrollment.",
    image: schoolWebsite,
    tags: ["React", "Student Portal", "Event Calendar", "Enrollment"],
  },
  {
    title: "Restaurant & Online Ordering",
    category: "Restaurant Website",
    description: "Restaurant website with menu display, online ordering system, and delivery tracking.",
    image: restaurantWebsite,
    tags: ["React", "Online Ordering", "Menu CMS", "Delivery"],
  },
  {
    title: "Healthcare Clinic Portal",
    category: "Healthcare Website",
    description: "Medical clinic website with appointment booking, doctor profiles, and patient information.",
    image: healthcareWebsite,
    tags: ["React", "Booking System", "HIPAA", "Patient Portal"],
  },
];

const otherProjects = [
  {
    title: "Digital Marketing Dashboard",
    category: "Marketing Platform",
    description: "Custom marketing analytics dashboard tracking social media, SEO, and campaign performance.",
    image: digitalMarketingDashboard,
    tags: ["Analytics", "Social Media API", "SEO Tools", "Reporting"],
  },
  {
    title: "AI Automation Platform",
    category: "AI Solution",
    description: "Business process automation platform with AI chatbots and workflow automation.",
    image: aiAutomationSystem,
    tags: ["AI/ML", "Chatbot", "Workflow", "Automation"],
  },
  {
    title: "Cybersecurity Monitoring",
    category: "Security Solution",
    description: "Real-time security monitoring dashboard with threat detection and vulnerability scanning.",
    image: cybersecurityDashboard,
    tags: ["Security", "Monitoring", "Threat Detection", "Compliance"],
  },
  {
    title: "Brand Identity Design",
    category: "Graphic Design",
    description: "Complete brand identity package including logo, business cards, and brand guidelines.",
    image: brandIdentity,
    tags: ["Logo Design", "Brand Guide", "Stationery", "Visual Identity"],
  },
  {
    title: "Social Media Campaign",
    category: "Digital Marketing",
    description: "Comprehensive social media graphics and marketing campaign materials for brand awareness.",
    image: socialMediaDesigns,
    tags: ["Social Media", "Graphics", "Campaign", "Advertising"],
  },
];

interface PortfolioItemProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const PortfolioCard = ({ title, category, description, image, tags }: PortfolioItemProps) => (
  <div className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 hover-lift">
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <span className="flex items-center gap-2 text-foreground font-medium">
          <ExternalLink className="w-4 h-4" />
          View Details
        </span>
      </div>
    </div>
    <div className="p-6">
      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
        {category}
      </span>
      <h3 className="font-display font-bold text-lg text-foreground mt-2 mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const portfolioSchema = createBreadcrumbSchema([
  { name: "Home", url: BASE_URL },
  { name: "Portfolio", url: `${BASE_URL}/portfolio` },
]);

const PortfolioPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Portfolio | Software & Web Design Projects Kenya | Mackdish"
        description="Explore our successful projects: custom software, websites, marketing campaigns & design work in Kenya. See real results from Mackdish Solutions clients."
        keywords="software development portfolio Kenya, web design projects Nairobi, custom software examples, website portfolio, digital marketing case studies"
        canonicalUrl={`${BASE_URL}/portfolio`}
        structuredData={portfolioSchema}
      />
      <PageHero
        badge="Our Portfolio"
        title="Websites & Software We've Built"
        description="Explore our collection of successful projects. From custom software solutions to stunning websites, see how we've helped businesses transform digitally."
        ctaText="Start Your Project"
      />

      {/* Software Solutions */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Software Solutions"
            title="Custom Software Projects"
            description="Purpose-built management systems that solve real business problems and drive efficiency."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {softwareProjects.map((project, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PortfolioCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Websites */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Web Design"
            title="Websites That Convert"
            description="Responsive, conversion-optimized websites designed to grow your business online."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteProjects.map((project, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PortfolioCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="More Projects"
            title="Marketing, Automation & Design"
            description="Complete digital solutions including marketing platforms, AI automation, and creative design work."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PortfolioCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Your Project Next"
              title="Ready to Build Something Amazing?"
              description="Let's bring your vision to life. Whether it's a custom software solution or a stunning website, we're here to help you succeed."
              light
            />
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton text="Start Your Project" variant="cta" size="xl" />
              <CTAButton text="View Our Services" variant="hero-outline" size="xl" iconType="arrow" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PortfolioPage;
