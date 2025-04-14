const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute'); // ✅ nom exact du fichier


app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
