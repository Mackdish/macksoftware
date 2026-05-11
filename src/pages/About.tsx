import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import SEOHead, { organizationSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Lightbulb, 
  Shield, 
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/254705186502";
const BASE_URL = "https://build-a-lead.lovable.app";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We prioritize understanding your needs and delivering solutions that exceed expectations.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practices in all our business dealings.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "We strive for excellence in every project, ensuring the highest quality standards in our deliverables.",
  },
];

const differentiators = [
  "Local expertise with global standards",
  "Tailored solutions for African businesses",
  "End-to-end digital transformation partner",
  "Affordable pricing without compromising quality",
  "24/7 dedicated support team",
  "Proven track record of successful projects",
];

const clientTypes = [
  "Small & Medium Enterprises (SMEs)",
  "Startups & Entrepreneurs",
  "Educational Institutions",
  "Healthcare Organizations",
  "E-commerce Businesses",
  "Government & NGOs",
  "Corporate Organizations",
  "Real Estate Companies",
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "About Us", url: `${BASE_URL}/about` },
    ]),
  ],
};

const About = () => {
  return (
    <PageLayout>
      <SEOHead
        title="About Mackdish Solutions | Software Company Kenya | Our Story"
        description="Mackdish Solutions is a leading technology company in Kenya. Founded by Macknon Vulimu. Custom software, web design & digital marketing. 50+ projects delivered."
        keywords="about Mackdish Solutions, technology company Kenya, software company Nairobi, Macknon Vulimu, digital transformation Kenya, IT company Kenya"
        canonicalUrl={`${BASE_URL}/about`}
        structuredData={aboutSchema}
      />
      <PageHero
        badge="About Us"
        title="Empowering Businesses Through Digital Innovation"
        description="Mackdish Solutions is a leading technology company in Kenya, dedicated to transforming businesses through innovative digital solutions."
        ctaText="Get Started"
      />

      {/* Company Overview */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Building Digital Success Stories Since Day One
              </h2>
              <p className="text-muted-foreground mb-4">
                Mackdish Solutions was founded with a simple yet powerful vision: to help businesses 
                across Africa harness the power of technology to grow, compete, and succeed in the 
                digital age.
              </p>
              <p className="text-muted-foreground mb-6">
                Led by Macknon Vulimu, our team of passionate technologists, designers, and strategists 
                work collaboratively to deliver solutions that make a real difference. We believe that 
                every business, regardless of size, deserves access to world-class digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="cta" size="lg">
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <p className="font-display font-bold text-3xl text-primary mb-2">50+</p>
                    <p className="text-muted-foreground text-sm">Projects Delivered</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <p className="font-display font-bold text-3xl text-primary mb-2">30+</p>
                    <p className="text-muted-foreground text-sm">Happy Clients</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <p className="font-display font-bold text-3xl text-primary mb-2">6+</p>
                    <p className="text-muted-foreground text-sm">Services Offered</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <p className="font-display font-bold text-3xl text-primary mb-2">24/7</p>
                    <p className="text-muted-foreground text-sm">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border/50">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower businesses with innovative, reliable, and affordable digital solutions 
                that drive growth, enhance efficiency, and create lasting value. We are committed 
                to being a trusted partner in our clients' digital transformation journey.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border/50">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading digital solutions provider in East Africa, recognized for our 
                innovation, quality, and commitment to helping businesses thrive in the digital 
                economy. We envision a future where every business can leverage technology to 
                achieve its full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Our Values"
            title="What We Stand For"
            description="Our core values guide everything we do and shape how we work with our clients."
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Why Choose Us"
                title="What Makes Mackdish Solutions Different"
                description="We combine local expertise with global best practices to deliver solutions that truly work for African businesses."
              />

              <div className="space-y-4 mt-8">
                {differentiators.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-4">
                Who We Serve
              </h3>
              <div className="space-y-3">
                {clientTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
              Ready to Transform Your Business?
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Get in touch with us today to discuss your project and discover how we can help 
              your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button variant="cta" size="xl">
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
