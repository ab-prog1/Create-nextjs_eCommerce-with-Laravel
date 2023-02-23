import { handleError } from "../../../../lib/helper";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (!req.cookies.token) {
            res.status(403).json({ message: 'Login failed, try again.      ' })
            return
        }

        try {
            const resApi = await axios.post('/profile/info/edit', {
                name: req.body.data.name,
                email: req.body.data.email
            }, {
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            res.status(200).json(resApi.data.data)

        } catch (err) {
            res.status(422).json({ message: { 'err': [handleError(err)] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}