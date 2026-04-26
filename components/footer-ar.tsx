import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Field</h3>
            <p className="text-sm opacity-85 leading-relaxed">
              منصة موثوقة لحجز ملاعب كرة القدم الخماسية في العبور بسهولة وأمان
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:opacity-60 transition-opacity duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الرئيسية</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الملاعب المتاحة</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">عن التطبيق</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">سياسة الخصوصية</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">المنطقة</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الحي التاسع</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الحي الخامس</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الظهير الصحراوي</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity duration-200">الحي الثاني</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">تواصل معنا</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>01200000000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@field.eg</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>العبور، القليوبية، مصر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 py-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>© {currentYear} Field. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity duration-200">شروط الاستخدام</a>
            <a href="#" className="hover:opacity-100 transition-opacity duration-200">سياسة الخصوصية</a>
            <a href="#" className="hover:opacity-100 transition-opacity duration-200">اتصل بنا</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
