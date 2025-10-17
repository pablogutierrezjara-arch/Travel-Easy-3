cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
module.exports = nextConfig;
EOF

git add next.config.js
git commit -m "Add next.config.js"
