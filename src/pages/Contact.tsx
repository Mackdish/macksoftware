import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import SEOHead, { localBusinessSchema, createBreadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_LINK = "https://wa.me/254705186502";
const BASE_URL = "https://build-a-lead.lovable.app";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    value: "+254 705 186 502",
    link: "tel:+254705186502",
  },
  {
    icon: Mail,
    title: "Email",
    value: "macknonvulimu@gmail.com",
    link: "mailto:macknonvulimu@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Nairobi, Kenya",
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Sat: 8AM - 6PM",
    link: null,
  },
];

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    localBusinessSchema,
    createBreadcrumbSchema([
      { name: "Home", url: BASE_URL },
      { name: "Contact", url: `${BASE_URL}/contact` },
    ]),
  ],
};

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct WhatsApp message
    const message = `Hello Mackdish Solutions!%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A%0A*Message:*%0A${formData.message}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/254705186502?text=${message}`, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Complete your message on WhatsApp to reach us directly.",
    });

    setIsSubmitting(false);
  };

  return (
    <PageLayout>
      <SEOHead
        title="Contact Us | Mackdish Solutions Kenya | Get Free Consultation"
        description="Get in touch with Mackdish Solutions in Nairobi, Kenya. Call +254 705 186 502, email us, or chat on WhatsApp. Free consultation for software, web design & marketing."
        keywords="contact Mackdish Solutions, software company Nairobi contact, web design company Kenya phone, technology partner Kenya, software development consultation"
        canonicalUrl={`${BASE_URL}/contact`}
        structuredData={contactSchema}
      />
      <PageHero
        badge="Contact Us"
        title="Let's Start a Conversation"
        description="Have a project in mind? Questions about our services? We'd love to hear from you. Reach out and let's discuss how we can help your business grow."
        ctaText="Chat on WhatsApp"
      />

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <SectionHeader
                badge="Send a Message"
                title="Get in Touch"
                description="Fill out the form below and we'll get back to you as soon as possible."
                centered={false}
              />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
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
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                <Button type="submit" variant="cta" size="xl" className="w-full" disabled={isSubmitting}>
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message via WhatsApp"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <SectionHeader
                badge="Contact Information"
                title="Reach Us Directly"
                description="Prefer to contact us directly? Here's how you can reach us."
                centered={false}
              />
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[hsl(142,70%,45%)] flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Chat on WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">Get instant responses</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  For the fastest response, chat with us directly on WhatsApp. We typically respond within minutes during business hours.
                </p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="w-5 h-5" />
                    Start WhatsApp Chat
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
