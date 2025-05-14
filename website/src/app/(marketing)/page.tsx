import CTA from "@/components/cta";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import ModelSelection from "@/components/model-selection";
import Perks from "@/components/perks";


import PlatformMetrics from "@/components/platform-metrics";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import GoogleGeminiEffect from "@/components/ui/google-gemini-effect";

const HomePage = () => {
  return (
    <div className="w-full relative flex flex-col pt-16" data-oid="b2tjo2.">
      <section className="w-full" data-oid="unx.8w7">
        <Hero data-oid="h-2snek" />
      </section>
      <section className="w-full relative overflow-hidden" data-oid="unx.8w7">
        <GoogleGeminiEffect
          title="What Can You Do With Artintel?"
          description="The Complete No-Code Platform For Discovering, Fine-Tuning, And Deploying Open-Source Language Models."
          className="z-10"
          autoAnimate={true}
        />
      </section>

      <section className="w-full relative overflow-hidden" data-oid="model-selection">
        <ModelSelection />
      </section>

      <section className="w-full" data-oid="h9qdti8">
        <Perks data-oid="17ap.2q" />
      </section>

      <section className="w-full" data-oid="4fj4a_1">
        <HowItWorks data-oid="aprc8px" />
      </section>

      <section className="w-full" data-oid="361pjqz">
        <Features data-oid="c3gb56x" />
      </section>

      
      <section className="w-full" data-oid="df7o_f_">
        <PlatformMetrics data-oid="6::oo-k" />
      </section>

      <section className="w-full" data-oid="g-y.jhq">
        <FAQ data-oid="phn:f.r" />
      </section>

      <section className="w-full" data-oid="4p_x7ys">
        < CTA data-oid="cvka:pn" />
      </section>
    </div>
  );
};

export default HomePage;
