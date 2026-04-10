import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const faqItems = [
  {
    question: 'Що таке DataFlow Pro?',
    answer: 'DataFlow Pro — це безкоштовний онлайн-інструмент для парсингу та конвертації даних. Він дозволяє працювати з JSON, CSV та XML форматами прямо у вашому браузері без необхідності встановлювати додаткове програмне забезпечення.'
  },
  {
    question: 'Чи безпечно використовувати DataFlow Pro?',
    answer: 'Так, абсолютно безпечно. Вся обробка даних відбувається локально у вашому браузері. Ваші дані не передаються на наші сервери та не зберігаються ніде. Це гарантує повну конфіденційність вашої інформації.'
  },
  {
    question: 'Які формати файлів підтримуються?',
    answer: 'Наразі DataFlow Pro підтримує три основні формати: JSON (JavaScript Object Notation), CSV (Comma-Separated Values) та XML (Extensible Markup Language). Ви можете конвертувати дані між цими форматами.'
  },
  {
    question: 'Чи є обмеження на розмір файлу?',
    answer: 'Технічно обмежень немає, але оскільки обробка відбувається у браузері, дуже великі файли (понад 50 МБ) можуть сповільнювати роботу залежно від потужності вашого комп\'ютера.'
  },
  {
    question: 'Як експортувати результат?',
    answer: 'Після парсингу ви можете експортувати результат двома способами: 1) Натиснути кнопку "Копіювати" для копіювання в буфер обміну, або 2) Натиснути "Завантажити" для збереження файлу на ваш комп\'ютер у форматі JSON або CSV.'
  },
  {
    question: 'Чи можна використовувати DataFlow Pro офлайн?',
    answer: 'Наразі DataFlow Pro працює лише онлайн. Проте, оскільки обробка відбувається локально, після завантаження сторінки ви можете працювати навіть при нестабільному з\'єднанні.'
  },
  {
    question: 'Чи є API для інтеграції?',
    answer: 'API знаходиться у розробці. У майбутніх версіях ми плануємо надати REST API для інтеграції парсингу у ваші застосунки. Слідкуйте за оновленнями в розділі документації.'
  },
  {
    question: 'Як повідомити про помилку?',
    answer: 'Якщо ви знайшли помилку або маєте пропозиції щодо покращення, будь ласка, зв\'яжіться з нами через форму на сторінці контактів або напишіть нам на електронну пошту.'
  },
  {
    question: 'Чи є DataFlow Pro безкоштовним?',
    answer: 'Так, DataFlow Pro є повністю безкоштовним для використання. Ми віримо, що базові інструменти для роботи з даними повинні бути доступні кожному.'
  },
  {
    question: 'Чи підтримуються вкладені структури даних?',
    answer: 'Так, DataFlow Pro повністю підтримує вкладені об\'єкти та масиви в JSON, а також ієрархічні структури в XML. При парсингу система автоматично розпізнає та обробляє складні структури даних.'
  }
];

export const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Часті <span className="gradient-text">запитання</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Відповіді на найпоширеніші питання про DataFlow Pro
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto mb-16">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-card px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Не знайшли відповідь?</h2>
              <p className="text-muted-foreground mb-6">
                Зв'яжіться з нами, і ми з радістю допоможемо вам
              </p>
              <Button asChild variant="glass">
                <Link to="/contacts">
                  Зв'язатися з нами
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
