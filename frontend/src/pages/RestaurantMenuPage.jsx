
import { Link, useParams } from 'react-router-dom';
import { restaurants } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VegBadge from '../components/menu/VegBadge';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { formatINR } from '../utils/currency';

export default function RestaurantMenuPage() {
  const { cityId, restaurantId } = useParams();
  const { addItem } = useCart();

  const restaurant = restaurants.find((r) => r.id === restaurantId && r.city === cityId);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ink">Restaurant not found</h2>
          <Link
            to="/locations"
            className="mt-4 inline-block text-brand hover:underline"
          >
            Back to locations
          </Link>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const groupedMenu = restaurant.menu.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-12 sm:px-6">
        <div className="mb-8">
          <Link
            to={`/restaurants/${cityId}`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to restaurants
          </Link>
        </div>

        <div className="mb-10">
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <ImageWithFallback
              src={restaurant.image}
              alt={`${restaurant.featuredItem?.name || restaurant.cuisine} from ${restaurant.name}`}
              fallbackType="restaurant"
            />
            {restaurant.offer && (
              <div className="absolute bottom-4 left-4 bg-brand text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
                {restaurant.offer}
              </div>
            )}
          </div>
          <div className="mt-6">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {restaurant.name}
            </h1>
            <p className="mt-2 text-muted">
              {restaurant.cuisine}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-ink">{restaurant.rating}</span>
              </div>
              <span className="text-muted">•</span>
              <span className="flex items-center gap-1 text-muted">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {restaurant.deliveryTime}
              </span>
              <span className="text-muted">•</span>
              <span className="text-muted">
                Cost for Two: {formatINR(restaurant.costForTwo)}
              </span>
              <span className="text-muted">•</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${restaurant.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {restaurant.isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              {restaurant.address}
            </p>
          </div>
        </div>

        {/* Render menu by categories */}
        <div className="space-y-10">
          {Object.entries(groupedMenu).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-display text-2xl font-bold text-ink mb-6">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white p-4"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      fallbackType="food"
                      className="h-28 w-28 flex-shrink-0 rounded-xl"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start gap-2">
                          <VegBadge isVeg={item.isVeg} />
                          <h3 className="font-semibold text-ink">{item.name}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted">{item.description}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-display text-lg font-semibold text-ink">
                          {formatINR(item.price)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              restaurant: restaurant.name,
                            })
                          }
                          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] active:scale-[0.97]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
