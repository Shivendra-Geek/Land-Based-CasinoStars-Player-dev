import fs from 'fs';
import AES from 'crypto-js/aes';
import { buildForUser } from '../../../../build-for-user';

export async function POST(req) {
    try {
        const { session } = await req.json();

        if (!session) {
            return new Response(JSON.stringify({ error: 'Missing session' }), { status: 400 });
        }

        const SECRET_KEY = 'trdtS:mK9X:[V[.U_"uIOUERV)a%<I';
        const ciphertext = AES.encrypt(JSON.stringify(session), SECRET_KEY).toString();
        const data = `export const sessionForDesktop ="${ciphertext}"`;

        fs.writeFileSync('session.js', data); // Writing session.js in the root folder

        const downloadUrl = buildForUser(session.username);

        return new Response(JSON.stringify({ success: true, downloadUrl }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ success: false, message: 'Build failed', error: e.message }), { status: 500 });
    }
}
