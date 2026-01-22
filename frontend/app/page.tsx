import { Hero } from '@/components/home/Hero';
import { PopularCategories } from '@/components/home/PopularCategories';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FeaturedMasters } from '@/components/home/FeaturedMasters';
import { CallToAction } from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <FeaturedMasters />
      <CallToAction />
    </>
  );
}
