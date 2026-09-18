const User = require('../models/user');
const PasswordResetCode = require('../models/PasswordResetCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



// Configurer l'envoi d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raedtouati2550@gmail.com',
    pass: 'aqjl eooj ujtq akjz'
  }
});

module.exports = {
  // Step 1: Vérifier email et envoyer code
 async step1(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email introuvable." });

    console.log("✅ Utilisateur trouvé:", user.email);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await PasswordResetCode.deleteMany({ email });
    console.log("✅ Anciens codes supprimés");

    await PasswordResetCode.create({ email, code });
    console.log("✅ Nouveau code enregistré:", code);

    await transporter.sendMail({
      from: '"Support" <raedtouati2550@gmail.com>',
      to: email,
      subject: 'Code de réinitialisation',
      html: `<p>Bonjour ${user.name},<br>Voici votre code : <b>${code}</b></p>`
    });
    console.log("✅ Email envoyé à", email);

    const token_code = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    console.log("✅ Token JWT généré");

    res.json({ message: "Code envoyé", token: token_code });

  } catch (err) {
    console.error("❌ Erreur dans step1:", err); // 👈 ça nous dira où ça plante
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
},



  // Step 2: Vérifier le code
  async step2(req, res) {
    const { code, token } = req.body;

    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      const record = await PasswordResetCode.findOne({ email, code });

      if (!record) return res.status(400).json({ error: "Code incorrect." });

      const elapsed = (Date.now() - new Date(record.createdAt)) / 60000;
      if (elapsed > 15) {
        await PasswordResetCode.deleteOne({ _id: record._id });
        return res.status(400).json({ error: "Code expiré." });
      }

      await PasswordResetCode.deleteMany({ email });

      const token_reset = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
      res.json({ message: "Code valide", token: token_reset });

    } catch (err) {
      return res.status(401).json({ error: "Token invalide ou expiré." });
    }
  },

  // Step 3: Réinitialiser mot de passe
  async step3(req, res) {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
    }

    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });

      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      await user.save();

      res.json({ message: "Mot de passe réinitialisé avec succès." });

    } catch (err) {
      return res.status(401).json({ error: "Token invalide ou expiré." });
    }
  }
};
