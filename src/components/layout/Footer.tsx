import React from 'react';
import { DataFlowIcon } from '@/components/icons/DataFlowIcon';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  product: [
    { label: 'Можливості', href: '/#features', isAnchor: true },
    { label: 'Демо', href: '/#demo', isAnchor: true },
    { label: 'Документація', href: '/documentation', isAnchor: false },
  ],
  company: [
    { label: 'Про нас', href: '/about', isAnchor: false },
    { label: 'FAQ', href: '/faq', isAnchor: false },
    { label: 'Контакти', href: '/contacts', isAnchor: false },
  ],
  legal: [
    { label: 'Політика приватності', href: '/privacy', isAnchor: false },
    { label: 'Умови використання', href: '/terms', isAnchor: false },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-surface-0/50">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <DataFlowIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">
                DataFlow<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Інтелектуальна платформа для парсингу та обробки даних нового покоління.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.isAnchor ? (
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компанія</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Правова інформація</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 DataFlow Pro. Всі права захищено.
          </p>
          <p className="text-sm text-muted-foreground">
            Зроблено з ❤️ в Україні
          </p>
        </div>
      </div>
    </footer>
  );
};