// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { buildForUser } = require('./build-for-user');
const AES = require('crypto-js/aes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/builds', express.static('public/builds'));

app.post('/api/build', async (req, res) => {
    const { session } = req.body;
    if (!session) return res.status(400).json({ error: 'Missing session' });
    try {
        const SECRET_KEY = 'trdtS:mK9X:[V[.U_"uIOUERV)a%<I';
        const ciphertext = AES.encrypt(JSON.stringify(session), SECRET_KEY).toString();
        const data = `export const sessionForDesktop ="${ciphertext}"`;
        fs.writeFileSync('session.js', data);
        const downloadUrl = buildForUser(session?.username);
        res.json({ success: true, downloadUrl });
    } catch (e) {
        res.status(500).json({ success: false, message: 'Build failed', error: e.message });
    }
});

app.listen(4000, () => {
    console.log('Build server running on port 4000');
});
