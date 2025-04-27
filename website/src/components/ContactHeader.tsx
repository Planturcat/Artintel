import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactHeader() {
  return (
    <div className="mb-12" data-oid="9hrcay:">
      <h1
        className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
        data-oid="rq58k4-"
      >
        Contact Us
      </h1>
      <p className="text-lg text-muted-foreground mb-8" data-oid="s4hv.p2">
        Have a question or need assistance? We're here to help. Fill out the
        form below and we'll get back to you as soon as possible.
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        data-oid="yizbcon"
      >
        <div className="flex items-start space-x-4" data-oid="jdf121t">
          <div className="bg-primary/10 p-3 rounded-full" data-oid="j-2ixby">
            <Mail className="h-5 w-5 text-primary" data-oid="x8d8rlw" />
          </div>
          <div data-oid="v-:_t5c">
            <h3 className="font-medium" data-oid="taexnc_">
              Email Us
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="rx:ptzm">
              Our team will respond within 24 hours
            </p>
            <a
              href="mailto:support@artintel.com"
              className="text-sm text-primary hover:underline mt-1 block"
              tabIndex={0}
              aria-label="Email us at support at artintel dot com"
              data-oid="n2r0813"
            >
              support@artintel.com
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4" data-oid="8tr-cfk">
          <div className="bg-primary/10 p-3 rounded-full" data-oid="himzzc9">
            <Phone className="h-5 w-5 text-primary" data-oid="t1_oz:p" />
          </div>
          <div data-oid="bxw3cd-">
            <h3 className="font-medium" data-oid="-grhld4">
              Call Us
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="hi7f41i">
              Available Monday-Friday, 9am-5pm
            </p>
            <a
              href="tel:+1-800-123-4567"
              className="text-sm text-primary hover:underline mt-1 block"
              tabIndex={0}
              aria-label="Call us at 1-800-123-4567"
              data-oid="mwzm3m6"
            >
              +1-800-123-4567
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4" data-oid="t7_thx8">
          <div className="bg-primary/10 p-3 rounded-full" data-oid="3w7z381">
            <MessageSquare
              className="h-5 w-5 text-primary"
              data-oid="8:_kfjc"
            />
          </div>
          <div data-oid="zmcdna:">
            <h3 className="font-medium" data-oid="pd1z5x6">
              Live Chat
            </h3>
            <p className="text-sm text-muted-foreground" data-oid="9w_6q75">
              Chat with our support team in real-time
            </p>
            <button
              className="text-sm text-primary hover:underline mt-1 block"
              tabIndex={0}
              aria-label="Start live chat with support"
              data-oid=":_:szu8"
            >
              Start a conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
