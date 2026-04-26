import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PlayField</h3>
            <p className="text-background/80 text-sm">
              Your trusted platform for booking professional football fields across Egypt.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Browse Fields
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Cities</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Cairo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Giza
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Alexandria
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Helwan & Tanta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-background/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+201001234567" className="hover:text-background transition-colors">
                  +20 100 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@playfield.eg" className="hover:text-background transition-colors">
                  info@playfield.eg
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-background/20 my-8"></div>

        <div className="text-center text-sm text-background/70">
          <p>&copy; 2024 PlayField. All rights reserved. | Booking Made Easy</p>
        </div>
      </div>
    </footer>
  )
}
