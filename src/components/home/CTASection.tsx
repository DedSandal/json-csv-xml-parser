import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="container relative px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary">Безкоштовно та без реєстрації</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Готові <span className="gradient-text">парсити дані</span>?
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10">
            Просто вставте ваші дані або завантажте файл — 
            отримайте результат миттєво
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" onClick={scrollToDemo}>
              Спробувати зараз
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Без реєстрації
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Працює локально
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Ваші дані в безпеці
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
