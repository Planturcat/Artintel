import { FEATURES } from "@/constants";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import SectionBadge from "./ui/section-badge";

const Features = () => {
  return (
    <Wrapper className="py-20 lg:py-32" data-oid="0cuwqr0">
      <div
        className="flex flex-col items-center text-center gap-4 mb-16"
        data-oid="ksr7lyr"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="1cjhy1a">
          <SectionBadge title="Platform Features" data-oid="s1vpf0o" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="8ix:ssf">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid="3u2hfng"
          >
            Manage AI models smarter
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="ib07v3x">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
            data-oid="e3bbdzl"
          >
            Experience the future of AI with our all-in-one platform for
            seamless model management and deployment.
          </p>
        </AnimationContainer>
      </div>

      <div className="flex flex-col gap-6 px-1 md:px-0" data-oid="x4gg_0j">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_.65fr] gap-6"
          data-oid="n-m:puj"
        >
          <AnimationContainer
            animation="fadeRight"
            delay={0.5}
            data-oid="n8nc8-z"
          >
            <div
              className="relative rounded-3xl bg-[#191919] backdrop-blur-3xl overflow-hidden min-h-[400px]"
              data-oid="._pudvk"
            >
              <div
                className="absolute inset-0 p-8 flex flex-col justify-between"
                data-oid="ca4m62b"
              >
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.6}
                  data-oid="p.zna_l"
                >
                  <div className="space-y-4" data-oid="3i69yy2">
                    <h3
                      className="text-xl md:text-2xl font-medium"
                      data-oid="v.sn:ki"
                    >
                      {FEATURES[0].title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-muted-foreground max-w-md"
                      data-oid="vay:aan"
                    >
                      {FEATURES[0].description}
                    </p>
                  </div>
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.7}
                  data-oid="p_rsvkb"
                >
                  <div className="relative h-60" data-oid="olgun-d">
                    <Image
                      src={FEATURES[0].image}
                      alt={FEATURES[0].title}
                      fill
                      className="object-contain"
                      data-oid="lpee79b"
                    />
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>

          <AnimationContainer
            animation="fadeLeft"
            delay={0.6}
            data-oid="r2o8x31"
          >
            <div
              className="relative rounded-3xl bg-[#191919] backdrop-blur-3xl overflow-hidden min-h-[400px]"
              data-oid="wvv4yhy"
            >
              <div
                className="absolute inset-0 p-8 flex flex-col justify-between"
                data-oid="wjonki-"
              >
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.7}
                  data-oid="nlxruxs"
                >
                  <div className="space-y-4" data-oid="._867kl">
                    <h3
                      className="text-xl md:text-2xl font-medium"
                      data-oid="3:fonz4"
                    >
                      {FEATURES[1].title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-muted-foreground max-w-md"
                      data-oid="gilyaqw"
                    >
                      {FEATURES[1].description}
                    </p>
                  </div>
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.8}
                  data-oid="sk7o5lr"
                >
                  <div className="relative h-48" data-oid="gvp49tq">
                    <Image
                      src={FEATURES[1].image}
                      alt={FEATURES[1].title}
                      fill
                      className="object-contain"
                      data-oid="pb.3lll"
                    />
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[.65fr_1fr] gap-6"
          data-oid="q0:veex"
        >
          <AnimationContainer
            animation="fadeRight"
            delay={0.7}
            data-oid="l3z5c.q"
          >
            <div
              className="relative rounded-3xl bg-[#191919] backdrop-blur-3xl overflow-hidden min-h-[350px]"
              data-oid="-k1aya8"
            >
              <div
                className="absolute inset-0 p-8 flex flex-col justify-between"
                data-oid="cvlx4:f"
              >
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.8}
                  data-oid="f16a20_"
                >
                  <div className="space-y-4" data-oid=".-j-ep.">
                    <h3
                      className="text-xl md:text-2xl font-medium"
                      data-oid="-dseef4"
                    >
                      {FEATURES[2].title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-muted-foreground max-w-md"
                      data-oid="_tbk_aa"
                    >
                      {FEATURES[2].description}
                    </p>
                  </div>
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.9}
                  data-oid="gmm4t-."
                >
                  <div className="relative h-48" data-oid="55m2y11">
                    <Image
                      src={FEATURES[2].image}
                      alt={FEATURES[2].title}
                      fill
                      className="object-contain"
                      data-oid="-6-92ad"
                    />
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>

          <AnimationContainer
            animation="fadeLeft"
            delay={0.8}
            data-oid="ot01krv"
          >
            <div
              className="relative rounded-3xl bg-[#191919] backdrop-blur-3xl overflow-hidden min-h-[350px]"
              data-oid="6_vi.6z"
            >
              <div
                className="absolute inset-0 p-8 flex flex-col justify-between"
                data-oid="6jrges-"
              >
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.9}
                  data-oid="41bb:8q"
                >
                  <div className="space-y-4" data-oid="bq3c3h6">
                    <h3
                      className="text-xl md:text-2xl font-medium"
                      data-oid="tgpypij"
                    >
                      {FEATURES[3].title}
                    </h3>
                    <p
                      className="text-sm md:text-base text-muted-foreground max-w-md"
                      data-oid="frbx3co"
                    >
                      {FEATURES[3].description}
                    </p>
                  </div>
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={1}
                  data-oid="ij2bc06"
                >
                  <div className="relative h-48" data-oid="cpsl7b3">
                    <Image
                      src={FEATURES[3].image}
                      alt={FEATURES[3].title}
                      fill
                      className="object-contain"
                      data-oid="8qbyg5s"
                    />
                  </div>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Features;
