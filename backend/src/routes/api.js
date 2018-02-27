
import { Insert, Select }  from '../controller/dml';

module.exports = router => {
  router.post('/insert', (req, res) => {
    const query = req.body;
    Insert(query)
  });
  router.get('/organisation', (req, res) => {
    Select().then(data => res.json(data));
  });
}