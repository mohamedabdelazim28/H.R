import { Zap, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-background py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            احجز ملعبك بسهولة
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            احجز أفضل الملاعب الخماسية في العبور بضغطة زر واحدة. سهل وسريع وآمن
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[24px] p-8 text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 hover:border-[#4caf50]/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="bg-[#eef8f0] rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-[#4caf50]" />
            </div>
            <h3 className="font-black text-gray-900 mb-3 text-xl">حجز سريع</h3>
            <p className="text-[15px] text-gray-500 font-medium">احجز ملعبك في ثوانٍ معدودة دون تعقيدات</p>
          </div>

          <div className="bg-white rounded-[24px] p-8 text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 hover:border-[#4caf50]/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="bg-[#eef8f0] rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#4caf50]" />
            </div>
            <h3 className="font-black text-gray-900 mb-3 text-xl">معلومات دقيقة</h3>
            <p className="text-[15px] text-gray-500 font-medium">بيانات كاملة عن كل ملعب وأسعار شفافة</p>
          </div>

          <div className="bg-white rounded-[24px] p-8 text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 hover:border-[#4caf50]/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="bg-[#eef8f0] rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-[#4caf50]" />
            </div>
            <h3 className="font-black text-gray-900 mb-3 text-xl">متوفر 24/7</h3>
            <p className="text-[15px] text-gray-500 font-medium">احجز في أي وقت يناسبك من أي مكان</p>
          </div>
        </div>
      </div>
    </section>
  );
}
