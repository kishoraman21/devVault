export interface Chapter {
  id: string;
  title: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  learningObjectives: string[];
  content?: string;
}

export interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  chapters: Chapter[];
}

export const notebooksData: Subject[] = [
  {
    id: "sql",
    title: "SQL Mastery",
    slug: "sql",
    description: "From Basic Queries to Advanced Database Architecture and Optimization.",
    icon: "Database",
    chapters: [
      { 
        id: "sql-intro", 
        title: "Introduction to SQL", 
        slug: "introduction",
        level: "Beginner",
        duration: "10 min",
        learningObjectives: ["Understand relational databases", "Learn SQL history", "Set up your first environment"]
      },
      { 
        id: "sql-basics", 
        title: "Elementary Queries", 
        slug: "basic-queries",
        level: "Beginner",
        duration: "15 min",
        learningObjectives: ["Master SELECT statements", "Filter data with WHERE", "Sort results with ORDER BY"]
      },
      { 
        id: "sql-joins", 
        title: "Relational Joins", 
        slug: "joins",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["INNER vs OUTER joins", "Self joins", "Query optimization for joins"]
      },
      { 
        id: "sql-aggr", 
        title: "Aggregations & Grouping", 
        slug: "aggregations",
        level: "Intermediate",
        duration: "15 min",
        learningObjectives: ["Using SUM, AVG, COUNT", "Mastering GROUP BY", "Filtering groups with HAVING"]
      },
      { 
        id: "sql-subqueries", 
        title: "Subqueries & CTEs", 
        slug: "subqueries",
        level: "Advanced",
        duration: "25 min",
        learningObjectives: ["Nested queries", "Common Table Expressions", "Recursive queries"]
      },
    ],
  },
  {
    id: "mern",
    title: "MERN Stack Pro",
    slug: "mern",
    description: "Build scalable full-stack applications with MongoDB, Express, React, and Node.",
    icon: "Globe",
    chapters: [
      { 
        id: "mern-intro", 
        title: "Stack Architecture", 
        slug: "overview",
        level: "Beginner",
        duration: "12 min",
        learningObjectives: ["Learn how the 4 technologies interact", "Request-Response cycle", "Environment setup"]
      },
      { 
        id: "mern-mongo", 
        title: "MongoDB Schema Design", 
        slug: "mongodb",
        level: "Intermediate",
        duration: "25 min",
        learningObjectives: ["Document-based storage", "Collections and Models", "Mongoose implementation"]
      },
      { 
        id: "mern-backend", 
        title: "API Design with Express", 
        slug: "backend-setup",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["Routing architecture", "Middleware patterns", "Error handling"]
      },
      { 
        id: "mern-react", 
        title: "Advanced React State", 
        slug: "react-basics",
        level: "Intermediate",
        duration: "30 min",
        learningObjectives: ["Context API", "Custom Hooks", "Performance optimization"]
      },
      { 
        id: "mern-auth", 
        title: "JWT Authentication", 
        slug: "authentication",
        level: "Advanced",
        duration: "35 min",
        learningObjectives: ["Secure login flows", "Bcrypt password hashing", "Protected routes"]
      },
    ],
  },
  {
    id: "java",
    title: "Java Enterprise",
    slug: "java",
    description: "Master Java programming from basic syntax to enterprise design patterns.",
    icon: "Braces",
    chapters: [
      { 
        id: "java-intro", 
        title: "JDK & Environment", 
        slug: "basics",
        level: "Beginner",
        duration: "10 min",
        learningObjectives: ["JVM vs JRE vs JDK", "Compiling Java code", "Variable scopes"]
      },
      { 
        id: "java-oops", 
        title: "Core Java OOPs", 
        slug: "oops-java",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["Abstract classes", "Interface contracts", "Static vs Dynamic binding"]
      },
      { 
        id: "java-collections", 
        title: "Collections Framework", 
        slug: "collections",
        level: "Intermediate",
        duration: "25 min",
        learningObjectives: ["List, Set, and Map interfaces", "Generics in Java", "Streams API basics"]
      },
      { 
        id: "java-exceptions", 
        title: "Exception Handling", 
        slug: "exceptions",
        level: "Intermediate",
        duration: "15 min",
        learningObjectives: ["Try-Catch-Finally", "Custom Exceptions", "Checked vs Unchecked"]
      },
      { 
        id: "java-multithreading", 
        title: "Multithreading", 
        slug: "threads",
        level: "Advanced",
        duration: "30 min",
        learningObjectives: ["Thread Lifecycle", "Synchronization", "ExecutorService"]
      },
    ],
  },
  {
    id: "oops",
    title: "OOPs Architecture",
    slug: "oops",
    description: "Design robust software using Object-Oriented Principles and Design Patterns.",
    icon: "Code",
    chapters: [
      { 
        id: "oops-concepts", 
        title: "The 4 Pillars", 
        slug: "concepts",
        level: "Beginner",
        duration: "15 min",
        learningObjectives: ["Abstraction & Encapsulation", "Inheritance depth", "Understanding Polymorphism"]
      },
      { 
        id: "oops-solid", 
        title: "SOLID Principles", 
        slug: "solid",
        level: "Advanced",
        duration: "40 min",
        learningObjectives: ["Single Responsibility", "Open-Closed Principle", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"]
      },
      { 
        id: "oops-patterns", 
        title: "Design Patterns", 
        slug: "patterns",
        level: "Advanced",
        duration: "35 min",
        learningObjectives: ["Singleton Pattern", "Factory Method", "Observer Pattern"]
      },
      { 
        id: "oops-clean", 
        title: "Clean Code Practices", 
        slug: "clean-code",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["Naming conventions", "Don't Repeat Yourself (DRY)", "Function modularity"]
      },
    ],
  },
  {
    id: "c-programming",
    title: "C Systems Pro",
    slug: "c-programming",
    description: "Master low-level systems programming and memory management with C.",
    icon: "Cpu",
    chapters: [
      { 
        id: "c-intro", 
        title: "Architecture & Basics", 
        slug: "introduction",
        level: "Beginner",
        duration: "15 min",
        learningObjectives: ["Memory Layout", "Compilation Process", "Data Types & Sizes"]
      },
      { 
        id: "c-pointers", 
        title: "Mastering Pointers", 
        slug: "pointers",
        level: "Intermediate",
        duration: "30 min",
        learningObjectives: ["Pointer Arithmetic", "Pointer to Pointers", "Function Pointers"]
      },
      { 
        id: "c-memory", 
        title: "Memory Management", 
        slug: "memory",
        level: "Advanced",
        duration: "25 min",
        learningObjectives: ["Stack vs Heap", "Malloc/Free internals", "Memory Leaks & Valgrind"]
      },
      { 
        id: "c-structs", 
        title: "Data Structures in C", 
        slug: "structures",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["Struct Alignment", "Unions & Bitfields", "Linked List Implementation"]
      }
    ],
  },
  {
    id: "python",
    title: "Pythonic Excellence",
    slug: "python",
    description: "Write clean, efficient, and professional-grade Python code.",
    icon: "Terminal",
    chapters: [
      { 
        id: "py-basics", 
        title: "The Pythonic Way", 
        slug: "basics",
        level: "Beginner",
        duration: "12 min",
        learningObjectives: ["PEP 8 Style", "List Comprehensions", "Context Managers"]
      },
      { 
        id: "py-advanced", 
        title: "Advanced Features", 
        slug: "advanced-features",
        level: "Intermediate",
        duration: "35 min",
        learningObjectives: ["Decorators", "Generators & Iterators", "Metaclasses"]
      },
      { 
        id: "py-async", 
        title: "Concurrency with AsyncIO", 
        slug: "asyncio",
        level: "Advanced",
        duration: "30 min",
        learningObjectives: ["Event Loop", "Awaitable objects", "Concurrency vs Parallelism"]
      }
    ],
  },
  {
    id: "nodejs-express",
    title: "Node.js & Express",
    slug: "nodejs-express",
    description: "Build robust backend architectures with Node.js and the Express framework.",
    icon: "Server",
    chapters: [
      { 
        id: "node-intro", 
        title: "Node.js Internals", 
        slug: "internals",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["V8 Engine & Libuv", "Event Loop stages", "Buffer & Streams"]
      },
      { 
        id: "express-arch", 
        title: "Express Architecture", 
        slug: "architecture",
        level: "Beginner",
        duration: "15 min",
        learningObjectives: ["Middleware Flow", "Routing Strategies", "Error Handling"]
      },
      { 
        id: "node-security", 
        title: "Production Security", 
        slug: "security",
        level: "Advanced",
        duration: "30 min",
        learningObjectives: ["JWT Implementation", "Rate Limiting", "CORS & Helmet"]
      }
    ],
  },
  {
    id: "reactjs",
    title: "React.js Mastery",
    slug: "react-mastery",
    description: "Master modern React patterns, performance, and the Next.js ecosystem.",
    icon: "Atom",
    chapters: [
      { 
        id: "react-core", 
        title: "Reconciliation & Fiber", 
        slug: "core-concepts",
        level: "Advanced",
        duration: "30 min",
        learningObjectives: ["Virtual DOM internals", "Fiber Architecture", "Concurrent Rendering"]
      },
      { 
        id: "react-hooks", 
        title: "Advanced Hooks", 
        slug: "hooks-deep-dive",
        level: "Intermediate",
        duration: "25 min",
        learningObjectives: ["useMemo & useCallback", "Custom Hook Patterns", "State Management"]
      },
      { 
        id: "react-perf", 
        title: "Performance Tuning", 
        slug: "performance",
        level: "Advanced",
        duration: "20 min",
        learningObjectives: ["Code Splitting", "Profiling", "Server Components"]
      }
    ],
  },
  {
    id: "mongodb",
    title: "MongoDB Expert",
    slug: "mongodb-expert",
    description: "Master NoSQL document modeling and high-performance database operations.",
    icon: "Database",
    chapters: [
      { 
        id: "mongo-modeling", 
        title: "Data Modeling", 
        slug: "modeling",
        level: "Intermediate",
        duration: "20 min",
        learningObjectives: ["Embedding vs Referencing", "Schema Design Patterns", "GridFS"]
      },
      { 
        id: "mongo-agg", 
        title: "Aggregation Pipeline", 
        slug: "aggregation",
        level: "Advanced",
        duration: "35 min",
        learningObjectives: ["Pipeline Stages", "Optimization", "Lookup and GraphLookup"]
      },
      { 
        id: "mongo-scaling", 
        title: "Scaling & Transactions", 
        slug: "scaling",
        level: "Advanced",
        duration: "25 min",
        learningObjectives: ["Replication Sets", "Sharding Strategy", "ACID Transactions"]
      }
    ],
  },
];
