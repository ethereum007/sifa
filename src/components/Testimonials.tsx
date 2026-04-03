import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SIF Prime made it incredibly easy to understand and invest in Specialized Investment Funds. The comparison tools are exceptional.",
    author: "Rajesh Kumar",
    role: "HNI Investor, Mumbai",
    rating: 5,
  },
  {
    quote: "Finally, a platform that bridges the gap between mutual funds and PMS. The transparency and ease of use is unmatched.",
    author: "Priya Sharma",
    role: "Financial Advisor",
    rating: 5,
  },
  {
    quote: "The detailed fund analysis and real-time NAV updates help me make informed investment decisions. Highly recommended!",
    author: "Arun Patel",
    role: "Portfolio Manager",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Investors
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from investors who've discovered the power of SIFs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:border-primary/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
