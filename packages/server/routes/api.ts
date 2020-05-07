import { Router } from 'express';
import StockCache from '../StockCache';

export default function (app: Router) {
    const router = Router();
    const stockCache = new StockCache();

    router.get('/stores', (req, res) => {
        stockCache.getResults()
            .then(results => res.json(results))
            .catch(e => res.status(500).json({ error: e.toString() }));
    });

    app.get('/api', router);
}