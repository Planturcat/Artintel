import { useEffect, useRef } from "react";
import {
  ScrollText,
  FileCheck,
  Scale,
  AlertCircle,
  Book,
  MessageSquare,
  Gavel,
  Shield,
  Pen,
} from "lucide-react";
import styles from "../../../../styles/terms-animations.module.css";

const TermsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const icons = containerRef.current.querySelectorAll(
        `.${styles.parallax}`,
      );
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 20;
      const moveY = (e.clientY - centerY) / 20;

      icons.forEach((icon, index) => {
        const depth = (index + 1) * 0.5;
        (icon as HTMLElement).style.transform =
          `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-24 bg-gradient-to-br from-background via-background to-background/90 overflow-hidden"
      data-oid="0apuk:6"
    >
      <div
        className={`absolute inset-0 ${styles.textPattern}`}
        aria-hidden="true"
        data-oid="4c95rvp"
      ></div>

      {/* Background animated elements */}
      <ScrollText
        className={`absolute text-primary/40 h-14 w-14 top-1/4 left-[15%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "0s" }}
        data-oid="sg8i5hq"
      />

      <FileCheck
        className={`absolute text-primary/50 h-12 w-12 bottom-1/3 left-[25%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "0.5s" }}
        data-oid=":p842v:"
      />

      <Scale
        className={`absolute text-primary/60 h-10 w-10 top-1/3 left-[35%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "1.5s" }}
        data-oid="w24gy4d"
      />

      <AlertCircle
        className={`absolute text-primary/30 h-8 w-8 bottom-1/4 left-[45%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "2s" }}
        data-oid="vefrbg4"
      />

      <Book
        className={`absolute text-primary/40 h-14 w-14 top-1/4 right-[15%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "0.3s" }}
        data-oid="p8astrr"
      />

      <MessageSquare
        className={`absolute text-primary/50 h-12 w-12 bottom-1/3 right-[25%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "0.8s" }}
        data-oid="3xst3.s"
      />

      <Gavel
        className={`absolute text-primary/60 h-10 w-10 top-1/3 right-[20%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "1s" }}
        data-oid="sdrgc-y"
      />

      <Shield
        className={`absolute text-primary/30 h-8 w-8 bottom-1/4 right-[30%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "1.3s" }}
        data-oid="10dt13m"
      />

      <Pen
        className={`absolute text-primary/40 h-10 w-10 top-2/3 right-[40%] ${styles.floatingElement} ${styles.parallax}`}
        style={{ animationDelay: "1.7s" }}
        data-oid=".47zrc1"
      />

      {/* Hero content */}
      <div className="container relative z-10 px-4 md:px-6" data-oid="t_cz.t7">
        <div
          className="flex flex-col items-center text-center space-y-6"
          data-oid=":cu6m-o"
        >
          <div
            className={`p-3 rounded-full bg-primary/10 ${styles.fadeIn}`}
            data-oid="hlsnafv"
          >
            <Gavel className="h-8 w-8 text-primary" data-oid="d9h14tj" />
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter ${styles.slideUp}`}
            data-oid=":o1dpxj"
          >
            Terms of Service
          </h1>

          <p
            className={`max-w-[700px] text-muted-foreground text-lg md:text-xl ${styles.slideUp}`}
            style={{ animationDelay: "0.2s" }}
            data-oid="p_wxibe"
          >
            The rules and guidelines governing your use of Artintel's services
            and products
          </p>

          <div
            className={`mt-8 pt-8 border-t border-border/40 flex flex-wrap justify-center gap-6 ${styles.slideUp}`}
            style={{ animationDelay: "0.3s" }}
            data-oid="h3xf:k:"
          >
            <div
              className={`flex items-center space-x-2 ${styles.staggered}`}
              data-oid="elhpe4."
            >
              <Shield className="h-5 w-5 text-primary" data-oid="91hygx_" />
              <span
                className="text-sm text-muted-foreground"
                data-oid="nr3m_as"
              >
                Data Protection
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 ${styles.staggered}`}
              data-oid="q7vzba_"
            >
              <Scale className="h-5 w-5 text-primary" data-oid=".omur8d" />
              <span
                className="text-sm text-muted-foreground"
                data-oid="g4s1u28"
              >
                Fair Use Policy
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 ${styles.staggered}`}
              data-oid="_1eq3h6"
            >
              <FileCheck className="h-5 w-5 text-primary" data-oid="ls703lj" />
              <span
                className="text-sm text-muted-foreground"
                data-oid="ih8hr5o"
              >
                Compliance
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 ${styles.staggered}`}
              data-oid="4tfe-uh"
            >
              <AlertCircle
                className="h-5 w-5 text-primary"
                data-oid="fhl_0j7"
              />

              <span
                className="text-sm text-muted-foreground"
                data-oid=":8e4:j4"
              >
                Service Limitations
              </span>
            </div>
          </div>

          <div
            className={`${styles.documentGlow} mt-10 p-0.5 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 ${styles.slideUp}`}
            style={{ animationDelay: "0.5s" }}
            data-oid="kw6w-:v"
          >
            <div
              className="bg-background/95 backdrop-blur-sm rounded-lg p-6 md:p-8"
              data-oid="c2ga9i7"
            >
              <div
                className="flex items-center justify-center"
                data-oid="20z9th."
              >
                <ScrollText
                  className="h-6 w-6 text-primary mr-2"
                  data-oid="ww81ofz"
                />

                <span className="text-sm font-medium" data-oid="3q1kdxa">
                  Last updated: June 1, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsHero;
