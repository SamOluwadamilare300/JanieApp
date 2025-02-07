import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const plans = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '#0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '29k',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900 via-violet-700 to-bg">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          aria-label="Background video showing dynamic social media interactions"
        >
          <source src="https://videos.pexels.com/video-files/5223113/5223113-hd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10">
          <div className="container px-4 py-8">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white text-purple-800 flex items-center justify-center font-bold">
                  J
                </div>
                <span className="text-xl text-white font-semibold text-primary-foreground">
                  Janie
                </span>
              </div>
              <nav className="hidden space-x-6 text-sm font-semibold text-white md:block">
                <Link href="#features">Features</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#about">About</Link>
              </nav>
              <Button className="bg-white hover:text-white text-primary">
                <Link href="/dashboard">Login</Link>
              </Button>
            </header>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter mb-9 text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Social Media Engagement with Janie
              </h1>
              <p className="mt-6 text-lg text-purple-200">
                Janie revolutionizes how you connect with your audience on
                Social media. Automate responses and boost engagement effortlessly,
                turning interactions into valuable business opportunities.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-400 hover:text-white hover:bg-violet-900/50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Select the perfect plan to boost your social media engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{plan.cta}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
