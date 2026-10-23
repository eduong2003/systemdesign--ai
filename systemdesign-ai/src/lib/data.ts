export type Problem = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  minutes: number;
  description: string;
  functional: string[];
  nonFunctional: string[];
  constraints: string[];
  hints: string[];
  topics: string[];
};
const entries: [
  string,
  string,
  Problem["difficulty"],
  number,
  string,
  string[],
  string[],
  string[],
][] = [
  [
    "url-shortener",
    "Design a URL Shortener",
    "Easy",
    35,
    "Turn long URLs into short, shareable links. Design the service behind billions of redirects.",
    [
      "Create unique short links",
      "Redirect links to their original URL",
      "Support expiration and custom aliases",
    ],
    [
      "Low-latency redirects",
      "Highly available reads",
      "Prevent collisions and malicious links",
    ],
    ["Caching", "SQL vs NoSQL", "Load Balancing"],
  ],
  [
    "rate-limiter",
    "Design a Rate Limiter",
    "Medium",
    45,
    "Protect APIs from traffic spikes while giving legitimate users a fair share of capacity.",
    [
      "Enforce per-user and per-IP quotas",
      "Return quota headers and retry times",
      "Support different endpoint policies",
    ],
    [
      "Make decisions in milliseconds",
      "Work across multiple application servers",
      "Define behavior when the limiter fails",
    ],
    ["Caching", "Consistent Hashing", "Horizontal vs Vertical Scaling"],
  ],
  [
    "chat-application",
    "Design a Chat Application",
    "Medium",
    50,
    "Build a real-time messaging platform that keeps conversations flowing across devices.",
    [
      "Send direct and group messages",
      "Store history and delivery receipts",
      "Reconnect and synchronize offline clients",
    ],
    [
      "Preserve ordering within conversations",
      "Deliver messages with low latency",
      "Handle disconnected users reliably",
    ],
    ["Message Queues", "Database Sharding", "Microservices"],
  ],
  [
    "notification-system",
    "Design a Notification System",
    "Medium",
    45,
    "Deliver timely notifications through email, push, and SMS without overwhelming your users.",
    [
      "Accept notification events",
      "Honor channel preferences",
      "Retry failures and deduplicate events",
    ],
    [
      "Absorb bursts of traffic",
      "Monitor delivery outcomes",
      "Prevent duplicate sends",
    ],
    ["Message Queues", "Microservices", "SQL vs NoSQL"],
  ],
  [
    "instagram",
    "Design Instagram",
    "Hard",
    60,
    "Design a photo-sharing platform with uploads, follows, and a personalized home feed.",
    [
      "Upload and view photos",
      "Follow accounts and browse a feed",
      "Like and comment on posts",
    ],
    [
      "Serve media efficiently worldwide",
      "Scale reads independently from writes",
      "Keep feeds fresh under high traffic",
    ],
    ["CDNs", "Database Sharding", "Caching"],
  ],
  [
    "youtube",
    "Design YouTube",
    "Hard",
    65,
    "Build a video platform that turns large uploads into smooth playback around the world.",
    [
      "Upload and transcode videos",
      "Stream multiple quality levels",
      "Search videos and record engagement",
    ],
    [
      "Minimize playback startup time",
      "Process large files asynchronously",
      "Handle viral traffic",
    ],
    ["CDNs", "Message Queues", "Microservices"],
  ],
  [
    "uber",
    "Design Uber",
    "Hard",
    65,
    "Match riders with nearby drivers while tracking trips and rapidly changing locations.",
    [
      "Find nearby drivers",
      "Match and manage trip requests",
      "Update locations and trip status",
    ],
    [
      "Keep location data fresh",
      "Avoid double assignment",
      "Remain available across regions",
    ],
    ["Database Sharding", "Message Queues", "Horizontal vs Vertical Scaling"],
  ],
  [
    "distributed-cache",
    "Design a Distributed Cache",
    "Hard",
    60,
    "Build a shared cache that distributes keys across machines and survives node failures.",
    [
      "Read, write, and delete keys",
      "Expire entries with TTLs",
      "Rebalance when nodes join or leave",
    ],
    [
      "Bound memory usage",
      "Keep operations fast",
      "Define consistency and failure behavior",
    ],
    ["Consistent Hashing", "CAP Theorem", "Caching"],
  ],
];
export const problems: Problem[] = entries.map(
  ([
    slug,
    title,
    difficulty,
    minutes,
    description,
    functional,
    nonFunctional,
    topics,
  ]) => ({
    slug,
    title,
    difficulty,
    minutes,
    description,
    functional,
    nonFunctional,
    topics,
    constraints: [
      "Assume 10 million daily active users; state your traffic and storage estimates.",
      "Plan for a 10× traffic spike and the failure of a single node.",
      "Explicitly document your consistency and availability choices.",
    ],
    hints: [
      "Start with the user journey and a minimal API contract.",
      "Estimate requests per second before picking infrastructure.",
      "Trace a request through your design and identify the first bottleneck.",
    ],
  }),
);
export type Topic = {
  slug: string;
  title: string;
  explanation: string;
  example: string;
  tradeoff: string;
};
const lessons: [string, string, string, string][] = [
  [
    "Load Balancing",
    "A load balancer spreads incoming requests across healthy servers. Health checks remove failed instances, while algorithms such as round robin or least connections decide where requests go.",
    "A URL shortener distributes redirects across multiple stateless API servers.",
    "Sticky sessions simplify stateful apps but can distribute traffic unevenly.",
  ],
  [
    "Caching",
    "A cache holds frequently accessed data closer to the caller. Cache-aside reads the cache first, retrieves missing data from the database, and populates the cache with a bounded TTL.",
    "Cache a popular short link so every redirect does not require a database query.",
    "Stale entries and cache stampedes require explicit invalidation and refill strategies.",
  ],
  [
    "Database Sharding",
    "Sharding splits a dataset across databases using a partition key. Each shard stores a subset of records and handles a subset of requests.",
    "Partition chat messages by conversation ID to keep a conversation on one shard.",
    "Cross-shard queries and moving hot partitions add operational complexity.",
  ],
  [
    "SQL vs NoSQL",
    "Relational databases provide structured schemas, joins, and transactions. NoSQL systems use document, key-value, or other models; their consistency and query capabilities differ by product.",
    "Store URL mappings in a relational table with a unique index, or in a key-value store for direct key lookups.",
    "Choose using access patterns and transaction needs; neither category is inherently more scalable.",
  ],
  [
    "Message Queues",
    "Queues decouple producers from consumers and buffer work. Consumers acknowledge processed messages; retries usually require idempotent handlers.",
    "A notification API enqueues work so email providers do not delay the user's request.",
    "At-least-once delivery can produce duplicates; queues also introduce processing delay.",
  ],
  [
    "CDNs",
    "Content delivery networks cache content at edge locations near users. Cache keys and TTLs determine what is shared and how long it is served.",
    "Serve Instagram images and YouTube video segments from edge locations.",
    "Invalidation and protecting private content require careful cache policies.",
  ],
  [
    "CAP Theorem",
    "During a network partition, a distributed system cannot guarantee both linearizable consistency and availability for every request. The choice applies to behavior during partitions.",
    "A cache may serve a stale value during a partition, while a payment ledger may reject a write.",
    "CAP does not mean choosing any two properties permanently; discuss specific failure scenarios.",
  ],
  [
    "Horizontal vs Vertical Scaling",
    "Vertical scaling adds resources to one machine. Horizontal scaling adds machines, requiring partitioning or distribution of work and often stateless application servers.",
    "Add API replicas behind a load balancer when redirect traffic increases.",
    "More machines introduce coordination and deployment complexity; bigger machines have limits.",
  ],
  [
    "Consistent Hashing",
    "Consistent hashing maps keys and nodes into the same hash space. Adding or removing a node moves a fraction of keys; virtual nodes help balance distribution.",
    "A distributed cache maps a key to a node on a hash ring.",
    "Hot keys still need replication or another mitigation; hashing alone does not solve them.",
  ],
  [
    "Microservices",
    "Microservices split an application into independently deployable services around business capabilities, communicating through APIs or events.",
    "Separate video upload, transcoding, and playback services when their scaling needs diverge.",
    "Network calls, observability, and distributed transactions make operations harder.",
  ],
];
export const topics: Topic[] = lessons.map(
  ([title, explanation, example, tradeoff]) => ({
    slug: title.toLowerCase().replaceAll(" ", "-"),
    title,
    explanation,
    example,
    tradeoff,
  }),
);
