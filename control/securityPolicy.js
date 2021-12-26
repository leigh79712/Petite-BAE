const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://fonts.googleapis.com/",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com",
  "https://use.fontawesome.com/",
  "https://kit-free.fontawesome.com/",
];
const connectSrcUrls = [
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css",
];
const fontSrcUrls = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];

module.exports.security = {
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'", ...connectSrcUrls],
    scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
    styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
    workerSrc: ["'self'", "blob:"],
    objectSrc: [],
    imgSrc: [
      "'self'",
      "blob:",
      "data:",
      "https://res.cloudinary.com/leigh79712/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
      "https://images.unsplash.com/",
    ],
    fontSrc: ["'self'", ...fontSrcUrls],
  },
};
