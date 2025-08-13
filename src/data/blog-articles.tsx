export type ArticleContent = {
  slug: string;
  content: JSX.Element;
};

export const BLOG_ARTICLES: ArticleContent[] = [
  {
    slug: "monolith-to-microservices-laravel-react",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Challenge</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Legacy monolithic applications often become bottlenecks in modern software development. 
          They're difficult to scale, challenging to maintain, and slow to deploy. Our client faced 
          all these challenges with their 10-year-old monolithic application serving millions of users.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Approach</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          We adopted the Strangler Fig pattern to gradually decompose the monolith into microservices. 
          This approach allowed us to migrate functionality piece by piece without disrupting the 
          existing system.
        </p>
        
        <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 1: Identify Bounded Contexts</h3>
        <p className="text-white/70 leading-relaxed mb-6">
          We started by mapping out the different domains within the monolith. User management, 
          payment processing, and inventory management emerged as clear candidates for extraction.
        </p>
        
        <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 2: Extract User Service</h3>
        <p className="text-white/70 leading-relaxed mb-6">
          The user service was our first extraction. We implemented an API gateway to route 
          authentication requests to the new service while keeping other functionalities in the monolith.
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// API Gateway routing configuration
{
  "/api/auth/*": "http://user-service:3001",
  "/api/users/*": "http://user-service:3001",
  "/api/*": "http://legacy-monolith:3000"
}`}</code>
        </pre>
        
        <h3 className="text-white text-xl font-semibold mt-6 mb-3">Phase 3: Implement Event-Driven Communication</h3>
        <p className="text-white/70 leading-relaxed mb-6">
          We introduced Apache Kafka for asynchronous communication between services, ensuring 
          data consistency across the distributed system.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Results</h2>
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>70% reduction in deployment time</li>
          <li>Independent scaling of critical services</li>
          <li>Improved fault isolation and system resilience</li>
          <li>Enabled parallel development across multiple teams</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          The journey from monolith to microservices is not just a technical transformation—it's 
          an organizational one. Success requires careful planning, gradual migration, and strong 
          communication between teams.
        </p>
      </>
    )
  },
  {
    slug: "cicd-github-actions-docker-k8s",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Modern CI/CD Pipeline Architecture</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Building a robust CI/CD pipeline is crucial for modern web applications. This article explores 
          how to create an automated pipeline using GitHub Actions, Docker, and Kubernetes that enables 
          safe, frequent deployments with build caching and preview environments.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">GitHub Actions Workflow</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Our pipeline starts with GitHub Actions, triggered on every push to the main branch and pull requests. 
          Here's the core workflow structure:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run lint
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: docker/setup-buildx-action@v2
      - uses: docker/build-push-action@v4
        with:
          push: true
          tags: \${{ github.sha }}
          cache-from: type=registry
          cache-to: type=inline`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Docker Multi-Stage Builds</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          We use multi-stage Docker builds to optimize image size and leverage build caching:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Kubernetes Deployment</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          For deployment, we use Kubernetes with GitOps principles via ArgoCD. Every merge to main 
          triggers an automatic deployment to production:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: app
        image: registry/app:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Preview Environments</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Every pull request automatically creates a preview environment using Kubernetes namespaces. 
          This allows stakeholders to test changes before merging:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Automatic SSL certificates via cert-manager</li>
          <li>Unique URLs like pr-123.preview.domain.com</li>
          <li>Automatic cleanup after PR merge</li>
          <li>Database seeding with test data</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Build Caching Strategies</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          We implement multiple caching layers to speed up builds:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Docker layer caching with BuildKit</li>
          <li>NPM dependency caching in GitHub Actions</li>
          <li>Webpack persistent cache for faster rebuilds</li>
          <li>Container registry cache for base images</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Key Metrics</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          After implementing this pipeline, we achieved:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Average build time: 3 minutes (down from 15)</li>
          <li>Deployment frequency: 20+ per day</li>
          <li>Mean time to recovery: &lt; 5 minutes</li>
          <li>Change failure rate: &lt; 2%</li>
        </ul>
      </>
    )
  },
  {
    slug: "security-first-patterns-full-stack-devops",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Security-First Development</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Modern applications face sophisticated threats. This guide covers essential security patterns 
          including threat modeling, secrets management, and implementing least-privilege access that 
          scales with your team.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Threat Modeling with STRIDE</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          We use the STRIDE methodology to identify and mitigate threats systematically:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li><strong>Spoofing:</strong> Multi-factor authentication, JWT with short expiry</li>
          <li><strong>Tampering:</strong> Input validation, parameterized queries</li>
          <li><strong>Repudiation:</strong> Comprehensive audit logging, immutable logs</li>
          <li><strong>Information Disclosure:</strong> Encryption at rest and in transit</li>
          <li><strong>Denial of Service:</strong> Rate limiting, DDoS protection</li>
          <li><strong>Elevation of Privilege:</strong> RBAC, principle of least privilege</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Secrets Management</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Never store secrets in code. We use HashiCorp Vault for centralized secrets management:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Vault configuration
path "secret/data/app/*" {
  capabilities = ["read", "list"]
}

# Application integration
const vault = require('node-vault')({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN
});

async function getSecret(path) {
  const { data } = await vault.read(\`secret/data/\${path}\`);
  return data.data;
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Container Security</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Securing containers requires multiple layers of defense:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Dockerfile security best practices
FROM node:18-alpine AS builder
# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy only necessary files
COPY --chown=nodejs:nodejs package*.json ./
RUN npm ci --only=production

# Security scanning in CI
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'docker.io/my-app:latest'
    severity: 'CRITICAL,HIGH'`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">API Security</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implementing defense in depth for API endpoints:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: 'Too many requests'
});

// Input validation with Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required()
});

// SQL injection prevention
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId], callback);`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Infrastructure as Code Security</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Using tools like Terraform with security scanning:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# tfsec for static analysis
resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
  
  # Enable encryption
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  
  # Enable versioning
  versioning {
    enabled = true
  }
  
  # Block public access
  public_access_block {
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Security Monitoring</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Continuous monitoring and alerting for security events:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>SIEM integration with Elastic Stack</li>
          <li>Real-time alerting for suspicious activities</li>
          <li>Automated incident response playbooks</li>
          <li>Regular security audits and penetration testing</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Compliance and Governance</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Maintaining compliance with industry standards:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>GDPR compliance with data encryption and right to deletion</li>
          <li>SOC 2 Type II certification process</li>
          <li>PCI DSS for payment processing</li>
          <li>Regular security training for development teams</li>
        </ul>
      </>
    )
  },
  {
    slug: "react-performance-profiling",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">React Performance Deep Dive</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          React applications can suffer from performance issues as they grow. This guide covers profiling 
          techniques, memoization strategies, and Suspense implementation to deliver smooth user experiences 
          without premature optimization.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Profiling with React DevTools</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Start by identifying performance bottlenecks using the React DevTools Profiler:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Enable profiling in production builds
const isProfiling = window.location.search.includes('profile');

ReactDOM.render(
  isProfiling ? (
    <React.Profiler id="App" onRender={onRenderCallback}>
      <App />
    </React.Profiler>
  ) : (
    <App />
  ),
  document.getElementById('root')
);

function onRenderCallback(id, phase, actualDuration) {
  console.log(\`\${id} (\${phase}) took \${actualDuration}ms\`);
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Strategic Memoization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Use React.memo, useMemo, and useCallback strategically, not everywhere:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Expensive computation - good candidate for useMemo
const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.reduce((acc, item) => {
      // Complex calculation
      return acc + complexCalculation(item);
    }, 0);
  }, [data]);
  
  return <div>{processedData}</div>;
};

// Stable references for child components
const ParentComponent = ({ items }) => {
  const handleClick = useCallback((id) => {
    console.log(\`Clicked \${id}\`);
  }, []); // Empty deps = stable forever
  
  return items.map(item => (
    <ChildComponent 
      key={item.id}
      onClick={handleClick}
      {...item}
    />
  ));
};

// Prevent unnecessary re-renders
const ChildComponent = React.memo(({ onClick, ...props }) => {
  return <div onClick={() => onClick(props.id)}>{props.name}</div>;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.id === nextProps.id;
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Code Splitting with Suspense</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Reduce initial bundle size with dynamic imports and React.lazy:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Route-based code splitting
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Component-level splitting for heavy libraries
const ChartComponent = lazy(() => 
  import('./ChartComponent')
    .then(module => ({ default: module.ChartComponent }))
);`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Virtual Scrolling</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Handle large lists efficiently with react-window:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`import { FixedSizeList } from 'react-window';

const BigList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">State Management Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Prevent unnecessary re-renders with proper state structure:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Bad: Everything re-renders on any change
const [state, setState] = useState({
  user: {},
  posts: [],
  comments: []
});

// Good: Separate concerns
const [user, setUser] = useState({});
const [posts, setPosts] = useState([]);
const [comments, setComments] = useState([]);

// Better: Use a state management library
// Zustand example with slices
const useStore = create((set) => ({
  user: {},
  posts: [],
  setUser: (user) => set({ user }),
  setPosts: (posts) => set({ posts })
}));

// Component only re-renders when posts change
const PostList = () => {
  const posts = useStore(state => state.posts);
  return <>{posts.map(renderPost)}</>;
};`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Image Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Optimize images for better performance:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Lazy loading with Intersection Observer
const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [src]);
  
  return (
    <img 
      ref={imgRef}
      src={imageSrc || 'placeholder.jpg'}
      alt={alt}
      loading="lazy"
    />
  );
};`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Performance Metrics</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          After applying these optimizations:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>First Contentful Paint: &lt; 1.5s</li>
          <li>Time to Interactive: &lt; 3.5s</li>
          <li>Lighthouse Performance Score: 95+</li>
          <li>Bundle size reduced by 60%</li>
          <li>Re-render count decreased by 80%</li>
        </ul>
      </>
    )
  },
  {
    slug: "docker-best-practices-production",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Docker Production Best Practices</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Docker has revolutionized application deployment, but production environments demand careful 
          consideration of security, performance, and maintainability. This guide covers essential 
          practices for production-ready Docker deployments.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Multi-Stage Builds for Smaller Images</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Reduce attack surface and deployment time with optimized images:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Multi-stage build for Node.js application
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Security: Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=deps --chown=nodejs:nodejs /app/node_modules ./node_modules

USER nodejs
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node healthcheck.js

CMD ["node", "dist/index.js"]`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Layer Caching Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Order Dockerfile instructions to maximize cache usage:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Good: Dependencies change less frequently
COPY package*.json ./
RUN npm ci
COPY . .

# Bad: Invalidates cache on any file change
COPY . .
RUN npm ci

# Use .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Security Hardening</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement defense in depth for container security:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Use specific versions, not latest
FROM node:18.17.1-alpine3.18

# Scan for vulnerabilities
RUN apk add --no-cache dumb-init
RUN npm audit fix

# Drop capabilities
RUN setcap -r /usr/local/bin/node

# Read-only root filesystem
FROM scratch
COPY --from=builder /app /app
USER 1001

# docker-compose.yml security options
services:
  app:
    image: myapp:latest
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    read_only: true
    tmpfs:
      - /tmp`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Resource Limits</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Prevent resource exhaustion and ensure fair resource allocation:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# docker-compose.yml
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    
# Kubernetes equivalent
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Logging and Monitoring</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Centralized logging and monitoring for containerized applications:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Structured logging to stdout
const winston = require('winston');
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

# Docker logging configuration
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "labels": "environment,service",
    "env": "VERSION,NODE_ENV"
  }
}

# Ship logs to ELK stack
docker run -d \\
  --log-driver=syslog \\
  --log-opt syslog-address=tcp://logstash:5000 \\
  myapp:latest`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Graceful Shutdown</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Handle signals properly for zero-downtime deployments:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Signal handling in Node.js
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown(signal) {
  console.log(\`Received \${signal}, starting graceful shutdown\`);
  
  // Stop accepting new connections
  server.close(() => {
    console.log('HTTP server closed');
  });
  
  // Close database connections
  await db.close();
  
  // Wait for ongoing requests to complete
  setTimeout(() => {
    process.exit(0);
  }, 10000);
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Image Registry Best Practices</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Secure and efficient image distribution:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Use private registries for proprietary code</li>
          <li>Sign images with Docker Content Trust</li>
          <li>Implement vulnerability scanning in CI/CD</li>
          <li>Regular cleanup of unused images</li>
          <li>Use semantic versioning for tags</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Performance Impact</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Results after implementing these practices:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Image size reduced from 1.2GB to 85MB</li>
          <li>Build time decreased by 70% with caching</li>
          <li>Container startup time &lt; 2 seconds</li>
          <li>Zero security vulnerabilities in base images</li>
          <li>100% graceful shutdowns during deployments</li>
        </ul>
      </>
    )
  },
  {
    slug: "laravel-scaling-strategies",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Scaling Laravel to Millions of Requests</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Laravel is excellent for rapid development, but scaling it requires careful architecture decisions. 
          This guide covers queue optimization, caching strategies, and database sharding for high-throughput 
          Laravel applications.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Queue Architecture with Horizon</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement robust background job processing with Laravel Horizon and Redis:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// config/horizon.php
'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['critical', 'high', 'default', 'low'],
            'balance' => 'auto',
            'maxProcesses' => 10,
            'minProcesses' => 1,
            'balanceMaxShift' => 5,
            'balanceCooldown' => 1,
            'memory' => 128,
            'tries' => 3,
            'timeout' => 60,
        ],
        'supervisor-2' => [
            'connection' => 'redis',
            'queue' => ['emails', 'notifications'],
            'balance' => 'simple',
            'processes' => 5,
            'memory' => 128,
        ],
    ],
],

// Job implementation with rate limiting
class ProcessPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    public $tries = 3;
    public $maxExceptions = 2;
    public $timeout = 120;
    
    public function middleware()
    {
        return [
            new RateLimited('payments'),
            new WithoutOverlapping($this->order->id)
        ];
    }
    
    public function retryUntil()
    {
        return now()->addMinutes(10);
    }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Multi-Layer Caching Strategy</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement caching at multiple levels for optimal performance:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// 1. Database Query Caching
$users = Cache::remember('users:active', 3600, function () {
    return User::active()
        ->with(['profile', 'settings'])
        ->get();
});

// 2. HTTP Response Caching
Route::middleware('cache.headers:public;max_age=3600')->group(function () {
    Route::get('/api/products', [ProductController::class, 'index']);
});

// 3. View Fragment Caching
@cache('products.featured', 3600)
    @foreach($featuredProducts as $product)
        <x-product-card :product="$product" />
    @endforeach
@endcache

// 4. Redis Object Caching
class ProductRepository
{
    public function find($id)
    {
        return Cache::tags(['products'])->remember(
            "product:{$id}",
            3600,
            fn() => Product::with('reviews')->find($id)
        );
    }
    
    public function flush()
    {
        Cache::tags(['products'])->flush();
    }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Database Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Scale database operations with read replicas and sharding:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// config/database.php - Read/Write splitting
'mysql' => [
    'read' => [
        'host' => [
            '192.168.1.1',
            '192.168.1.2',
        ],
    ],
    'write' => [
        'host' => ['196.168.1.3'],
    ],
    'sticky' => true,
],

// Horizontal sharding by tenant
class ShardManager
{
    public function getConnection($tenantId)
    {
        $shard = $this->calculateShard($tenantId);
        return DB::connection("mysql_shard_{$shard}");
    }
    
    private function calculateShard($tenantId)
    {
        return $tenantId % config('database.shards', 4);
    }
}

// Efficient pagination for large datasets
$users = User::orderBy('id')
    ->cursorPaginate(50);
    
// Chunking for batch operations
User::chunk(1000, function ($users) {
    foreach ($users as $user) {
        ProcessUser::dispatch($user);
    }
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">API Rate Limiting</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Protect your API from abuse with intelligent rate limiting:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// app/Providers/RouteServiceProvider.php
RateLimiter::for('api', function (Request $request) {
    $user = $request->user();
    
    return $user
        ? Limit::perMinute($user->rate_limit ?? 60)->by($user->id)
        : Limit::perMinute(20)->by($request->ip());
});

// Advanced rate limiting with Redis
class ThrottleRequests
{
    public function handle($request, $next, $maxAttempts = 60)
    {
        $key = $this->resolveRequestSignature($request);
        
        if (Redis::get("throttle:{$key}:banned")) {
            return response()->json(['error' => 'Too many requests'], 429);
        }
        
        $attempts = Redis::incr("throttle:{$key}");
        
        if ($attempts === 1) {
            Redis::expire("throttle:{$key}", 60);
        }
        
        if ($attempts > $maxAttempts) {
            Redis::setex("throttle:{$key}:banned", 3600, 1);
            return response()->json(['error' => 'Rate limit exceeded'], 429);
        }
        
        return $next($request);
    }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Octane for High Performance</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Boost performance with Laravel Octane and Swoole:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// config/octane.php
'server' => env('OCTANE_SERVER', 'swoole'),
'swoole' => [
    'options' => [
        'worker_num' => env('SWOOLE_WORKERS', 'auto'),
        'task_worker_num' => env('SWOOLE_TASK_WORKERS', 'auto'),
        'max_request' => 1000,
        'enable_coroutine' => true,
        'send_yield' => true,
        'reactor_num' => env('SWOOLE_REACTORS', 'auto'),
    ],
],

// Concurrent tasks with Octane
use Laravel\\Octane\\Facades\\Octane;

[$users, $posts, $revenue] = Octane::concurrently([
    fn () => User::count(),
    fn () => Post::published()->count(),
    fn () => Order::sum('total'),
]);

// Table-based caching in memory
Cache::store('octane')->put('settings', $settings);`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Monitoring and Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Track performance metrics with Telescope and custom monitoring:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Custom performance monitoring
class PerformanceMiddleware
{
    public function handle($request, $next)
    {
        $start = microtime(true);
        
        $response = $next($request);
        
        $duration = (microtime(true) - $start) * 1000;
        
        if ($duration > 1000) {
            Log::warning('Slow request', [
                'url' => $request->fullUrl(),
                'duration' => $duration,
                'user_id' => $request->user()?->id,
            ]);
        }
        
        StatsD::timing('api.request.duration', $duration);
        
        return $response;
    }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Performance Results</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          After implementing these optimizations:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Request throughput: 10,000+ req/s with Octane</li>
          <li>Average response time: &lt; 50ms</li>
          <li>Queue processing: 1M+ jobs/hour</li>
          <li>Database connections reduced by 80%</li>
          <li>Cache hit ratio: 95%+</li>
        </ul>
      </>
    )
  },
  {
    slug: "proxmox-homelab-setup",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Enterprise Homelab with Proxmox VE</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Proxmox Virtual Environment provides enterprise-grade virtualization for your homelab. This guide 
          covers high availability setup, backup strategies, and network configuration for a production-like 
          environment at home.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Initial Cluster Setup</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Configure a 3-node Proxmox cluster for high availability:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Node 1: Create cluster
pvecm create homelab-cluster

# Node 2 & 3: Join cluster
pvecm add 192.168.1.100

# Verify cluster status
pvecm status

# Configure Corosync for better performance
# /etc/pve/corosync.conf
totem {
  version: 2
  cluster_name: homelab-cluster
  transport: knet
  crypto_cipher: aes256
  crypto_hash: sha256
}

# Enable HA for critical VMs
ha-manager add vm:100 --state started --max_restart 3
ha-manager set vm:100 --migrate_speed 100M`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Storage Configuration</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Set up ZFS for data integrity and performance:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Create ZFS pool with SSD cache
zpool create -f -o ashift=12 tank \\
  raidz2 /dev/sda /dev/sdb /dev/sdc /dev/sdd \\
  cache /dev/nvme0n1 \\
  log mirror /dev/nvme1n1 /dev/nvme2n1

# Configure ZFS datasets
zfs create tank/vms
zfs set compression=lz4 tank/vms
zfs set atime=off tank/vms
zfs set xattr=sa tank/vms

# Add to Proxmox storage
pvesm add zfspool vm-storage --pool tank/vms \\
  --content images,rootdir --nodes pve1,pve2,pve3

# NFS share for ISO images
pvesm add nfs iso-storage --server 192.168.1.50 \\
  --export /volume1/proxmox-iso --content iso,vztmpl`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Network Architecture</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement VLANs and SDN for network isolation:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# /etc/network/interfaces
auto lo
iface lo inet loopback

# Physical interfaces
auto eno1
iface eno1 inet manual

auto eno2
iface eno2 inet manual

# Bond for redundancy
auto bond0
iface bond0 inet manual
    bond-slaves eno1 eno2
    bond-miimon 100
    bond-mode active-backup

# Management bridge
auto vmbr0
iface vmbr0 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
    bridge-ports bond0
    bridge-stp off
    bridge-fd 0

# VLAN-aware bridge for VMs
auto vmbr1
iface vmbr1 inet manual
    bridge-ports bond0
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
    bridge-vids 10-50

# Storage network (10GbE)
auto vmbr2
iface vmbr2 inet static
    address 10.0.0.1/24
    bridge-ports eno3
    bridge-stp off
    bridge-fd 0`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Automated Backups</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Configure Proxmox Backup Server (PBS) for incremental backups:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Add PBS storage
pvesm add pbs backup-server --server 192.168.1.200 \\
  --datastore homelab-backups \\
  --username backup@pbs \\
  --password-file /etc/pve/priv/pbs-password \\
  --fingerprint XX:XX:XX:XX

# Backup job configuration
# /etc/pve/vzdump.cron
0 2 * * * root vzdump --all --quiet --mode snapshot \\
  --storage backup-server \\
  --mailnotification failure \\
  --mailto admin@homelab.local \\
  --compress zstd \\
  --notes-template "\{\{guestname\}\} backup \{\{vmid\}\}"

# Retention policy
pvesm set backup-server --prune-backups \\
  keep-daily=7,keep-weekly=4,keep-monthly=12

# Verify backups
proxmox-backup-client list --repository backup-server:homelab-backups`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">VM Templates and Cloud-Init</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Automate VM deployment with templates:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Create Ubuntu template
qm create 9000 --name ubuntu-template --memory 2048 \\
  --cores 2 --net0 virtio,bridge=vmbr0

# Import cloud image
qm importdisk 9000 ubuntu-22.04-cloudimg-amd64.img vm-storage

# Configure hardware
qm set 9000 --scsihw virtio-scsi-pci \\
  --scsi0 vm-storage:vm-9000-disk-0 \\
  --ide2 vm-storage:cloudinit \\
  --boot c --bootdisk scsi0 \\
  --serial0 socket --vga serial0 \\
  --agent enabled=1

# Cloud-init settings
qm set 9000 --ipconfig0 ip=dhcp \\
  --ciuser admin \\
  --sshkeys ~/.ssh/id_rsa.pub

# Convert to template
qm template 9000

# Deploy from template
qm clone 9000 100 --name webserver1 --full
qm set 100 --ipconfig0 ip=192.168.1.110/24,gw=192.168.1.1
qm start 100`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Monitoring with InfluxDB + Grafana</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Set up comprehensive monitoring for your infrastructure:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Install metrics collector
apt install pve-metricserver

# Configure InfluxDB output
# /etc/pve/status.cfg
influxdb:
    server 192.168.1.201
    port 8086
    database proxmox
    username proxmox
    password secretpass

# Grafana dashboard queries
SELECT mean("cpu") FROM "system" 
WHERE "host" =~ /^$host$/ 
GROUP BY time($interval)

# Alert rules
alert: HighCPUUsage
expr: proxmox_cpu_usage > 80
for: 5m
annotations:
  summary: "High CPU usage on \{\{ $labels.host \}\}"`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Security Hardening</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Secure your Proxmox installation:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Two-factor authentication
pveum user modify root@pam --tfa type=totp

# Firewall rules
pve-firewall enable

# /etc/pve/firewall/cluster.fw
[OPTIONS]
enable: 1
policy_in: DROP
policy_out: ACCEPT

[RULES]
IN ACCEPT -source 192.168.1.0/24 -p tcp -dport 8006 # Web UI
IN ACCEPT -source 192.168.1.0/24 -p tcp -dport 22 # SSH
IN ACCEPT -p tcp -dport 5900:5999 # VNC
IN DROP # Drop everything else

# Fail2ban for SSH
apt install fail2ban
systemctl enable fail2ban`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Performance Tuning</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Optimize Proxmox for maximum performance:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>CPU governor set to performance mode</li>
          <li>NUMA awareness for multi-socket systems</li>
          <li>SR-IOV for network performance</li>
          <li>PCIe passthrough for GPUs</li>
          <li>Hugepages for memory optimization</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Lab Statistics</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Current homelab performance metrics:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>50+ VMs and containers running</li>
          <li>99.9% uptime over 6 months</li>
          <li>Automated failover in &lt; 2 minutes</li>
          <li>10Gbps storage network throughput</li>
          <li>Daily incremental backups with deduplication</li>
        </ul>
      </>
    )
  },
  {
    slug: "typescript-advanced-patterns",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Advanced TypeScript Patterns</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          TypeScript's type system is incredibly powerful. This guide explores advanced patterns including 
          conditional types, template literal types, and type-safe API design that will make your code 
          more maintainable and catch bugs at compile time.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Conditional Types and Type Guards</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Create types that adapt based on conditions:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Conditional types
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? true : false;

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;
type StringArrayElement = ElementType<string[]>; // string

// Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object 
    ? DeepReadonly<T[K]> 
    : T[K];
};

// Type guards with predicates
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  );
}

// Discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: Error };

function processResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data); // T is available
  } else {
    console.error(result.error); // Error is available
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Template Literal Types</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Create dynamic type-safe string patterns:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Route patterns
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = \`/api/\${string}\`;

type APIEndpoint = \`\${HTTPMethod} \${Route}\`;
// Valid: "GET /api/users", "POST /api/products"

// CSS units
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type CSSValue = \`\${number}\${CSSUnit}\`;

function setWidth(value: CSSValue) {
  element.style.width = value;
}
setWidth('100px'); // ✓
setWidth('2rem');  // ✓
setWidth('100');   // ✗ Error

// Event handler types
type EventHandlerName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickHandler = EventHandlerName<'click'>; // "onClick"

// Dot notation paths
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? \`\${K}\` | \`\${K}.\${Path<T[K]>}\`
          : K
        : never;
    }[keyof T]
  : never;

interface User {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type UserPath = Path<User>; 
// "name" | "address" | "address.street" | "address.city"`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Advanced Generics</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Build flexible, reusable type constructs:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Mapped types with generics
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Conditional type distribution
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>;
// string[] | number[]

// Higher-order type functions
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

// Recursive types
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object 
    ? DeepPartial<T[K]> 
    : T[K];
};

// Variadic tuple types
type Concat<T extends any[], U extends any[]> = [...T, ...U];
type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Type-Safe API Client</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Build a fully type-safe API client:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// API schema definition
interface APISchema {
  '/users': {
    GET: {
      params: { page?: number; limit?: number };
      response: User[];
    };
    POST: {
      body: CreateUserDTO;
      response: User;
    };
  };
  '/users/:id': {
    GET: {
      params: { id: string };
      response: User;
    };
    PUT: {
      params: { id: string };
      body: UpdateUserDTO;
      response: User;
    };
  };
}

// Type-safe client
class TypedAPIClient<Schema> {
  async request<
    Path extends keyof Schema,
    Method extends keyof Schema[Path]
  >(
    path: Path,
    method: Method,
    options?: Schema[Path][Method] extends { params?: infer P } 
      ? { params?: P } 
      : {} &
        Schema[Path][Method] extends { body?: infer B } 
          ? { body?: B } 
          : {}
  ): Promise<
    Schema[Path][Method] extends { response: infer R } ? R : void
  > {
    // Implementation
    const response = await fetch(path as string, {
      method: method as string,
      body: JSON.stringify(options?.body),
    });
    return response.json();
  }
}

// Usage
const api = new TypedAPIClient<APISchema>();

// Fully typed!
const users = await api.request('/users', 'GET', {
  params: { page: 1, limit: 10 }
});

const newUser = await api.request('/users', 'POST', {
  body: { name: 'John', email: 'john@example.com' }
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Builder Pattern with Type Safety</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement a type-safe builder pattern:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Type-safe query builder
class QueryBuilder<T = {}> {
  private query: T;
  
  constructor(query: T = {} as T) {
    this.query = query;
  }
  
  select<K extends string>(
    ...fields: K[]
  ): QueryBuilder<T & { select: K[] }> {
    return new QueryBuilder({
      ...this.query,
      select: fields
    });
  }
  
  where<W>(
    conditions: W
  ): QueryBuilder<T & { where: W }> {
    return new QueryBuilder({
      ...this.query,
      where: conditions
    });
  }
  
  orderBy<O extends string>(
    field: O,
    direction: 'ASC' | 'DESC' = 'ASC'
  ): QueryBuilder<T & { orderBy: { field: O; direction: string } }> {
    return new QueryBuilder({
      ...this.query,
      orderBy: { field, direction }
    });
  }
  
  build(): T {
    return this.query;
  }
}

// Usage - all typed!
const query = new QueryBuilder()
  .select('id', 'name', 'email')
  .where({ active: true })
  .orderBy('createdAt', 'DESC')
  .build();
  
// query type is inferred as:
// {
//   select: ('id' | 'name' | 'email')[];
//   where: { active: boolean };
//   orderBy: { field: 'createdAt'; direction: string };
// }`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Type Branded Types</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Create nominal types for better type safety:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Branded types
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, 'UserId'>;
type ProductId = Brand<string, 'ProductId'>;
type Email = Brand<string, 'Email'>;

// Helper functions
function createUserId(id: string): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  return email as Email;
}

// Usage prevents mixing types
function getUser(id: UserId) { /* ... */ }
function getProduct(id: ProductId) { /* ... */ }

const userId = createUserId('user-123');
const productId = createProductId('prod-456');

getUser(userId);    // ✓
getUser(productId); // ✗ Error: Type 'ProductId' is not assignable to 'UserId'`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Benefits</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Using these advanced patterns provides:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Compile-time bug detection</li>
          <li>Better IDE autocomplete and IntelliSense</li>
          <li>Self-documenting code</li>
          <li>Easier refactoring with confidence</li>
          <li>Reduced runtime errors by 90%+</li>
        </ul>
      </>
    )
  },
  {
    slug: "k8s-cost-optimization",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Kubernetes Cost Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Kubernetes makes scaling easy, but costs can spiral quickly. This guide covers practical strategies 
          for reducing cloud spend including resource requests optimization, Horizontal Pod Autoscaler tuning, 
          and leveraging spot instances while maintaining SLAs.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Right-Sizing Resource Requests</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Analyze actual usage and optimize resource requests:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Install Kubernetes Resource Report
kubectl apply -f https://github.com/hjacobs/kube-resource-report/releases/latest/download/deployment.yaml

# Get resource recommendations with VPA
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Off"  # Just recommendations
    
# Check recommendations
kubectl describe vpa app-vpa

# Optimized deployment based on VPA
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        resources:
          requests:
            memory: "256Mi"  # Was 1Gi
            cpu: "100m"      # Was 500m
          limits:
            memory: "512Mi"  # Was 2Gi
            cpu: "500m"      # Was 1000m`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Horizontal Pod Autoscaler Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Configure HPA for cost-effective scaling:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Advanced HPA with multiple metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
      - type: Pods
        value: 2
        periodSeconds: 60
      selectPolicy: Min
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
      - type: Pods
        value: 4
        periodSeconds: 30
      selectPolicy: Max`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Spot Instance Integration</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Use spot instances for non-critical workloads:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# EKS with Spot instances
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: cost-optimized-cluster
  region: us-west-2

nodeGroups:
  - name: on-demand-critical
    instanceType: t3.medium
    desiredCapacity: 2
    labels:
      workload: critical
    taints:
      - key: critical
        value: "true"
        effect: NoSchedule
        
managedNodeGroups:
  - name: spot-workers
    instanceTypes: ["t3.medium", "t3a.medium", "t2.medium"]
    spot: true
    desiredCapacity: 3
    minSize: 1
    maxSize: 10
    labels:
      workload: spot
      lifecycle: spot
    taints:
      - key: spot
        value: "true"
        effect: NoSchedule

# Deployment with spot tolerance
apiVersion: apps/v1
kind: Deployment
metadata:
  name: batch-processor
spec:
  template:
    spec:
      nodeSelector:
        lifecycle: spot
      tolerations:
      - key: spot
        operator: Equal
        value: "true"
        effect: NoSchedule
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              topologyKey: kubernetes.io/hostname`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Cluster Autoscaler Configuration</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Optimize cluster autoscaler for cost:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Cluster Autoscaler deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
        name: cluster-autoscaler
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste  # Cost optimization
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
        - --scale-down-enabled=true
        - --scale-down-delay-after-add=10m
        - --scale-down-unneeded-time=10m
        - --scale-down-utilization-threshold=0.5
        - --max-node-provision-time=15m
        - --max-graceful-termination-sec=600`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Cost Monitoring with Kubecost</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement detailed cost tracking:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Install Kubecost
helm install kubecost \\
  --repo https://kubecost.github.io/cost-analyzer/ cost-analyzer \\
  --namespace kubecost --create-namespace \\
  --set kubecostToken="your-token" \\
  --set prometheus.enabled=false \\
  --set prometheus.fqdn=http://prometheus-server.monitoring.svc

# Cost allocation by namespace
kubectl label namespace production team=platform env=prod
kubectl label namespace development team=engineering env=dev

# Resource quotas per namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: development
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    limits.cpu: "200"
    limits.memory: 400Gi
    persistentvolumeclaims: "10"
    
# LimitRange for default resources
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    type: Container`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Storage Optimization</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Reduce storage costs with intelligent tiering:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Storage classes with different tiers
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
allowVolumeExpansion: true
reclaimPolicy: Delete

---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: slow-hdd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: st1
allowVolumeExpansion: true
reclaimPolicy: Delete

# Automated PV cleanup
apiVersion: batch/v1
kind: CronJob
metadata:
  name: pv-cleanup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cleanup
            image: bitnami/kubectl
            command:
            - /bin/sh
            - -c
            - |
              kubectl get pv -o json | jq -r '.items[] | 
              select(.status.phase=="Released") | .metadata.name' | 
              xargs -I {} kubectl delete pv {}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Pod Disruption Budgets</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Maintain availability while allowing cost-saving operations:
        </p>
        
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: my-app
  unhealthyPodEvictionPolicy: IfHealthyBudget`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Cost Reduction Results</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          After implementing these optimizations:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>65% reduction in compute costs with spot instances</li>
          <li>40% reduction through right-sizing</li>
          <li>30% storage cost reduction with tiering</li>
          <li>Overall monthly cloud bill reduced by 55%</li>
          <li>Maintained 99.95% availability SLA</li>
        </ul>
      </>
    )
  },
  {
    slug: "observability-tracing-metrics-logs",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Observability Fundamentals</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Modern distributed systems require comprehensive observability. This guide covers the three pillars 
          of observability: tracing, metrics, and logs, showing how to implement actionable telemetry with 
          OpenTelemetry and define meaningful SLOs.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Three Pillars</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Understanding the differences and when to use each:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li><strong>Metrics:</strong> Numeric measurements over time (CPU usage, request rate)</li>
          <li><strong>Logs:</strong> Discrete events with context (errors, user actions)</li>
          <li><strong>Traces:</strong> Request flow through distributed systems</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">OpenTelemetry Implementation</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Node.js OpenTelemetry setup
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'api-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://otel-collector:4318/v1/metrics',
    }),
  }),
});

sdk.start();`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Distributed Tracing</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Instrument HTTP requests
const tracer = opentelemetry.trace.getTracer('http-service');

app.use((req, res, next) => {
  const span = tracer.startSpan(\`\${req.method} \${req.path}\`, {
    attributes: {
      'http.method': req.method,
      'http.url': req.url,
      'http.target': req.path,
    },
  });
  
  res.on('finish', () => {
    span.setAttributes({
      'http.status_code': res.statusCode,
    });
    span.end();
  });
  
  next();
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Custom Metrics</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Business metrics
const meter = metrics.getMeter('business-metrics');

const orderCounter = meter.createCounter('orders_total', {
  description: 'Total number of orders',
});

const revenueHistogram = meter.createHistogram('order_value', {
  description: 'Order value distribution',
  unit: 'USD',
});

// Track metrics
orderCounter.add(1, { 
  status: 'completed',
  payment_method: 'credit_card' 
});

revenueHistogram.record(99.99, {
  product_category: 'electronics'
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Service Level Objectives (SLOs)</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`# Prometheus SLO configuration
- name: slo_rules
  rules:
  - record: slo:availability
    expr: |
      sum(rate(http_requests_total{status!~"5.."}[5m])) / 
      sum(rate(http_requests_total[5m]))
      
  - alert: SLO_Availability_Warning
    expr: slo:availability < 0.999
    for: 5m
    annotations:
      summary: "Availability SLO warning (\{\{ $value | humanizePercentage \}\})"
      
  - record: slo:latency_p99
    expr: |
      histogram_quantile(0.99,
        sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
      )`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Structured Logging</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Structured logging with correlation
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'api-service',
    version: process.env.VERSION 
  },
  transports: [
    new winston.transports.Console()
  ]
});

// Correlate logs with traces
app.use((req, res, next) => {
  const span = trace.getActiveSpan();
  const traceId = span?.spanContext().traceId;
  
  req.logger = logger.child({
    traceId,
    requestId: req.id,
    userId: req.user?.id
  });
  
  next();
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Alerting Strategy</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Implement meaningful alerts based on SLOs:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Alert on symptoms, not causes</li>
          <li>Use error budgets for decision making</li>
          <li>Implement alert fatigue prevention</li>
          <li>Create runbooks for each alert</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Key Results</h2>
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>MTTR reduced from hours to minutes</li>
          <li>90% reduction in false positive alerts</li>
          <li>Complete request tracing across 20+ services</li>
          <li>Proactive issue detection before customer impact</li>
        </ul>
      </>
    )
  },
  {
    slug: "e2e-testing-strategy",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">End-to-End Testing Strategy</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          E2E tests are powerful but can be flaky and slow. This guide presents a pragmatic approach to E2E 
          testing that reduces flakiness, speeds up execution, and provides confidence in your deployments.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">The Testing Pyramid</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Balance your testing strategy across different levels:
        </p>
        
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li><strong>Unit Tests (70%):</strong> Fast, isolated, numerous</li>
          <li><strong>Integration Tests (20%):</strong> Service boundaries, API contracts</li>
          <li><strong>E2E Tests (10%):</strong> Critical user journeys only</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Playwright Setup</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Reduce flakiness
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Page Object Model</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email-input"]', email);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="login-button"]');
    
    // Wait for navigation
    await this.page.waitForURL('/dashboard');
  }
  
  async expectError(message: string) {
    await expect(this.page.locator('[data-testid="error-message"]'))
      .toHaveText(message);
  }
}

// tests/auth.spec.ts
test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  
  await expect(page).toHaveURL('/dashboard');
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Test Data Management</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// fixtures/testData.ts
export const createTestUser = async () => {
  const user = {
    email: \`test-\${Date.now()}@example.com\`,
    password: 'Test123!',
    name: 'Test User'
  };
  
  await api.post('/test/users', user);
  return user;
};

// fixtures/database.ts
export const resetDatabase = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Database reset only in test env!');
  }
  
  await db.query('TRUNCATE TABLE users CASCADE');
  await seedTestData();
};

// Use in tests
test.beforeEach(async () => {
  await resetDatabase();
  testUser = await createTestUser();
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Reducing Flakiness</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Wait strategies
// Bad: Fixed timeout
await page.waitForTimeout(5000);

// Good: Wait for specific condition
await page.waitForSelector('[data-loaded="true"]');
await page.waitForResponse(resp => 
  resp.url().includes('/api/data') && resp.status() === 200
);

// Network stability
await page.route('**/api/**', route => {
  // Add artificial delay for testing loading states
  setTimeout(() => route.continue(), 100);
});

// Retry mechanism
async function waitForStableElement(selector: string) {
  let retries = 3;
  while (retries > 0) {
    try {
      await page.waitForSelector(selector, { 
        state: 'stable',
        timeout: 5000 
      });
      return;
    } catch (e) {
      retries--;
      if (retries === 0) throw e;
    }
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Parallel Execution</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Split tests for parallel execution
// .github/workflows/e2e.yml
jobs:
  test:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      
// Use test.describe.parallel for independent tests
test.describe.parallel('User flows', () => {
  test('can create account', async ({ page }) => {
    // ...
  });
  
  test('can reset password', async ({ page }) => {
    // ...
  });
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Visual Regression Testing</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Visual comparisons
test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
    mask: [page.locator('.dynamic-content')],
  });
});`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Results</h2>
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Test execution time: 5 minutes (from 45 minutes)</li>
          <li>Flakiness rate: &lt; 1%</li>
          <li>Test maintenance reduced by 70%</li>
          <li>Deployment confidence: 99%+</li>
        </ul>
      </>
    )
  },
  {
    slug: "feature-flags-safe-releases",
    content: (
      <>
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Feature Flags for Safe Releases</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          Feature flags enable continuous deployment without continuous release. This guide shows how to 
          implement feature flags for gradual rollouts, A/B testing, and instant rollbacks without redeployment.
        </p>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Feature Flag Architecture</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Feature flag service
interface FeatureFlag {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
  targetGroups?: string[];
  conditions?: FlagCondition[];
}

class FeatureFlagService {
  private flags: Map<string, FeatureFlag> = new Map();
  
  async evaluate(
    flagKey: string, 
    context: { userId?: string; attributes?: Record<string, any> }
  ): Promise<boolean> {
    const flag = await this.getFlag(flagKey);
    
    if (!flag) return false;
    if (!flag.enabled) return false;
    
    // Check target groups
    if (flag.targetGroups?.includes(context.userId)) {
      return true;
    }
    
    // Check rollout percentage
    if (flag.rolloutPercentage) {
      const hash = this.hashUserId(context.userId);
      return (hash % 100) < flag.rolloutPercentage;
    }
    
    // Evaluate conditions
    if (flag.conditions) {
      return this.evaluateConditions(flag.conditions, context);
    }
    
    return flag.enabled;
  }
  
  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">React Integration</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Feature flag provider
const FeatureFlagContext = createContext<{
  flags: Record<string, boolean>;
  isEnabled: (flag: string) => boolean;
}>({ flags: {}, isEnabled: () => false });

export const FeatureFlagProvider: FC = ({ children }) => {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    fetchFlags().then(setFlags);
    
    // Real-time updates via WebSocket
    const ws = new WebSocket('ws://flags.example.com');
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setFlags(prev => ({ ...prev, [update.key]: update.enabled }));
    };
    
    return () => ws.close();
  }, []);
  
  const isEnabled = (flag: string) => flags[flag] ?? false;
  
  return (
    <FeatureFlagContext.Provider value={{ flags, isEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// Hook usage
export const useFeatureFlag = (flag: string) => {
  const { isEnabled } = useContext(FeatureFlagContext);
  return isEnabled(flag);
};

// Component usage
const NewFeature = () => {
  const isEnabled = useFeatureFlag('new-checkout-flow');
  
  if (!isEnabled) {
    return <OldCheckout />;
  }
  
  return <NewCheckout />;
};`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Gradual Rollout Strategy</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Progressive rollout configuration
{
  "flags": [
    {
      "key": "new-payment-system",
      "rolloutStages": [
        {
          "stage": 1,
          "percentage": 1,
          "startDate": "2024-01-01",
          "criteria": { "userType": "internal" }
        },
        {
          "stage": 2,
          "percentage": 10,
          "startDate": "2024-01-07",
          "criteria": { "country": ["US", "CA"] }
        },
        {
          "stage": 3,
          "percentage": 50,
          "startDate": "2024-01-14"
        },
        {
          "stage": 4,
          "percentage": 100,
          "startDate": "2024-01-21"
        }
      ],
      "killSwitch": {
        "errorRateThreshold": 5,
        "latencyThreshold": 2000,
        "autoDisable": true
      }
    }
  ]
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">A/B Testing Implementation</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// A/B test configuration
class ABTestManager {
  async getVariant(
    testId: string, 
    userId: string
  ): Promise<string> {
    const test = await this.getTest(testId);
    
    // Check if user is already assigned
    const existing = await this.getUserAssignment(testId, userId);
    if (existing) return existing.variant;
    
    // Assign variant based on distribution
    const variant = this.assignVariant(test.variants, userId);
    
    // Persist assignment
    await this.saveAssignment(testId, userId, variant);
    
    // Track exposure
    analytics.track('experiment_exposed', {
      experiment_id: testId,
      variant,
      user_id: userId
    });
    
    return variant;
  }
  
  private assignVariant(
    variants: Array<{ name: string; weight: number }>,
    userId: string
  ): string {
    const hash = this.hashUserId(userId);
    const normalizedHash = (hash % 100) / 100;
    
    let cumulative = 0;
    for (const variant of variants) {
      cumulative += variant.weight;
      if (normalizedHash < cumulative) {
        return variant.name;
      }
    }
    
    return variants[0].name;
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Monitoring and Metrics</h2>
        <pre className="bg-black-200 rounded-lg p-4 overflow-x-auto my-6">
          <code className="text-[#915eff]">{`// Feature flag metrics
class FeatureFlagMetrics {
  trackEvaluation(flag: string, result: boolean, context: any) {
    metrics.increment('feature_flag.evaluation', {
      flag,
      result: result ? 'enabled' : 'disabled',
      user_segment: this.getUserSegment(context)
    });
  }
  
  trackPerformance(flag: string, metrics: PerformanceMetrics) {
    if (metrics.errorRate > threshold) {
      this.triggerKillSwitch(flag);
      alerts.send({
        level: 'critical',
        message: \`Feature flag \${flag} causing errors\`,
        metrics
      });
    }
  }
  
  generateReport(): FlagReport {
    return {
      evaluations: this.getEvaluationCounts(),
      performance: this.getPerformanceMetrics(),
      adoption: this.getAdoptionRate(),
      impact: this.getBusinessImpact()
    };
  }
}`}</code>
        </pre>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Best Practices</h2>
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Name flags clearly (e.g., <code>enable-new-checkout-flow</code>)</li>
          <li>Always include kill switches for critical features</li>
          <li>Clean up old flags regularly</li>
          <li>Document flag purpose and removal criteria</li>
          <li>Use short-lived flags when possible</li>
        </ul>
        
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">Results</h2>
        <ul className="text-white/70 leading-relaxed mb-6 list-disc list-inside space-y-2">
          <li>Deployment risk reduced by 90%</li>
          <li>Rollback time: &lt; 10 seconds</li>
          <li>A/B test velocity increased 5x</li>
          <li>Zero-downtime releases achieved</li>
          <li>Feature adoption metrics improved 40%</li>
        </ul>
      </>
    )
  }
];