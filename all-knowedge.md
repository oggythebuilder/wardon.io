src/
├── app/
│   ├── api/                      # Global API Routes
│   │   ├── http-headers/route.ts # HTTP Scanning Logic
│   │   ├── dns/route.ts          # DNS Lookup Logic
│   │   └── whois/route.ts        # Whois Logic
│   ├── (tools)/                  # All Recon Modules
│   │   ├── http-headers/
│   │   │   ├── page.tsx          # Main Tool Page
│   │   │   └── [domain]/page.tsx # Result Analysis Page
│   │   ├── dns-records/
│   │   │   └── page.tsx
│   │   └── ... (other tools)
│   ├── layout.tsx                # Shared Navbar & Footer
│   └── page.tsx                  # "The Eye" (Homepage)
├── components/
│   ├── ui/                       # Reusable Minimalist UI
│   │   ├── Skeleton.tsx          # Loading States
│   │   ├── CyberGrid.tsx         # Background Animation
│   │   └── StatusBanner.tsx      # A+ / F Grade display
│   └── layout/
│       └── Navbar.tsx            # Modern Responsive Navbar
├── lib/
│   ├── utils.ts                  # Tailwind Class Merger
│   └── scanners/                 # Core Business Logic (Pure JS/TS)
│       ├── http-logic.ts         # Header Analysis functions
│       └── dns-logic.ts          # Record sorting functions
└── hooks/                        # Custom React Hooks
    └── useScanner.ts             # Data fetching state manager
