import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";
import { siteConfig } from "@/lib/siteConfig";

export default function Contact() {
  
  return (

    <div>



      <section
  className="relative w-full h-[70vh] md:h-screen bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage: "url('/contact.jpg')"
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-6">
    <h1 className="font-serif text-3xl md:text-5xl text-white mb-6">
      Contact Us
    </h1>

    <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
      Need help choosing a fragrance or tracking an order? Our team is happy to help, usually within a few hours.
    </p>
  </div>
</section>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">

        
  
<FloatingActions />

        <div className="grid gap-8 mb-16 max-w-xl mx-auto">
          <div className="space-y-4">
            <Card className="border-border/50 shadow-sm border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground font-light text-sm mb-2">For general inquiries and press.</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline font-medium">{siteConfig.email}</a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    {siteConfig.address[0]}<br />
                    {siteConfig.address[1]}<br />
                    {siteConfig.address[2]}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Operating Hours</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    {siteConfig.hours[0]}<br />
                    {siteConfig.hours[1]}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
