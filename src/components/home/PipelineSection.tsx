import React from 'react';
import { 
  Globe, 
  Filter, 
  Wand2, 
  Database, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const pipelineSteps = [
  {
    icon: Globe,
    title: 'Джерело',
    description: 'URL, API, файл або база даних',
    status: 'active',
  },
  {
    icon: Filter,
    title: 'Фільтрація',
    description: 'Вибір потрібних полів',
    status: 'active',
  },
  {
    icon: Wand2,
    title: 'Трансформація',
    description: 'AI-обробка та очищення',
    status: 'pending',
  },
  {
    icon: Database,
    title: 'Збереження',
    description: 'Експорт у будь-який формат',
    status: 'pending',
  },
];

export const PipelineSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" className="flow-line" />
      </svg>

      <div className="container relative px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Візуальний <span className="gradient-text">конвеєр даних</span>
          </h2>
          <p className="text-muted-foreground">
            Побудуйте складні потоки обробки простим перетягуванням блоків
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {pipelineSteps.map((step, index) => (
              <React.Fragment key={step.title}>
                {/* Step card */}
                <div 
                  className={`relative flex-1 glass-card p-6 text-center transition-all duration-300 hover:scale-105 ${
                    step.status === 'active' ? 'glow-border' : ''
                  }`}
                >
                  {/* Status indicator */}
                  <div className="absolute -top-2 -right-2">
                    {step.status === 'active' ? (
                      <div className="status-dot active" />
                    ) : (
                      <div className="status-dot pending" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                    step.status === 'active' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    <step.icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector arrow */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:flex items-center text-primary/50">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Features list */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Drag & drop конструктор',
              'Збереження шаблонів',
              'Історія виконань',
              'Паралельна обробка',
              'Автоматичний retry',
              'Сповіщення про помилки',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
