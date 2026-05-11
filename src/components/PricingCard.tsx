import { Check } from "lucide-react";
import CTAButton from "./CTAButton";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  ctaText,
  popular = false,
}: PricingCardProps) => {
  return (
    <div
      className={`relative bg-card rounded-2xl p-8 shadow-card border transition-all duration-300 hover-lift ${
        popular
          ? "border-primary ring-2 ring-primary/20"
          : "border-border/50"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="font-display font-bold text-xl text-foreground mb-2">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-display font-bold text-4xl text-foreground">
            {price}
          </span>
          {period && (
            <span className="text-muted-foreground text-sm">/{period}</span>
          )}
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <CTAButton
        text={ctaText}
        variant={popular ? "cta" : "default"}
        size="lg"
        className="w-full justify-center"
      />
    </div>
  );
};

export default PricingCard;
