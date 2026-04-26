import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-xl p-2.5 shadow-sm">
            <Zap className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">Field</h1>
            <p className="text-xs text-muted-foreground">احجز ملعبك في العبور</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">الرئيسية</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">الملاعب</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors duration-200">تواصل معنا</a>
        </nav>
      </div>
    </header>
  );
}
