import PageLayout from "@/components/PageLayout";
import CTAButton from "@/components/CTAButton";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import SEOHead, { organizationSchema, localBusinessSchema } from "@/components/SEOHead";
import ChatBot from "@/components/ChatBot";
import {
  Code2,
  Globe,
  TrendingUp,
  Bot,
  Shield,
  Palette,
  CheckCircle,
  Users,
  Zap,
  Award,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/254705186502";

const BASE_URL = "https://build-a-lead.lovable.app";

const services = [
  {
    icon: Code2,
    title: "Software Solutions",
    description: "Custom management systems for schools, inventory, rentals, and more.",
    link: "/software",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Stunning, conversion-optimized websites that drive business growth.",
    link: "/web-design",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven strategies to increase your online visibility and sales.",
    link: "/digital-marketing",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamline operations with intelligent automation and chatbots.",
    link: "/ai-automation",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    description: "Protect your business with comprehensive security solutions.",
    link: "/cyber-security",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching branding and marketing materials that stand out.",
    link: "/graphic-design",
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We deliver projects on time without compromising quality.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals with years of industry experience.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We ensure top-notch quality in every project we undertake.",
  },
  {
    icon: CheckCircle,
    title: "24/7 Support",
    description: "Round-the-clock support to address your concerns anytime.",
  },
];

const testimonials = [
  {
    quote: "Mackdish Solutions transformed our school's finance management. Highly recommended!",
    author: "John K.",
    role: "School Administrator",
  },
  {
    quote: "Our online sales increased by 300% after their digital marketing campaign.",
    author: "Mary W.",
    role: "E-commerce Owner",
  },
  {
    quote: "Professional team, excellent results. They delivered beyond our expectations.",
    author: "David O.",
    role: "Business Owner",
  },
];

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, localBusinessSchema],
};

const Index = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Mackdish Solutions | Software Development Company in Kenya"
        description="Transform your business with custom software solutions, web design, digital marketing, AI automation & cybersecurity services. Leading technology partner in Nairobi, Kenya. Get free consultation."
        keywords="software development company Kenya, web design Nairobi, digital marketing services Kenya, AI automation, cybersecurity Kenya, school management system, inventory software, custom software development"
        canonicalUrl={`${BASE_URL}/`}
        structuredData={combinedSchema}
      />
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container-wide relative py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
                Your Technology Partner
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6 animate-fade-in-up leading-tight">
                Transform Your Business with{" "}
                <span className="text-brand-teal">Smart Technology</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                From custom software to digital marketing, we provide end-to-end technology solutions that drive growth and efficiency for your business.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CTAButton text="Book Free Consultation" variant="cta" size="xl" />
                <CTAButton text="Talk to an Expert" variant="hero-outline" size="xl" iconType="arrow" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 rounded-3xl gradient-accent opacity-20 blur-3xl absolute -top-10 -right-10"></div>
                <div className="relative bg-card/10 backdrop-blur-xl rounded-3xl p-8 border border-primary-foreground/10">
                  <div className="grid grid-cols-2 gap-4">
                    {services.slice(0, 4).map((service, index) => (
                      <div
                        key={index}
                        className="bg-primary-foreground/5 rounded-xl p-4 backdrop-blur-sm"
                      >
                        <service.icon className="w-8 h-8 text-brand-teal mb-2" />
                        <p className="text-primary-foreground text-sm font-medium">{service.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Our Services"
            title="Comprehensive Technology Solutions"
            description="Everything you need to digitize, automate, and grow your business under one roof."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Solutions Preview */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Featured"
                title="Custom Software Solutions"
                description="Purpose-built management systems designed to solve your specific business challenges."
                centered={false}
              />
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">School Finance Management</h4>
                    <p className="text-muted-foreground text-sm">Track fees, payments, and financial reports effortlessly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Exam Management System</h4>
                    <p className="text-muted-foreground text-sm">Create, administer, and grade exams seamlessly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Inventory Management</h4>
                    <p className="text-muted-foreground text-sm">Real-time stock tracking and automated alerts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Rental Management System</h4>
                    <p className="text-muted-foreground text-sm">Manage properties, tenants, and payments efficiently.</p>
                  </div>
                </div>
              </div>
              <CTAButton text="Request Demo" variant="cta" size="lg" />
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl shadow-card-hover p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-muted rounded-lg w-3/4"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-primary/10 rounded-lg"></div>
                    <div className="h-20 bg-accent/10 rounded-lg"></div>
                    <div className="h-20 bg-muted rounded-lg"></div>
                  </div>
                  <div className="h-32 bg-muted rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 bg-primary/20 rounded-lg"></div>
                    <div className="h-12 bg-accent/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Why Mackdish"
            title="Why Businesses Trust Us"
            description="We combine technical expertise with a deep understanding of business needs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center hover-lift"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <SectionHeader
            badge="Testimonials"
            title="What Our Clients Say"
            description="Join hundreds of satisfied businesses who have transformed with our solutions."
            light
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-primary-foreground/5 backdrop-blur-xl rounded-2xl p-6 border border-primary-foreground/10"
              >
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-primary-foreground font-semibold">{testimonial.author}</p>
                  <p className="text-primary-foreground/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <div className="bg-card rounded-3xl p-8 lg:p-16 shadow-card-hover border border-border/50 text-center">
            <SectionHeader
              badge="Get Started"
              title="Ready to Transform Your Business?"
              description="Let's discuss how our technology solutions can help you achieve your goals. Book a free consultation today."
            />
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton text="Book Free Consultation" variant="cta" size="xl" />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 h-14 px-10 rounded-xl text-lg font-bold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Chatbot */}
      <ChatBot />
    </PageLayout>
  );
};

export default Index;
