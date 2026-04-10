import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  FileJson, 
  Table, 
  FileCode, 
  Download, 
  Upload, 
  Code,
  Terminal,
  BookOpen,
  ChevronRight
} from 'lucide-react';

const sections = [
  {
    id: 'getting-started',
    title: 'Початок роботи',
    icon: BookOpen,
    content: [
      {
        title: 'Вступ',
        text: 'DataFlow Pro — це потужний інструмент для парсингу та конвертації даних прямо у вашому браузері. Підтримуються формати JSON, CSV та XML.'
      },
      {
        title: 'Швидкий старт',
        text: 'Відкрийте головну сторінку, вставте ваші дані у поле вводу або завантажте файл, оберіть формат та натисніть кнопку "Парсити".'
      }
    ]
  },
  {
    id: 'formats',
    title: 'Підтримувані формати',
    icon: FileJson,
    content: [
      {
        title: 'JSON',
        text: 'JavaScript Object Notation — легкий формат обміну даними. Підтримуються вкладені об\'єкти, масиви та всі примітивні типи даних.'
      },
      {
        title: 'CSV',
        text: 'Comma-Separated Values — табличний формат з роздільником-комою. Автоматичне визначення заголовків та типів даних.'
      },
      {
        title: 'XML',
        text: 'Extensible Markup Language — мова розмітки для структурованих даних. Підтримка атрибутів та вкладених елементів.'
      }
    ]
  },
  {
    id: 'upload',
    title: 'Завантаження файлів',
    icon: Upload,
    content: [
      {
        title: 'Підтримувані розширення',
        text: 'Ви можете завантажувати файли з розширеннями .json, .csv, .xml та .txt. Формат визначається автоматично за розширенням файлу.'
      },
      {
        title: 'Drag & Drop',
        text: 'Просто перетягніть файл у зону завантаження або натисніть кнопку "Завантажити файл" для вибору через діалог.'
      }
    ]
  },
  {
    id: 'export',
    title: 'Експорт результатів',
    icon: Download,
    content: [
      {
        title: 'Формати експорту',
        text: 'Результат парсингу можна експортувати у форматі JSON або CSV. Оберіть потрібний формат у вкладках результату.'
      },
      {
        title: 'Копіювання та завантаження',
        text: 'Використовуйте кнопку "Копіювати" для швидкого копіювання в буфер обміну або "Завантажити" для збереження файлу на комп\'ютер.'
      }
    ]
  },
  {
    id: 'api',
    title: 'API документація',
    icon: Code,
    content: [
      {
        title: 'REST API (планується)',
        text: 'У майбутніх версіях буде доступний REST API для інтеграції парсингу у ваші застосунки. Слідкуйте за оновленнями.'
      },
      {
        title: 'Локальне використання',
        text: 'Наразі вся обробка відбувається локально у вашому браузері. Дані не передаються на сервер, що гарантує повну приватність.'
      }
    ]
  }
];

const codeExample = `// Приклад JSON для парсингу
{
  "users": [
    {
      "id": 1,
      "name": "Олександр",
      "email": "oleksandr@example.com"
    },
    {
      "id": 2,
      "name": "Марія",
      "email": "maria@example.com"
    }
  ]
}`;

export const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Документація</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Повний посібник з використання DataFlow Pro
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-4 gap-8">
            {/* Sidebar navigation */}
            <nav className="lg:col-span-1">
              <div className="glass-card p-4 sticky top-24">
                <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                  Зміст
                </h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        <ChevronRight className="h-3 w-3" />
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Content */}
            <div className="lg:col-span-3 space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Code example */}
              <section id="example" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Приклад використання</h2>
                </div>
                
                <div className="glass-card p-6">
                  <p className="text-muted-foreground mb-4">
                    Ось приклад JSON даних, які можна використати для тестування парсера:
                  </p>
                  <pre className="code-block text-foreground overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
