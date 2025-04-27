import React from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  Calendar,
  Github,
  Twitter,
  Slack,
  Globe,
  Award,
  Heart,
  Layers,
  User,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Custom CommunityHero component
const CommunityHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border border-primary/20" />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
            <Users className="mr-1 h-3 w-3" />
            <span>Join Our Community</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            The Artintel{" "}
            <span className="text-primary">Community</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Connect with fellow developers, data scientists, and AI enthusiasts. Share knowledge, get help, and collaborate on projects using Artintel's platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#join-slack">Join Our Slack</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="#upcoming-events">Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom EventCard component
const EventCard = ({
  title,
  date,
  time,
  location,
  description,
  link,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  link: string;
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{date} • {time}</span>
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={link}>Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Custom CommunityChannel component
const CommunityChannel = ({
  title,
  description,
  icon: Icon,
  memberCount,
  link,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  memberCount: string;
  link: string;
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{memberCount} members</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={link}>Join Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Custom ContributorCard component
const ContributorCard = ({
  name,
  role,
  contributions,
  avatar,
  github,
}: {
  name: string;
  role: string;
  contributions: string;
  avatar: string;
  github: string;
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{contributions}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={github}>
            <Github className="h-4 w-4 mr-2" />
            GitHub Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CommunityPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <CommunityHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Community Channels */}
        <AnimationContainer className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Community Channels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the Artintel community across various platforms. Get help, share your projects, and stay updated on the latest developments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CommunityChannel
              title="Slack Workspace"
              description="Our main community hub. Join channels for general discussion, help, showcase, and announcements."
              icon={Slack}
              memberCount="5,200+"
              link="#join-slack"
            />
            <CommunityChannel
              title="GitHub Discussions"
              description="Technical discussions, feature requests, and collaborative problem-solving for developers."
              icon={Github}
              memberCount="3,800+"
              link="https://github.com/artintel/discussions"
            />
            <CommunityChannel
              title="Twitter Community"
              description="Stay updated with announcements, tips, and engage with the broader AI community."
              icon={Twitter}
              memberCount="12,500+"
              link="https://twitter.com/artintel"
            />
          </div>
        </AnimationContainer>

        {/* Upcoming Events */}
        <AnimationContainer className="mt-20 w-full" id="upcoming-events">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join us for virtual and in-person events to learn, network, and share experiences with the Artintel community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventCard
              title="Getting Started with Artintel"
              date="June 15, 2023"
              time="11:00 AM - 12:30 PM EDT"
              location="Virtual (Zoom)"
              description="A beginner-friendly workshop covering the basics of using Artintel for model discovery, fine-tuning, and deployment."
              link="#register"
            />
            <EventCard
              title="Advanced Fine-Tuning Techniques"
              date="June 22, 2023"
              time="2:00 PM - 4:00 PM EDT"
              location="Virtual (Zoom)"
              description="Deep dive into advanced fine-tuning strategies for optimizing model performance for specific domains and tasks."
              link="#register"
            />
            <EventCard
              title="Artintel Community Meetup"
              date="July 8, 2023"
              time="6:00 PM - 9:00 PM PDT"
              location="San Francisco, CA"
              description="Join us for our monthly in-person meetup featuring lightning talks, demos, and networking with fellow AI enthusiasts."
              link="#register"
            />
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="#all-events">View All Events</Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* Community Forum Highlights */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Forum Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of the most active discussions from our community forum.
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Best practices for fine-tuning Mistral 7B for customer support</CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>John Doe • 2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>24 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I'm trying to fine-tune Mistral 7B for our customer support chatbot. Has anyone had success with this model for similar use cases? What learning rate and batch size worked best for you?
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="#forum-thread" className="flex items-center">
                    View discussion <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Optimizing inference costs for production deployment</CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>Sarah Rodriguez • 5 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>37 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We've deployed a fine-tuned LLM for our product, but the inference costs are higher than expected. Has anyone successfully implemented quantization or other optimization techniques?
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="#forum-thread" className="flex items-center">
                    View discussion <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>MP</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Showcase: Our NLP pipeline using Artintel's platform</CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>Michael Park • 1 week ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>19 replies</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  I wanted to share how we built our document processing pipeline using Artintel. We're using a fine-tuned SLM for classification and entity extraction, with impressive results!
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="#forum-thread" className="flex items-center">
                    View discussion <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link href="#forum">Visit Community Forum</Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* Top Contributors */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Top Contributors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the community members who are actively helping others and contributing to the Artintel ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContributorCard
              name="Alex Johnson"
              role="ML Engineer"
              contributions="Created tutorials on fine-tuning for specific domains and actively helps new users in the forum."
              avatar="/avatars/alex.jpg"
              github="https://github.com/alexj"
            />
            <ContributorCard
              name="Maria Garcia"
              role="Data Scientist"
              contributions="Contributed preprocessing pipelines and shared benchmarks for various model configurations."
              avatar="/avatars/maria.jpg"
              github="https://github.com/mariagarcia"
            />
            <ContributorCard
              name="David Kim"
              role="Full-Stack Developer"
              contributions="Built integration examples for popular frameworks and created deployment guides."
              avatar="/avatars/david.jpg"
              github="https://github.com/davidkim"
            />
            <ContributorCard
              name="Priya Patel"
              role="NLP Researcher"
              contributions="Shares research insights and helps troubleshoot complex fine-tuning challenges."
              avatar="/avatars/priya.jpg"
              github="https://github.com/priyapatel"
            />
          </div>
        </AnimationContainer>

        {/* Community Resources */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Community Resources</CardTitle>
              <CardDescription>
                Helpful resources created by and for the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Starter Templates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready-to-use templates for common use cases to help you get started quickly.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="#templates">Browse Templates</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Showcase Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore projects built by community members using Artintel's platform.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="#showcase">View Showcase</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Contribute</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how you can contribute to the Artintel community and open-source projects.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="#contribute">Get Involved</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Join Slack CTA */}
        <AnimationContainer className="mt-20 w-full" id="join-slack">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
              <Slack className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Slack Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with thousands of developers and AI enthusiasts. Get help, share your projects, and stay updated on the latest Artintel news.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="#slack-invite">Get Your Invite</Link>
            </Button>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default CommunityPage;
