import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryBubbles from '../components/CategoryBubbles';
import TrendingCarousel from '../components/TrendingCarousel';
import PromoBanner from '../components/PromoBanner';
import FeaturedDishes from '../components/FeaturedDishes';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <CategoryBubbles />
        <TrendingCarousel />
        <PromoBanner />
        <FeaturedDishes />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
