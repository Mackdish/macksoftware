import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import PricingCard from "@/components/PricingCard";
import SEOHead, { createServiceSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { GraduationCap, ClipboardList, Package, Home, Check } from "lucide-react";

// Import images
import schoolFinanceSystem from "@/assets/portfolio/school-finance-system.jpg";
import examManagement from "@/assets/portfolio/exam-management.jpg";
import inventorySystem from "@/assets/portfolio/inventory-system.jpg";
import rentalManagement from "@/assets/portfolio/rental-management.jpg";

const BASE_URL = "https://build-a-lead.lovable.app";

const products = [
  {
    icon: GraduationCap,
    title: "School Finance Management System",
    image: schoolFinanceSystem,
    problem: "Schools struggle with tracking fees, generating reports, and managing multiple payment channels, leading to revenue leakage and administrative burden.",
    features: [
      "Automated fee collection and tracking",
      "Multi-channel payment integration (M-Pesa, bank, cash)",
      "Real-time financial dashboards and reports",
      "Student payment history and balance tracking",
      "Automated reminder notifications for parents",
      "Customizable fee structures per class/term",
    ],
    benefits: [
      "Reduce fee collection time by 70%",
      "Eliminate manual errors in accounting",
      "Increase on-time payments with automated reminders",
      "Make data-driven financial decisions",
    ],
    idealFor: "Primary schools, secondary schools, colleges, and training institutions of all sizes.",
  },
  {
    icon: ClipboardList,
    title: "Exam Management System",
    image: examManagement,
    problem: "Manual exam creation, administration, and grading is time-consuming, error-prone, and makes it difficult to analyze student performance effectively.",
    features: [
      "Digital exam creation with question banks",
      "Online and offline exam administration",
      "Automated grading and result compilation",
      "Performance analytics and trend analysis",
      "Report card generation",
      "Parent portal for result access",
    ],
    benefits: [
      "Save 80% of time spent on exam management",
      "Eliminate grading errors completely",
      "Identify struggling students early with analytics",
      "Generate professional report cards instantly",
    ],
    idealFor: "Schools, universities, training centers, and any institution conducting regular assessments.",
  },
  {
    icon: Package,
    title: "Inventory Management System",
    image: inventorySystem,
    problem: "Businesses lose money through stockouts, overstocking, theft, and inability to track inventory across multiple locations or suppliers.",
    features: [
      "Real-time stock level monitoring",
      "Automated reorder alerts and purchase orders",
      "Multi-location inventory tracking",
      "Barcode/QR code scanning support",
      "Supplier management and ordering",
      "Detailed inventory reports and analytics",
    ],
    benefits: [
      "Reduce stockouts by 90%",
      "Lower holding costs with optimized inventory",
      "Prevent theft with accurate tracking",
      "Make informed purchasing decisions",
    ],
    idealFor: "Retail stores, warehouses, manufacturers, pharmacies, and any business managing physical inventory.",
  },
  {
    icon: Home,
    title: "Rental Management System",
    image: rentalManagement,
    problem: "Property owners struggle with tracking rent payments, managing maintenance requests, and keeping tenant records organized across multiple properties.",
    features: [
      "Tenant database and lease management",
      "Automated rent invoicing and collection",
      "Maintenance request tracking system",
      "Property expense tracking and reporting",
      "Vacancy management and advertising",
      "Financial reporting per property/portfolio",
    ],
    benefits: [
      "Collect rent on time with automated reminders",
      "Track all expenses for accurate ROI calculation",
      "Handle maintenance requests efficiently",
      "Manage unlimited properties from one dashboard",
    ],
    idealFor: "Landlords, property managers, real estate agencies, and housing cooperatives.",
  },
];

interface ProductProps {
  icon: React.ElementType;
  title: string;
  image: string;
  problem: string;
  features: string[];
  benefits: string[];
  idealFor: string;
}

const ProductSection = ({ product, index }: { product: ProductProps; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-center ${index > 0 ? 'mt-20 pt-20 border-t border-border/30' : ''}`}>
      <div className={`${isEven ? '' : 'lg:order-2'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <product.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-display font-bold text-2xl text-foreground">
            {product.title}
          </h3>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-destructive uppercase tracking-wider mb-2">The Problem</h4>
          <p className="text-muted-foreground">{product.problem}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Key Features</h4>
          <ul className="grid sm:grid-cols-2 gap-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-foreground text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Benefits</h4>
          <ul className="space-y-2">
            {product.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ideal For</h4>
          <p className="text-muted-foreground text-sm">{product.idealFor}</p>
        </div>
        
        <CTAButton text="Request Demo" variant="cta" size="lg" />
      </div>
      
      <div className={`${isEven ? '' : 'lg:order-1'}`}>
        <div className="rounded-2xl overflow-hidden shadow-card-hover border border-border/50">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    createServiceSchema(
      "Custom Software Development",
      "Purpose-built management systems for schools, inventory, rentals, and businesses in Kenya. Automate operations and drive growth.",
      "Software Development"
    ),
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Software Solutions", url: `${BASE_URL}/software` },
    ]),
  ],
};

const SoftwarePage = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Custom Software Development Kenya | School & Business Systems"
        description="Custom software solutions in Kenya: School Finance Management, Exam Systems, Inventory & Rental Management. Automate your operations with Mackdish Solutions."
        keywords="school finance management system Kenya, exam management software, inventory management system, rental management software, custom software development Nairobi, business automation Kenya"
        canonicalUrl={`${BASE_URL}/software`}
        structuredData={softwareSchema}
      />
      <PageHero
        badge="Software Solutions"
        title="Custom Software That Solves Real Problems"
        description="Purpose-built management systems designed to automate your operations, reduce costs, and drive growth. Each solution is tailored to your specific industry needs."
        ctaText="Request Demo"
      />

      {/* Products Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <SectionHeader
            badge="Our Products"
            title="Management Systems That Deliver Results"
            description="Each system is built with years of industry knowledge, designed to solve the exact problems businesses face daily."
          />
          {products.map((product, index) => (
            <ProductSection key={index} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container-wide">
          <SectionHeader
            badge="Pricing"
            title="Simple, Transparent Pricing"
            description="Affordable software solutions with flexible payment options to suit your business."
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="KES 4,000"
              period="month"
              description="Perfect for small businesses getting started"
              features={[
                "1 software system",
                "Up to 5 users",
                "Basic support",
                "Monthly updates",
                "Data backup",
                "Email support",
              ]}
              ctaText="Get Started"
            />
            <PricingCard
              name="Professional"
              price="KES 8,000"
              period="month"
              description="Best for growing businesses"
              features={[
                "1 software system",
                "Up to 20 users",
                "Priority support",
                "Weekly updates",
                "Advanced reporting",
                "WhatsApp support",
                "Custom branding",
              ]}
              ctaText="Get Started"
              popular
            />
            <PricingCard
              name="Enterprise"
              price="KES 15,000"
              period="month"
              description="For large organizations"
              features={[
                "Multiple systems",
                "Unlimited users",
                "24/7 dedicated support",
                "Real-time updates",
                "Advanced analytics",
                "API access",
                "Custom development",
                "On-site training",
              ]}
              ctaText="Contact Us"
            />
          </div>
        </div>
      </section>

      {/* Custom Development CTA */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              badge="Custom Development"
              title="Need a Custom Solution?"
              description="Don't see what you need? We build custom software tailored to your unique business requirements. Let's discuss your project."
              light
            />
            <CTAButton text="Discuss Custom Project" variant="cta" size="xl" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SoftwarePage;
