
import { Link } from 'react-router-dom';
import { cities } from '../data/restaurantData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LocationSelectionPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-12 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Select Your City
          </h1>
          <p className="mt-4 text-muted">
            Choose your location to discover the best restaurants nearby
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.id}
              to={`/restaurants/${city.id}`}
              className="group block overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={`${city.signatureCuisine} in ${city.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-4 left-4 font-display text-2xl font-bold text-white">
                  {city.name}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-muted">
                  Explore {city.signatureCuisine} and more in {city.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
