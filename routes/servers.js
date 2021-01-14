import { Router } from 'express'
import { getAll, create, removeId } from '../controllers/servers.js'

const router = Router()

router.get('/api/server', getAll)
router.post('/api/server', create)
router.delete('/api/server/:id', removeId)

/*
router.put()
router.patch()
*/

// router.get('/api/server', (req, res) => {
//   res.json({test: 42})
// })

export default router