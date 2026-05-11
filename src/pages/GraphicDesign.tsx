import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Check, Palette, Image, Share2, Layout, Sparkles, Layers, PenTool } from "lucide-react";

import brandIdentityImg from "@/assets/portfolio/brand-identity.jpg";
import socialMediaImg from "@/assets/portfolio/social-media-designs.jpg";
import corporateImg from "@/assets/portfolio/corporate-website.jpg";
import digitalMarketingImg from "@/assets/portfolio/digital-marketing-dashboard.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: Sparkles,
    title: "Branding & Logo Design",
    description: "Create a memorable brand identity that sets you apart from competitors.",
    image: brandIdentityImg,
    features: [
      "Logo design and variations",
      "Brand style guidelines",
      "Color palette development",
      "Typography selection",
      "Brand collateral design",
    ],
    examples: ["Logos", "Business cards", "Letterheads", "Brand books"],
  },
  {
    icon: Layers,
    title: "Marketing Materials",
    description: "Print and digital marketing assets that drive engagement and sales.",
    image: digitalMarketingImg,
    features: [
      "Brochure and flyer design",
      "Banner and poster design",
      "Product packaging",
      "Presentation templates",
      "Trade show materials",
    ],
    examples: ["Brochures", "Flyers", "Banners", "Catalogs"],
  },
  {
    icon: Share2,
    title: "Social Media Creatives",
    description: "Scroll-stopping graphics that boost engagement on social platforms.",
    image: socialMediaImg,
    features: [
      "Post templates and graphics",
      "Story and reel designs",
      "Profile and cover images",
      "Ad creatives",
      "Infographics",
    ],
    examples: ["Instagram posts", "Facebook ads", "LinkedIn graphics", "Twitter headers"],
  },
  {
    icon: Layout,
    title: "UI/UX Design Assets",
    description: "User interface elements and design assets for apps and websites.",
    image: corporateImg,
    features: [
      "Icon design",
      "UI component design",
      "Wireframes and mockups",
      "App screen designs",
      "Web page layouts",
    ],
    examples: ["Icons", "UI kits", "Mockups", "Prototypes"],
  },
];

const portfolio = [
  "Logo Design",
  "Brand Identity",
  "Marketing Collateral",
  "Social Media Graphics",
  "Packaging Design",
  "UI/UX Design",
];

const graphicDesignSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "Graphic Design Services",
      "Professional graphic design in Kenya. Logo design, brand identity, social media graphics, marketing materials & UI/UX design. Make your brand unforgettable.",
      "Graphic Design"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Graphic Design", url: `${BASE_URL}/graphic-design` },
    ]),
  ],
};

const GraphicDesignPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Graphic Design Services Kenya | Logo & Brand Identity Design"
        description="Professional graphic design in Kenya. Logo design, brand identity, social media graphics, marketing materials & UI/UX design. Affordable rates. Get a free quote."
        keywords="graphic design Kenya, logo design Nairobi, brand identity design, social media graphics, marketing materials design, UI UX design Kenya, graphic designer near me"
        canonicalUrl={`${BASE_URL}/graphic-design`}
        structuredData={graphicDesignSchema}
      />
      <PageHero
        badge="Graphic Design"
        title="Design That Makes Your Brand Unforgettable"
        description="From stunning logos to engaging social media graphics, we create visual assets that capture attention, communicate your message, and drive action."
        ctaText="Request Design Service"
      />

      {/* Services */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Design Services"
            title="Creative Solutions for Every Need"
            description="Comprehensive graphic design services to elevate your brand at every touchpoint."
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
                  <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {service.examples.map((example, idx) => (
                      <span key={idx} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Our Process"
            title="How We Bring Your Vision to Life"
            description="A collaborative design process that ensures your satisfaction at every step."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: PenTool, title: "Brief", description: "We understand your requirements, goals, and brand personality." },
              { icon: Layers, title: "Concept", description: "We explore multiple creative directions and present options." },
              { icon: Palette, title: "Refine", description: "We polish the chosen direction based on your feedback." },
              { icon: Image, title: "Deliver", description: "You receive final files in all required formats." },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Our Work"
            title="Design Excellence Across Categories"
            description="We've helped businesses across industries with diverse design needs."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {portfolio.map((category, index) => (
              <div
                key={index}
                className="px-6 py-4 bg-card rounded-xl shadow-card border border-border/50 font-medium text-foreground"
              >
                {category}
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
            title="Design Packages"
            description="Quality design services at competitive Kenyan market rates."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Logo Package"
              price="KES 8,000"
              description="Professional logo for your brand"
              features={[
                "3 initial concepts",
                "2 revision rounds",
                "Final files (PNG, JPG, PDF)",
                "Vector source file",
                "Black & white versions",
                "Brand color codes",
              ]}
              ctaText="Order Logo"
            />
            <PricingCard
              name="Brand Identity"
              price="KES 25,000"
              description="Complete brand package"
              features={[
                "Logo design",
                "Business card design",
                "Letterhead design",
                "Social media kit",
                "Brand guidelines",
                "All source files",
                "Unlimited revisions",
              ]}
              ctaText="Build My Brand"
              popular
            />
            <PricingCard
              name="Monthly Retainer"
              price="KES 20,000"
              period="month"
              description="Ongoing design support"
              features={[
                "20 social media posts",
                "2 marketing materials",
                "Unlimited revisions",
                "Priority turnaround",
                "WhatsApp support",
                "Quick edits same day",
                "Brand consistency",
              ]}
              ctaText="Get Started"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Start Your Project"
              title="Ready to Elevate Your Brand?"
              description="Let's create stunning visuals that communicate your brand story and captivate your audience. Get in touch to discuss your project."
              light
            />
            <CTAButton text="Request Design Service" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GraphicDesignPage;
