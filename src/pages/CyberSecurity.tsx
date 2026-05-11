import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Check, Shield, Eye, AlertTriangle, FileSearch, Headphones, Lock, Server, Globe } from "lucide-react";

import cybersecurityImg from "@/assets/portfolio/cybersecurity-dashboard.jpg";
import aiAutomationImg from "@/assets/portfolio/ai-automation-system.jpg";
import inventoryImg from "@/assets/portfolio/inventory-system.jpg";
import digitalMarketingImg from "@/assets/portfolio/digital-marketing-dashboard.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: Globe,
    title: "Website & System Protection",
    description: "Comprehensive protection for your websites and web applications against cyber threats.",
    image: cybersecurityImg,
    features: [
      "Web application firewall (WAF)",
      "DDoS protection",
      "SSL/TLS implementation",
      "Malware scanning and removal",
      "Security patch management",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    description: "Protect your sensitive business data from breaches, leaks, and unauthorized access.",
    image: inventoryImg,
    features: [
      "Data encryption solutions",
      "Access control implementation",
      "Backup and recovery systems",
      "Data loss prevention",
      "Secure file sharing",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Identify vulnerabilities in your systems before hackers do.",
    image: aiAutomationImg,
    features: [
      "Vulnerability assessments",
      "Penetration testing",
      "Security audits",
      "Compliance gap analysis",
      "Risk mitigation planning",
    ],
  },
  {
    icon: Eye,
    title: "Monitoring & Consulting",
    description: "Ongoing security monitoring and expert guidance to keep your business safe.",
    image: digitalMarketingImg,
    features: [
      "24/7 security monitoring",
      "Incident response",
      "Security awareness training",
      "Policy development",
      "Compliance consulting",
    ],
  },
];

const threats = [
  { title: "Ransomware Attacks", stat: "70%", description: "of small businesses that suffer a cyberattack close within a year" },
  { title: "Data Breaches", stat: "$4.35M", description: "average cost of a data breach globally" },
  { title: "Phishing", stat: "90%", description: "of cyberattacks start with phishing emails" },
];

const cyberSecuritySchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "Cybersecurity Services",
      "Comprehensive cybersecurity solutions for Kenyan businesses. Website protection, data security, vulnerability assessments & 24/7 monitoring.",
      "Cybersecurity"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Cyber Security", url: `${BASE_URL}/cyber-security` },
    ]),
  ],
};

const CyberSecurityPage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Cybersecurity Services Kenya | Business Security Solutions"
        description="Protect your business from cyber threats in Kenya. Website security, DDoS protection, data encryption, vulnerability assessments & 24/7 monitoring. Get secured today."
        keywords="cybersecurity Kenya, website security Nairobi, data protection Kenya, DDoS protection, penetration testing, security audit Kenya, cybersecurity services near me"
        canonicalUrl={`${BASE_URL}/cyber-security`}
        structuredData={cyberSecuritySchema}
      />
      <PageHero
        badge="Cyber Security"
        title="Protect Your Business from Cyber Threats"
        description="In today's digital world, cyber security isn't optional – it's essential. We provide comprehensive protection to keep your business safe from evolving threats."
        ctaText="Secure My Business"
      />

      {/* Threat Stats */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {threats.map((threat, index) => (
              <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                <div className="font-display font-bold text-3xl text-destructive mb-2">{threat.stat}</div>
                <h3 className="font-semibold text-foreground mb-1">{threat.title}</h3>
                <p className="text-muted-foreground text-sm">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Security Services"
            title="Comprehensive Cyber Security Solutions"
            description="Multi-layered security to protect every aspect of your digital business."
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

      {/* Why Security Matters */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Why It Matters"
                title="Business Continuity Starts with Security"
                description="A single security breach can devastate your business. Prevention is always cheaper than recovery."
                centered={false}
              />
              <div className="space-y-4">
                {[
                  "Protect customer data and maintain trust",
                  "Avoid costly downtime and revenue loss",
                  "Meet regulatory compliance requirements",
                  "Safeguard your reputation and brand",
                  "Prevent financial losses from fraud",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CTAButton text="Get Security Assessment" variant="cta" size="lg" />
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Our Security Approach</h3>
              <div className="space-y-6">
                {[
                  { step: "1", title: "Assess", description: "Comprehensive audit of your current security posture" },
                  { step: "2", title: "Plan", description: "Custom security roadmap based on your specific risks" },
                  { step: "3", title: "Implement", description: "Deploy security measures with minimal disruption" },
                  { step: "4", title: "Monitor", description: "Continuous monitoring and threat detection" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Pricing"
            title="Security Packages"
            description="Protect your business with our comprehensive security solutions."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Essential"
              price="KES 10,000"
              period="month"
              description="Basic protection for small businesses"
              features={[
                "Website security scan",
                "SSL certificate setup",
                "Basic firewall",
                "Weekly monitoring",
                "Monthly report",
                "Email support",
              ]}
              ctaText="Get Protected"
            />
            <PricingCard
              name="Business"
              price="KES 25,000"
              period="month"
              description="Comprehensive security for growing businesses"
              features={[
                "Full security audit",
                "Advanced firewall",
                "DDoS protection",
                "Daily monitoring",
                "Incident response",
                "Security training",
                "Priority support",
              ]}
              ctaText="Secure Business"
              popular
            />
            <PricingCard
              name="Enterprise"
              price="KES 50,000"
              period="month"
              description="Maximum protection for large organizations"
              features={[
                "Penetration testing",
                "24/7 monitoring",
                "Compliance consulting",
                "Data encryption",
                "Backup solutions",
                "Custom policies",
                "Dedicated team",
                "SLA guarantee",
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
              badge="Act Now"
              title="Don't Wait for a Breach"
              description="Every day without proper security is a risk. Let's assess your vulnerabilities and build a robust defense for your business."
              light
            />
            <CTAButton text="Secure My Business" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CyberSecurityPage;
