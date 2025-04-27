import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/constants";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import SectionBadge from "./ui/section-badge";

const FAQ = () => {
  return (
    <Wrapper className="py-20 lg:py-32" data-oid="snfbls9">
      <div
        className="flex flex-col items-center text-center gap-4"
        data-oid="2gmy6mz"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="6txmc7x">
          <SectionBadge title="FAQ" data-oid="ysk2ts-" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="zecik4d">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid="d6g-:ot"
          >
            Still have questions?
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="qa2hjlb">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
            data-oid="phxwbi4"
          >
            Find answers to common questions about our Artintel platform
          </p>
        </AnimationContainer>
      </div>

      <div className="max-w-3xl mx-auto pt-10" data-oid="f43:wlf">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          data-oid="pdhrnoc"
        >
          {FAQS.map((item, index) => (
            <AnimationContainer
              key={index}
              animation="fadeUp"
              delay={0.5 + index * 0.1}
              data-oid="-e5::q-"
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-none bg-[#191919] rounded-2xl px-6"
                data-oid="xkw9-ow"
              >
                <AccordionTrigger
                  className="hover:no-underline py-6 text-base md:text-lg text-left font-normal"
                  data-oid="fac959b"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-muted-foreground text-left"
                  data-oid=":q9c77v"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimationContainer>
          ))}
        </Accordion>
      </div>
    </Wrapper>
  );
};

export default FAQ;
