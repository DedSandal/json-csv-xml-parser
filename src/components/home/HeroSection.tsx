import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Новий парсер v3.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Парсинг даних{' '}
            <span className="gradient-text">нового покоління</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Завантажте JSON, CSV або XML — отримайте чисті структуровані дані.
            Конвертуйте між форматами та скачуйте результат миттєво.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" onClick={scrollToDemo}>
              Спробувати зараз
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button variant="glass" size="xl" className="w-full sm:w-auto gap-2" onClick={scrollToDemo}>
              Дивитися як працює
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">3</div>
              <div className="text-sm text-muted-foreground mt-1">Формати вводу</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Безкоштовно</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text">∞</div>
              <div className="text-sm text-muted-foreground mt-1">Без обмежень</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
