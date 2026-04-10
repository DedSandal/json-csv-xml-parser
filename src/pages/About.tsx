import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Target, 
  Users, 
  Zap, 
  Shield,
  Code,
  Heart
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Простота',
    description: 'Ми віримо, що потужні інструменти можуть бути простими у використанні. Наш інтерфейс інтуїтивний та зрозумілий.'
  },
  {
    icon: Shield,
    title: 'Приватність',
    description: 'Всі дані обробляються локально у вашому браузері. Ми не зберігаємо та не передаємо ваші дані на сервер.'
  },
  {
    icon: Zap,
    title: 'Швидкість',
    description: 'Миттєва обробка даних без затримок. Оптимізований код забезпечує максимальну продуктивність.'
  },
  {
    icon: Code,
    title: 'Відкритість',
    description: 'Ми прагнемо до прозорості в усьому. Документація завжди актуальна та доступна.'
  }
];

const team = [
  {
    name: 'Олександр Коваленко',
    role: 'Засновник та розробник',
    description: 'Full-stack розробник з досвідом понад 5 років. Спеціалізується на React та TypeScript.'
  },
  {
    name: 'Марія Шевченко',
    role: 'UX/UI дизайнер',
    description: 'Створює інтуїтивні та естетичні інтерфейси. Має досвід роботи з провідними tech-компаніями.'
  },
  {
    name: 'Іван Петренко',
    role: 'Технічний консультант',
    description: 'Експерт з обробки даних та алгоритмів. Допомагає оптимізувати продуктивність парсера.'
  }
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Про <span className="gradient-text">DataFlow Pro</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ми створюємо інструменти, які спрощують роботу з даними для розробників, 
              аналітиків та всіх, хто працює з інформацією.
            </p>
          </div>

          {/* Mission */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Наша місія</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Демократизувати доступ до інструментів обробки даних. Ми хочемо, щоб кожен — 
                від студента до досвідченого розробника — міг легко працювати з даними у різних 
                форматах без необхідності встановлювати складне програмне забезпечення чи 
                вивчати спеціалізовані мови програмування.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Наші <span className="gradient-text">цінності</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Наша <span className="gradient-text">команда</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.name} className="glass-card p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="max-w-4xl mx-auto">
            <div className="glass-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Формати даних</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Безкоштовно</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">0</div>
                  <div className="text-sm text-muted-foreground">Збору даних</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">∞</div>
                  <div className="text-sm text-muted-foreground">Можливостей</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
