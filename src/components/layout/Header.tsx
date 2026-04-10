import React from 'react';
import { DataFlowIcon } from '@/components/icons/DataFlowIcon';
import { Button } from '@/components/ui/button';
import { ArrowDown, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToDemo = () => {
    if (isHomePage) {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#demo');
    }
    setMobileMenuOpen(false);
  };

  const scrollToFeatures = () => {
    if (isHomePage) {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#features');
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Можливості', action: scrollToFeatures },
    { label: 'Демо', action: scrollToDemo },
    { label: 'Документація', href: '/documentation' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <DataFlowIcon className="relative h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              DataFlow<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.href ? (
                <Link 
                  key={item.label}
                  to={item.href} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button 
                  key={item.label}
                  onClick={item.action} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="hero" size="sm" className="gap-2 hidden sm:flex" onClick={scrollToDemo}>
              <ArrowDown className="h-4 w-4" />
              Спробувати
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                item.href ? (
                  <Link 
                    key={item.label}
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button 
                    key={item.label}
                    onClick={item.action} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Button variant="hero" size="sm" className="gap-2 mt-2 w-full" onClick={scrollToDemo}>
                <ArrowDown className="h-4 w-4" />
                Спробувати
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};