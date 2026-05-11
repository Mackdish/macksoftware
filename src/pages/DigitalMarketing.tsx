import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Check, Share2, Search, Megaphone, Mail, Users, TrendingUp, BarChart3, Target } from "lucide-react";

import digitalMarketingImg from "@/assets/portfolio/digital-marketing-dashboard.jpg";
import socialMediaImg from "@/assets/portfolio/social-media-designs.jpg";
import corporateImg from "@/assets/portfolio/corporate-website.jpg";
import ecommerceImg from "@/assets/portfolio/ecommerce-website.jpg";
import brandIdentityImg from "@/assets/portfolio/brand-identity.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build your brand presence and engage with your audience across all major social platforms.",
    image: socialMediaImg,
    features: [
      "Content strategy and planning",
      "Daily posting and engagement",
      "Community management",
      "Paid social advertising",
      "Performance reporting",
    ],
  },
  {
    icon: Search,
    title: "SEO & Content Marketing",
    description: "Rank higher on Google and attract organic traffic with strategic content and optimization.",
    image: corporateImg,
    features: [
      "Keyword research and strategy",
      "On-page SEO optimization",
      "Content creation and blogging",
      "Link building campaigns",
      "Technical SEO audits",
    ],
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description: "Reach your target audience with precision through Google Ads and social media advertising.",
    image: digitalMarketingImg,
    features: [
      "Google Ads management",
      "Facebook & Instagram ads",
      "Retargeting campaigns",
      "Ad creative design",
      "ROI optimization",
    ],
  },
  {
    icon: Mail,
    title: "Email & WhatsApp Campaigns",
    description: "Nurture leads and retain customers with targeted messaging campaigns.",
    image: ecommerceImg,
    features: [
      "Email list building",
      "Automated email sequences",
      "WhatsApp broadcast campaigns",
      "Newsletter management",
      "A/B testing and optimization",
    ],
  },
  {
    icon: Users,
    title: "Lead Generation Funnels",
    description: "Convert website visitors into qualified leads with optimized sales funnels.",
    image: brandIdentityImg,
    features: [
      "Landing page creation",
      "Lead magnet development",
      "Conversion optimization",
      "CRM integration",
      "Lead nurturing automation",
    ],
  },
];

const stats = [
  { value: "300%", label: "Average ROI increase" },
  { value: "10x", label: "Lead generation boost" },
  { value: "50%", label: "Cost per acquisition reduction" },
  { value: "24/7", label: "Campaign monitoring" },
];

const digitalMarketingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "Digital Marketing Services",
      "Data-driven digital marketing in Kenya. Social media marketing, SEO, Google Ads, email marketing & lead generation. Increase visibility and sales.",
      "Digital Marketing"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Digital Marketing", url: `${BASE_URL}/digital-marketing` },
    ]),
  ],
};

const DigitalMarketingPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Digital Marketing Services Kenya | SEO & Social Media Agency"
        description="Results-driven digital marketing in Kenya. Social media marketing, SEO, Google Ads, email campaigns & lead generation. 300% average ROI. Get free strategy session."
        keywords="digital marketing Kenya, SEO services Nairobi, social media marketing Kenya, Google Ads management, email marketing, lead generation Kenya, digital marketing company near me"
        canonicalUrl={`${BASE_URL}/digital-marketing`}
        structuredData={digitalMarketingSchema}
      />
      <PageHero
        badge="Digital Marketing"
        title="Marketing That Delivers Measurable Results"
        description="Data-driven digital marketing strategies that increase your visibility, generate leads, and grow your revenue. Every campaign is optimized for maximum ROI."
        ctaText="Grow My Business"
      />

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display font-bold text-4xl lg:text-5xl gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Our Services"
            title="Full-Spectrum Digital Marketing"
            description="From awareness to conversion, we cover every stage of your customer's journey."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
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

      {/* Process */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Our Approach"
            title="Results-Focused Marketing Process"
            description="A systematic approach to ensure every marketing dollar delivers maximum returns."
          />
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Research", description: "We analyze your market, competitors, and target audience." },
              { step: "02", title: "Strategy", description: "We develop a customized marketing plan aligned with your goals." },
              { step: "03", title: "Execute", description: "We implement campaigns across the most effective channels." },
              { step: "04", title: "Optimize", description: "We continuously improve based on data and results." },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-display font-bold text-muted/50 mb-4">{item.step}</div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
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
            title="Marketing Packages"
            description="Flexible packages designed for Kenyan businesses at every stage."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="KES 15,000"
              period="month"
              description="Perfect for small businesses starting online"
              features={[
                "2 social platforms",
                "12 posts per month",
                "Basic content creation",
                "Monthly report",
                "Community management",
                "Email support",
              ]}
              ctaText="Get Started"
            />
            <PricingCard
              name="Growth"
              price="KES 35,000"
              period="month"
              description="For businesses ready to scale"
              features={[
                "4 social platforms",
                "20 posts per month",
                "Content creation + design",
                "Paid ads management",
                "Weekly reporting",
                "WhatsApp support",
                "Basic SEO",
              ]}
              ctaText="Scale My Business"
              popular
            />
            <PricingCard
              name="Premium"
              price="KES 75,000"
              period="month"
              description="Full-service marketing solution"
              features={[
                "All social platforms",
                "30+ posts per month",
                "Video content",
                "Google & Social Ads",
                "Advanced SEO",
                "Lead generation funnels",
                "Email marketing",
                "Dedicated manager",
              ]}
              ctaText="Dominate Market"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Start Growing"
              title="Ready to Dominate Your Market?"
              description="Let's create a marketing strategy that puts your business in front of the right audience. Book a free consultation today."
              light
            />
            <CTAButton text="Grow My Business" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DigitalMarketingPage;
