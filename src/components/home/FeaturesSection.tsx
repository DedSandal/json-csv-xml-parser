import React from 'react';
import { 
  FileJson, 
  Table, 
  FileCode, 
  Download, 
  Upload, 
  RefreshCw,
  Eye,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: FileJson,
    title: 'JSON парсинг',
    description: 'Автоматичне розпізнавання структури вкладених об\'єктів та масивів з визначенням типів даних.',
  },
  {
    icon: Table,
    title: 'CSV обробка',
    description: 'Розбір табличних даних з автоматичним визначенням заголовків та типів колонок.',
  },
  {
    icon: FileCode,
    title: 'XML підтримка',
    description: 'Повноцінний парсинг XML документів з атрибутами та ієрархічними елементами.',
  },
  {
    icon: RefreshCw,
    title: 'Конвертація форматів',
    description: 'Миттєве перетворення даних між JSON, CSV та табличним представленням.',
  },
  {
    icon: Upload,
    title: 'Завантаження файлів',
    description: 'Підтримка завантаження файлів .json, .csv, .xml та .txt з автовизначенням формату.',
  },
  {
    icon: Download,
    title: 'Експорт результату',
    description: 'Збереження оброблених даних у файл або копіювання в буфер обміну одним кліком.',
  },
  {
    icon: Eye,
    title: 'Превʼю таблицею',
    description: 'Візуалізація структурованих даних у зручному табличному вигляді.',
  },
  {
    icon: Zap,
    title: 'Локальна обробка',
    description: 'Повна приватність — дані обробляються у браузері без передачі на сервер.',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Можливості <span className="gradient-text">парсера</span>
          </h2>
          <p className="text-muted-foreground">
            Повний набір інструментів для роботи з даними у браузері
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};