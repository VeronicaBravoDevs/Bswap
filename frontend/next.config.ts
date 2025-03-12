const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "equipo-s21-05-m-webapp.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "equipo-s21-05-m-webapp.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
