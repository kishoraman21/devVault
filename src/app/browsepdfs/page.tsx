"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Code,
  CheckCircle2,
  ShoppingCart,
  Loader2,
  Database,
  Globe,
  Cpu,
  Lock,
  Braces,
  FileCode,
  X,
  LucideIcon,
  Tag,
  ArrowRight,
  Filter,
  ChevronDown,
  Terminal,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

interface Product {
  _id: string;
  id?: number;
  title: string;
  description?: string;
  price?: string | number;
  pages?: string | number;
  counts?: string | number;
  downloads?: number;
  rating?: number;
  contents?: string[];
  outcomes?: string[];
}

interface ProductContent {
  description: string;
  contents: string[];
  outcomes: string[];
}


const getThumbnailConfig = (title: string | undefined) => {
  const lowerTitle = title?.toLowerCase() || "";
  
  if (lowerTitle.includes("mern")) return {
    image: "/thumbnails/mern.jpg",
    accent: "text-emerald-400",
    icon: Globe,
  };
  if (lowerTitle.includes("dsa") || lowerTitle.includes("algorithm")) return {
    image: "/thumbnails/dsa.jpg",
    accent: "text-indigo-400",
    icon: Code,
  };
  if (lowerTitle.includes("database") || lowerTitle.includes("sql")) return {
    image: "/thumbnails/sql.jpg",
    accent: "text-emerald-400",
    icon: Database,
  };
  if (lowerTitle.includes("html") || lowerTitle.includes("css") || lowerTitle.includes("web")) return {
    image: "/thumbnails/html-css-js.jpg",
    accent: "text-blue-400",
    icon: Globe,
  };
  if (lowerTitle.includes("system") || lowerTitle.includes("design")) return {
    image: "/thumbnails/systemdesign.png",
    accent: "text-violet-400",
    icon: Cpu,
  };
  if (lowerTitle.includes("vs code") || lowerTitle.includes("vscode")) return {
    image: "/thumbnails/vscode.png",
    accent: "text-blue-500",
    icon: FileCode,
  };
  if (lowerTitle.includes("oops") || lowerTitle.includes("object oriented")) return {
    image: "/thumbnails/oops.png",
    accent: "text-purple-400",
    icon: Braces,
  };
  if (lowerTitle.includes("java")) return {
    image: "/thumbnails/java.jpg",
    accent: "text-orange-500",
    icon: Braces,
  };
  if (lowerTitle.includes("leetcode")) return {
    image: "/thumbnails/leetcode.png",
    accent: "text-orange-500",
    icon: Code,
  };
  if (lowerTitle === "c" || lowerTitle.startsWith("c ") || lowerTitle.includes(" c ") || lowerTitle === "c programming") return {
    image: "/thumbnails/c-programming.png",
    accent: "text-blue-400",
    icon: Terminal,
  };
  if (lowerTitle.includes("python") || lowerTitle.includes("javascript") || lowerTitle.includes("js")) return {
    image: "/thumbnails/programming.png",
    accent: "text-orange-400",
    icon: Braces,
  };
  
  return {
    image: "/thumbnails/other.png",
    accent: "text-slate-400",
    icon: FileCode,
  };
};

const getProductContent = (product: Product): ProductContent => ({
  description: product.description || "No description available",
  contents: product.contents || [],
  outcomes: product.outcomes || [],
});


const FilterButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 font-space ${
      active 
      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
      : "bg-muted/50 text-muted-foreground hover:bg-muted"
    }`}
  >
    {children}
  </button>
);

const CustomDropdown = ({ value, onChange }: { value: string; onChange: (val: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "all", label: "All" },
    { value: "free", label: "Free " },
    { value: "paid", label: "Premium " },
  ];

  const currentLabel = options.find(opt => opt.value === value)?.label || "All Resources";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-muted/40 hover:bg-muted/60 border border-border/50 rounded-2xl text-xs font-semibold transition-all font-space"
      >
        <span className="text-muted-foreground">{currentLabel}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-transparent"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute left-0 mt-2 w-25 z-50 overflow-hidden bg-background/90 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl p-1.5"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left  px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    value === opt.value 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PDFLibraryPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all" | "free" | "paid">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<{ products: Product[] }>("/api/products");
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredPDFs = useMemo(() => {
    return products.filter((pdf) => {
      const title = pdf.title?.toLowerCase() || "";
      const description = pdf.description?.toLowerCase() || "";
      const matchesSearch = title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
      
      const isFreeProduct = pdf.price === "FREE";

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "free") return matchesSearch && isFreeProduct;
      return matchesSearch && !isFreeProduct;
    });
  }, [products, searchQuery, activeTab]);

const handleAction = async (productId: string) => {
  if (!acceptedTerms) {
    toast.error("Please accept the Terms & Conditions.");
    return;
  }

  if (!userEmail) {
    toast.error("Please enter a valid email.");
    return;
  }

  try {
    setIsDownloading(true);

    // Creating a Razorpay Order
    const orderRes = await axios.post("/api/create-order", {
      productId,
      userEmail,
    });

    const { orderId, dbOrderId, amount, isFree } = orderRes.data;

    if (isFree) {
      // Direct verification for free products
      await axios.post("/api/verify-payment", {
        dbOrderId,
        userEmail,
        isFree: true,
      });

      toast.success("Free access granted! Download links sent to your email.");
      setSelectedProduct(null);
      return;
    }

    //  Opening the  Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount,
      currency: "INR",
      name: "DevVault",
      description: "PDF Purchase",
      order_id: orderId,

      prefill: {
        email: userEmail,
      },

      handler: async function (response: any) {
        try {
          // Verify Payment (sever side)
          await axios.post("/api/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId,
            userEmail,
            isFree: false
          });

          toast.success("Payment successful! Download links sent to your email.");
          setSelectedProduct(null);
        } catch (err) {
          toast.error("Payment verification failed.");
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled.");
        },
      },

      theme: {
        color: "#2563eb", 
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error(err);
    toast.error("Failed to initiate payment.");
  } finally {
    setIsDownloading(false);
  }
};


  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 font-space">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
          >
            <Tag className="w-3 h-3" />
            {isLoading ? "Loading Library..." : `${products.length}+ Premium Resources`}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 font-space"
          >
            Knowledge <span className="text-primary italic">Heaven.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-space"
          >
            Access expertly curated study materials, from foundational web technologies 
            to advanced system design architectures.
          </motion.p>
        </div>
      </section>

      <section className="sticky top-[80px] z-30 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className={`flex flex-row items-center gap-2 sm:gap-4 p-2 w-fit bg-background/60 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl transition-all duration-500 ${isScrolled ? "bg-transparent border-transparent shadow-none" : ""}`}
          >
            <div className="relative group min-w-[200px] sm:min-w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2 bg-muted/40 border border-transparent focus:border-primary/20 rounded-2xl focus:outline-none transition-all font-space text-sm"
              />
            </div>
            
            <AnimatePresence>
              {!isScrolled && (
                <>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="hidden lg:flex items-center gap-1.5 p-1 bg-muted/20 rounded-2xl"
                  >
                    <FilterButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>All</FilterButton>
                    <FilterButton active={activeTab === "free"} onClick={() => setActiveTab("free")}>Free</FilterButton>
                    <FilterButton active={activeTab === "paid"} onClick={() => setActiveTab("paid")}>Paid</FilterButton>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="lg:hidden"
                  >
                    <CustomDropdown value={activeTab} onChange={setActiveTab} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground animate-pulse font-space font-medium">Summoning resources...</p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <X className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 font-space">{error}</h3>
              <button onClick={() => window.location.reload()} className="text-primary hover:underline font-medium">Try Again</button>
            </div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPDFs.map((pdf, idx) => {
                  const config = getThumbnailConfig(pdf.title);
                  const Icon = config.icon;
                  return (
                    <motion.div
                      layout
                      key={pdf._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group relative"
                    >
                      <div className="h-full bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                        <div className="h-48 relative overflow-hidden font-space">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${config.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="relative z-10 flex justify-between items-start h-full p-6">
                            <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                              <Icon className={`w-8 h-8 ${config.accent} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                            </div>
                          </div>
                        </div>

                        <div className="p-8">
                          <h3 className="text-xl font-bold mb-3 font-space group-hover:text-primary transition-colors line-clamp-1">
                            {pdf.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 font-space leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                            {pdf.description}
                          </p>
                          
                          <div className="flex items-center gap-4 mb-8">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Pages</span>
                              <span className="font-bold text-sm">{pdf.pages || "--"}</span>
                            </div>
                            <div className="w-px h-8 bg-border/50" />
                            <div className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Files</span>
                              <span className="font-bold text-sm">{pdf.counts || "1"}</span>
                            </div>
                            <div className="w-px h-8 bg-border/50" />
                            <div className="flex flex-col">
                              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Price</span>
                              <span className="font-bold text-sm">
                                {pdf.price === "FREE" ? "FREE" : (String(pdf.price).startsWith("₹") ? pdf.price : `₹${pdf.price || "499"}`)}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedProduct(pdf)}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-muted hover:bg-primary hover:text-primary-foreground rounded-2xl font-bold transition-all duration-300 group/btn"
                          >
                            <span>Access Library</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredPDFs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-muted/20 rounded-3xl border border-dashed border-border"
            >
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold font-space">No resources found</h3>
              <p className="text-muted-foreground font-space">Try broadening your search or switching tabs.</p>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-border shadow-2xl pointer-events-auto relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full z-[110] transition-colors group"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                {(() => {
                  const config = getThumbnailConfig(selectedProduct.title);
                  const Icon = config.icon;
                  return (
                    <div className="min-h-[310px] md:h-96 relative overflow-hidden font-space">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${config.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-12">
                        <div className="mb-4 md:mb-6 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-fit">
                          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${config.accent}`} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white font-space tracking-tighter mb-6 drop-shadow-2xl leading-[1.1]">
                          {selectedProduct.title}
                        </h2>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          <div className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 flex flex-col items-center min-w-[80px] md:min-w-[100px]">
                            <span className="text-lg md:text-xl font-black">{selectedProduct.pages}</span>
                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Pages</span>
                          </div>
                          <div className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 flex flex-col items-center min-w-[80px] md:min-w-[100px]">
                            <span className="text-lg md:text-xl font-black">{selectedProduct.counts || "1"}</span>
                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">PDFs</span>
                          </div>
                          <div className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 flex flex-col items-center min-w-[80px] md:min-w-[100px]">
                            <span className="text-lg md:text-xl font-black">{selectedProduct.price === "FREE" ? "FREE" : (String(selectedProduct.price).startsWith("₹") ? selectedProduct.price : `₹${selectedProduct.price || "49"}`)}</span>
                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Price</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="p-6 md:p-12 space-y-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold flex items-center gap-2 font-space">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Comprehensive Guide
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-space">
                        {getProductContent(selectedProduct).description}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">What's Inside</h4>
                        <ul className="space-y-3">
                          {getProductContent(selectedProduct).contents.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-space">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <div className="p-8 bg-muted/50 rounded-3xl border border-border space-y-6">
                          <h4 className="font-bold font-space flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            Get Access Now
                          </h4>
                          
                          <div className="space-y-4">
                            <input
                              type="email"
                              placeholder="Your  email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              className="w-full px-5 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-space text-sm"
                            />
                            
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                              />
                              <span className="text-xs text-muted-foreground font-space leading-relaxed">
                                I agree to the <span className="text-foreground font-medium underline underline-offset-4">Terms & Conditions</span>. Digital products are non-refundable.
                              </span>
                            </label>

                            <button
                              onClick={() => handleAction(selectedProduct._id)}
                              disabled={isDownloading}
                              className="w-full flex items-center justify-center gap-2 py-5 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                              {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : (selectedProduct.price) === "FREE" ? "Download Now" : "Grab Premium Access"}
                            </button>
                            
                            <p className="text-[10px] text-center text-muted-foreground font-medium">
                              {(selectedProduct.price) === "FREE" ? "No hidden costs. Just high-quality content." : "One-time payment. Lifetime updates."}
                            </p>
                          </div>
                       </div>

                       <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10">
                          <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <h4 className="font-bold text-sm font-space">Learning Outcomes</h4>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {getProductContent(selectedProduct).outcomes.map((item, i) => (
                              <div key={i} className="px-4 py-2 bg-white/50 dark:bg-black/50 rounded-xl text-xs font-medium font-space">
                                {item}
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
