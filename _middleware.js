// _middleware.js

export default function (req, res, next) {
  res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
  next();
}
