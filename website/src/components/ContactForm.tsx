"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import ContactHeader from "./ContactHeader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API request with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would send the form data to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      console.log("Form submitted:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 py-12" data-oid="8oeh3ag">
      <ContactHeader data-oid="s5wqcvl" />

      {!isSubmitted ? (
        <div
          className="bg-card rounded-lg shadow-sm border p-6 max-w-2xl mx-auto"
          data-oid=":j-zqbt"
        >
          <Form {...form} data-oid="tlk9ye1">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              data-oid="m.-a0--"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="ttc.0qq"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem data-oid="c:zrp-u">
                      <FormLabel data-oid="g48axas">Full Name</FormLabel>
                      <FormControl data-oid="9ggg3ss">
                        <Input
                          placeholder="John Doe"
                          {...field}
                          data-oid="mm.iykz"
                        />
                      </FormControl>
                      <FormMessage data-oid="h-.22z:" />
                    </FormItem>
                  )}
                  data-oid="_60s2bp"
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem data-oid="hw32r.-">
                      <FormLabel data-oid="ijqhwxz">Email Address</FormLabel>
                      <FormControl data-oid="_j:3e6x">
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                          data-oid="ezw1q2c"
                        />
                      </FormControl>
                      <FormMessage data-oid="qxkp:dq" />
                    </FormItem>
                  )}
                  data-oid="wbph960"
                />
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                data-oid="fgmd8ec"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem data-oid="3-b7d-3">
                      <FormLabel data-oid="fkqp2:r">
                        Phone Number (Optional)
                      </FormLabel>
                      <FormControl data-oid="qb-hqvy">
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                          data-oid="vf:w_x9"
                        />
                      </FormControl>
                      <FormMessage data-oid=":uzj7vj" />
                    </FormItem>
                  )}
                  data-oid="vck:pqn"
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem data-oid="p6hq.wb">
                      <FormLabel data-oid="4tpga6.">Subject</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        data-oid="y48.2au"
                      >
                        <FormControl data-oid="nv-hl3b">
                          <SelectTrigger data-oid="c3w2tz.">
                            <SelectValue
                              placeholder="Select a subject"
                              data-oid="i4-xt5f"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent data-oid="a4m01w9">
                          <SelectItem value="general" data-oid="ft65npe">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="support" data-oid="4a9z1uf">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing" data-oid="-ubx5hp">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="feedback" data-oid="_va154:">
                            Feedback
                          </SelectItem>
                          <SelectItem value="other" data-oid="gab5944">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage data-oid="pxi6:si" />
                    </FormItem>
                  )}
                  data-oid="rdu1d0t"
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem data-oid="ynw8uhr">
                    <FormLabel data-oid="lrqdfz1">Message</FormLabel>
                    <FormControl data-oid="5a.hc:7">
                      <Textarea
                        placeholder="Please describe your inquiry in detail..."
                        className="min-h-[120px]"
                        {...field}
                        data-oid="393x3r1"
                      />
                    </FormControl>
                    <FormMessage data-oid="w9ngqbc" />
                  </FormItem>
                )}
                data-oid="qox6owh"
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                disabled={isSubmitting}
                data-oid="eogm:wb"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      data-oid="9_fdw3."
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit Message"
                )}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div
          className="bg-card rounded-lg shadow-sm border p-8 max-w-2xl mx-auto text-center"
          data-oid="_:56f9z"
        >
          <div
            className="flex flex-col items-center justify-center space-y-4"
            data-oid="7vnvgy_"
          >
            <div className="rounded-full bg-primary/20 p-3" data-oid="m.as9v5">
              <CheckCircle
                className="h-8 w-8 text-primary"
                data-oid="xvgyn1e"
              />
            </div>
            <h2
              className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
              data-oid="9d2-.5g"
            >
              Message Sent!
            </h2>
            <p className="text-muted-foreground max-w-md" data-oid=".4zm:d-">
              Thank you for reaching out to us. We've received your message and
              will get back to you as soon as possible.
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="mt-4 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
              data-oid="_07y6po"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
