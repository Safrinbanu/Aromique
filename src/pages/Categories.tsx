import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { perfumes } from "@/lib/data";
import { PerfumeCard } from "@/components/PerfumeCard";
import { Button } from "@/components/ui/button";

import FloatingActions from "@/components/FloatingActions";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X, Search } from "lucide-react";

export default function Categories() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialGender = searchParams.get('gender') || 'All';
  
  const [filterGender, setFilterGender] = useState<string>(initialGender);
  const [filterType, setFilterType] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");

  const filteredPerfumes = useMemo(() => {
    const list = perfumes.filter(p => {
      const matchGender = filterGender === "All" || p.gender === filterGender;
      const matchType = filterType === "All" || p.type === filterType;
      const matchSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchGender && matchType && matchSearch;
    });
    if (sortBy === "low") return [...list].sort((a, b) => a.actualprice - b.actualprice);
    if (sortBy === "high") return [...list].sort((a, b) => b.actualprice - a.actualprice);
    return list;
  }, [filterGender, filterType, search, sortBy]);

  const fragranceTypes = ["All", ...Array.from(new Set(perfumes.map(p => p.type)))];
  const genders = ["All", ...Array.from(new Set(perfumes.map(p => p.gender)))];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Our Collection</h1>
        <p className="text-muted-foreground font-light max-w-2xl">
          Browse the full range of Aromique fragrances. Search, filter by family or sort by price to find your perfect match.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          Showing <span className="text-foreground">{filteredPerfumes.length}</span> fragrances
        </p>
        
        <div className="w-full md:w-auto">
          <Button 
            variant="outline" 
            className="md:hidden w-full mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <div className={`flex flex-col md:flex-row gap-4 ${showFilters ? 'flex' : 'hidden md:flex'}`}>
            <div className="w-full md:w-[180px]">
              <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger className="border-border/60">
                  <SelectValue placeholder="Collection" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map(g => (
                    <SelectItem key={g} value={g}>{g === 'All' ? 'All Collections' : `For ${g}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-[180px]">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-border/60">
                  <SelectValue placeholder="Fragrance Family" />
                </SelectTrigger>
                <SelectContent>
                  {fragranceTypes.map(t => (
                    <SelectItem key={t} value={t}>{t === 'All' ? 'All Families' : t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full md:w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="pl-9 border-border/60"
              />
            </div>

            <div className="w-full md:w-[180px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-border/60">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(filterGender !== 'All' || filterType !== 'All' || search !== '' || sortBy !== 'default') && (
              <Button 
                variant="ghost" 
                onClick={() => { setFilterGender('All'); setFilterType('All'); setSearch(''); setSortBy('default'); }}
                className="px-3"
              >
                <X className="h-4 w-4 mr-2" /> Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {filteredPerfumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPerfumes.map(perfume => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-lg border border-border/50">
          <h3 className="font-serif text-2xl mb-2">No fragrances found</h3>
          <p className="text-muted-foreground mb-6">We couldn't find any perfumes matching your current filters.</p>
          <Button 
            variant="outline" 
            onClick={() => { setFilterGender('All'); setFilterType('All'); setSearch(''); setSortBy('default'); }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      
      <FloatingActions />

    </div>
  );
}
