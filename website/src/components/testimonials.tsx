import { TESTIMONIALS } from "@/constants";
import { Star } from "lucide-react";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import Marquee from "./ui/marquee";
import SectionBadge from "./ui/section-badge";

const Testimonials = () => {
  return (
    <Wrapper className="py-20 lg:py-32" data-oid="0e_.8sl">
      <div
        className="flex flex-col items-center text-center gap-4 mb-16"
        data-oid="qfvtrd6"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="u1yf-sz">
          <SectionBadge title="Testimonials" data-oid="5uk:8l_" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="y.sd..8">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid=":0f-dzm"
          >
            Loved by AI and data
            <br data-oid="c-:cp0g" />
            professionals
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="f:vpje.">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
            data-oid="9tjyaka"
          >
            See what our users have to say about their experience with our
            platform
          </p>
        </AnimationContainer>
      </div>

      <AnimationContainer animation="fadeUp" delay={0.5} data-oid="0cq_au5">
        <div className="relative" data-oid="4jk2hzg">
          <div
            className="absolute -left-1 top-0 w-20 h-full bg-gradient-to-r from-[#101010] to-transparent z-10"
            data-oid="oxzai7e"
          />

          <div
            className="absolute -right-1 top-0 w-20 h-full bg-gradient-to-l from-[#101010] to-transparent z-10"
            data-oid=":yx.hv8"
          />

          <Marquee className="[--gap:1.5rem]" pauseOnHover data-oid="3.x4qc2">
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.6 + index * 0.1}
                data-oid="9n8bxag"
              >
                <div
                  className="flex-shrink-0 w-[400px] rounded-3xl bg-[#191919] backdrop-blur-3xl p-8"
                  data-oid="k6ckzi:"
                >
                  <div className="flex flex-col gap-6" data-oid="5g7pwnf">
                    <AnimationContainer
                      animation="fadeRight"
                      delay={0.7 + index * 0.1}
                      data-oid="y58lxtp"
                    >
                      <div
                        className="flex items-center gap-4"
                        data-oid="8ply60c"
                      >
                        <div
                          className="relative w-12 h-12 rounded-full overflow-hidden"
                          data-oid="k692i.l"
                        >
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                            data-oid="ywk8azj"
                          />
                        </div>
                        <div data-oid="nxj.uol">
                          <h4 className="font-medium" data-oid="0ertfph">
                            {testimonial.author}
                          </h4>
                          <p
                            className="text-sm text-muted-foreground"
                            data-oid="qr4dr4m"
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </AnimationContainer>

                    <AnimationContainer
                      animation="fadeUp"
                      delay={0.8 + index * 0.1}
                      data-oid="4_xisj6"
                    >
                      <p className="text-lg" data-oid="udbv8cc">
                        "{testimonial.content}"
                      </p>
                    </AnimationContainer>

                    <AnimationContainer
                      animation="fadeUp"
                      delay={0.9 + index * 0.1}
                      data-oid="y52uz56"
                    >
                      <div className="flex gap-1" data-oid="d8sl5yc">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                            data-oid="4zwanhi"
                          />
                        ))}
                      </div>
                    </AnimationContainer>
                  </div>
                </div>
              </AnimationContainer>
            ))}
          </Marquee>
        </div>
      </AnimationContainer>
    </Wrapper>
  );
};

export default Testimonials;
