
const express = require('express');
const passport = require('passport');
require('../controller/passportController');
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

    res.cookie("email", req.user.email, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: false
    });

    res.redirect(`https://stylocart.netlify.app/?email=${req.user.email}`);
    // res.redirect(`http://localhost:5173/?email=${req.user.email}`)
  }
);



module.exports = router;