// server.js or routes/auth.js
const express = require('express');
const passport = require('passport');
require('../controller/passportController'); // Make sure this is imported
const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true
  }),
  (req, res) => {
    // ✅ Access email here

    // Optional: set cookie
    res.cookie("email", req.user.email, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: false
    });

    res.redirect('https://stylocart.onrender.com/');
  }
);



module.exports = router;