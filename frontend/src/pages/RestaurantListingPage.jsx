
import { Link, useParams } from 'react-router-dom';
import { restaurants, cities } from '../data/restaurantData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatINR } from '../utils/currency';

export default function RestaurantListingPage() {
  const { cityId } = useParams();
  const cityRestaurants = restaurants.filter((r) => r.city === cityId);
  const selectedCity = cities.find((c) => c.id === cityId);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-12 sm:px-6">
        <div className="mb-8">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all cities
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Restaurants in {selectedCity?.name || cityId}
          </h1>
          <p className="mt-2 text-muted">
            {cityRestaurants.length} restaurants available
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cityRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurants/${cityId}/${restaurant.id}`}
              className="group block overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={`${restaurant.featuredItem?.name || restaurant.cuisine} from ${restaurant.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=450&fit=crop";
                  }}
                />
                {restaurant.offer && (
                  <div className="absolute top-3 left-3 bg-brand text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    {restaurant.offer}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {restaurant.name}
                  </h2>
                  <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-green-700">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted">{restaurant.cuisine}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-muted">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {restaurant.deliveryTime}
                  </span>
                  <span className="text-muted">
                    •
                  </span>
                  <span className="text-muted">
                    Cost for Two: {formatINR(restaurant.costForTwo)}
                  </span>
                  <span className="text-muted">
                    •
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${restaurant.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {restaurant.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  {restaurant.address}
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
