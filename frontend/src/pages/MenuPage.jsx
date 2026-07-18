import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodCard from '../components/menu/FoodCard';
import FoodCardSkeleton from '../components/menu/FoodCardSkeleton';
import MenuSearchBar from '../components/menu/MenuSearchBar';
import CategoryFilter from '../components/menu/CategoryFilter';
import SortSelect from '../components/menu/SortSelect';
import FoodDetailModal from '../components/menu/FoodDetailModal';
import Pagination from '../components/menu/Pagination';
import { menuItems, menuCategories, SORT_OPTIONS, ITEMS_PER_PAGE } from '../data/menuData';

function sortItems(items, sortBy) {
  const sorted = [...items];
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

function filterItems(items, search, category) {
  const query = search.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.restaurant.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
}

export default function MenuPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

  const filteredItems = useMemo(
    () => sortItems(filterItems(menuItems, search, category), sortBy),
    [search, category, sortBy],
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCategoryChange = (cat) => setCategory(cat);
  const handleSearchChange = (value) => setSearch(value);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar forceLight />

      {/* Hero header */}
      <section className="relative overflow-hidden bg-void pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-brand/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <span className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            // Full Menu
          </span>
          <h1 className="animate-fade-up-d1 mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Explore Our Menu
          </h1>
          <p className="animate-fade-up-d2 mt-4 max-w-lg text-[15px] text-white/60">
            Discover {menuItems.length}+ curated dishes from top restaurants — filter, search, and order in seconds.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search & Sort toolbar */}
        <div className="animate-fade-up-d3 -mt-8 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <MenuSearchBar
                value={search}
                onChange={handleSearchChange}
                resultCount={filteredItems.length}
              />
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:block">
                Sort by
              </span>
              <SortSelect value={sortBy} options={SORT_OPTIONS} onChange={setSortBy} />
            </div>
          </div>

          <div className="mt-5 border-t border-black/[0.06] pt-5">
            <CategoryFilter
              categories={menuCategories}
              activeCategory={category}
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-muted">
            Showing {paginatedItems.length} of {filteredItems.length} dishes
            {category !== 'all' && ` · ${menuCategories.find((c) => c.id === category)?.name}`}
          </p>
        )}

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <FoodCardSkeleton key={i} />)
            : paginatedItems.length > 0
              ? paginatedItems.map((item, index) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    index={index}
                    onViewDetails={setSelectedItem}
                  />
                ))
              : (
                <div className="col-span-full py-20 text-center">
                  <p className="font-display text-xl font-semibold text-ink">No dishes found</p>
                  <p className="mt-2 text-sm text-muted">Try adjusting your search or category filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setCategory('all');
                    }}
                    className="mt-4 rounded-xl border border-black/[0.08] px-5 py-2.5 text-[13px] font-medium text-ink transition hover:border-brand hover:text-brand"
                  >
                    Clear filters
                  </button>
                </div>
              )}
        </div>

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <Footer />
      <FoodDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
