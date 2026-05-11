import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Check, ShoppingCart, Building2, GraduationCap, Target, Smartphone, Search, Zap } from "lucide-react";

import ecommerceImg from "@/assets/portfolio/ecommerce-website.jpg";
import corporateImg from "@/assets/portfolio/corporate-website.jpg";
import schoolImg from "@/assets/portfolio/school-website.jpg";
import restaurantImg from "@/assets/portfolio/restaurant-website.jpg";
import healthcareImg from "@/assets/portfolio/healthcare-website.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    description: "Online stores that convert visitors into customers with seamless shopping experiences.",
    image: ecommerceImg,
    features: [
      "Product catalog management",
      "Secure payment integration",
      "Inventory tracking",
      "Mobile-optimized checkout",
      "Order management system",
    ],
  },
  {
    icon: Building2,
    title: "Business & Corporate Websites",
    description: "Professional websites that establish credibility and generate leads for your business.",
    image: corporateImg,
    features: [
      "Modern, professional design",
      "Lead capture forms",
      "Service/product showcases",
      "Contact and inquiry systems",
      "Blog/news integration",
    ],
  },
  {
    icon: GraduationCap,
    title: "School & Institution Websites",
    description: "Informative portals for educational institutions to connect with students and parents.",
    image: schoolImg,
    features: [
      "Admission information portals",
      "Event calendars",
      "Staff directories",
      "Parent communication tools",
      "Online fee payment links",
    ],
  },
  {
    icon: Target,
    title: "Conversion-Optimized Landing Pages",
    description: "High-converting pages designed to capture leads and drive specific actions.",
    image: restaurantImg,
    features: [
      "A/B testing ready",
      "Clear call-to-actions",
      "Fast loading speeds",
      "Lead capture optimization",
      "Analytics integration",
    ],
  },
];

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Every website is designed to work perfectly on all devices, from phones to desktops.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Built-in search engine optimization to help your website rank higher on Google.",
  },
  {
    icon: Zap,
    title: "Fast Loading",
    description: "Optimized performance ensures your website loads quickly, keeping visitors engaged.",
  },
];

const webDesignSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "Professional Web Design Services",
      "Beautiful, conversion-optimized websites for businesses in Kenya. E-commerce, corporate, school websites with SEO and mobile-first design.",
      "Web Design"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Web Design", url: `${BASE_URL}/web-design` },
    ]),
  ],
};

const WebDesignPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Web Design Kenya | Professional Website Development Kenya"
        description="Expert web design services in Kenya. E-commerce websites, corporate sites, school portals & landing pages. Mobile-first, SEO-optimized. Get a free quote today."
        keywords="web design Kenya, website development Nairobi, e-commerce website Kenya, corporate website design, responsive web design, SEO website Kenya, web design company near me"
        canonicalUrl={`${BASE_URL}/web-design`}
        structuredData={webDesignSchema}
      />
      <PageHero
        badge="Web Design"
        title="Websites That Convert Visitors Into Customers"
        description="We don't just build beautiful websites – we create digital experiences that drive business results. Mobile-first, SEO-optimized, and conversion-focused."
        ctaText="Get Website Quote"
      />

      {/* Services */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Website Types"
            title="Website Solutions for Every Business"
            description="Whether you're selling products online or showcasing your services, we have the perfect solution."
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

      {/* Key Features */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Built-In Features"
            title="Every Website Includes"
            description="Essential features that ensure your website performs at its best."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Pricing"
            title="Website Packages"
            description="Choose between one-time payment or affordable monthly rental options."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Website Rental"
              price="KES 2,500"
              period="month"
              description="Affordable monthly option with maintenance included"
              features={[
                "Professional website",
                "Mobile responsive",
                "Up to 5 pages",
                "Contact forms",
                "Monthly maintenance",
                "Hosting included",
                "Basic SEO",
              ]}
              ctaText="Start Renting"
            />
            <PricingCard
              name="Standard Website"
              price="KES 25,000"
              description="One-time payment - own your website"
              features={[
                "Custom design",
                "Mobile responsive",
                "Up to 10 pages",
                "Contact forms",
                "Social media integration",
                "SEO optimization",
                "1 year hosting",
                "1 month support",
              ]}
              ctaText="Get Started"
              popular
            />
            <PricingCard
              name="E-Commerce"
              price="KES 40,000"
              description="Full online store with payment integration"
              features={[
                "Custom store design",
                "Product catalog",
                "M-Pesa integration",
                "Order management",
                "Inventory tracking",
                "Customer accounts",
                "1 year hosting",
                "2 months support",
              ]}
              ctaText="Build My Store"
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
              title="Ready for a Website That Works?"
              description="Let's create a website that not only looks great but also drives real business results. Get a free quote today."
              light
            />
            <CTAButton text="Get Website Quote" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default WebDesignPage;
