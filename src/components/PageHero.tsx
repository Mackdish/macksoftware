import CTAButton from "./CTAButton";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  ctaText?: string;
}

const PageHero = ({ badge, title, description, ctaText = "Book Free Consultation" }: PageHeroProps) => {
  return (
    <section className="gradient-hero py-20 lg:py-28">
      <div className="container-wide">
        <div className="max-w-3xl">
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
              {badge}
            </span>
          )}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6 animate-fade-in-up">
            {title}
          </h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {description}
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CTAButton text={ctaText} variant="cta" size="xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
