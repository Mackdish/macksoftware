import { LucideIcon, Check } from "lucide-react";
import CTAButton from "./CTAButton";

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  features: string[];
  benefits: string[];
  idealFor: string;
  ctaText?: string;
}

const ProductCard = ({
  icon: Icon,
  title,
  problem,
  features,
  benefits,
  idealFor,
  ctaText = "Request Demo",
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="p-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="font-display font-bold text-2xl text-foreground mb-4">{title}</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Problem</h4>
          <p className="text-foreground">{problem}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Features</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Business Benefits</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 p-4 bg-muted rounded-xl">
          <h4 className="text-sm font-semibold text-foreground mb-1">Ideal For</h4>
          <p className="text-muted-foreground text-sm">{idealFor}</p>
        </div>

        <CTAButton text={ctaText} variant="cta" size="lg" className="w-full" />
      </div>
    </div>
  );
};

export default ProductCard;
