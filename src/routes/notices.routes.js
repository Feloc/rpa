import { Router } from "express";
import { acceptNotice, addUserNotice, closeNotice, createNotice, exitUserNotice, getAcceptedNotices, getImages, getNotices, getNoticesByCategory, getUnAcceptedNotices, getUsers, index, notices, noticesDetail, noticesHistory, noticesUser_User, putNoticeUser, renderRegisterNoticePage, updateNotice, updatePriority, updateUsers, uploadImages } from "../controllers/notices.controllers.js";
import multer from 'multer';
import path from "path";
import sharp from 'sharp';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//const upload = multer({storage:storage})
const upload = multer({storage:multer.memoryStorage()})


const router = Router()

router.get('/', index)




router.get('/registerNotice', renderRegisterNoticePage);

router.get('/viewNotices', (req, res) => {
    res.render('viewNotices');
});

router.get('/viewWorkshopNotices', (req, res) => {
    res.render('viewWorkshopNotices');
});

router.get('/viewPlantNotices', (req, res) => {
    res.render('viewPlantNotices');
});

/*router.post('/createNotice', createNotice);
router.get('/notices', getNotices);
router.get('/acceptedNotices', getAcceptedNotices);
router.post('/acceptNotice/:id', acceptNotice);
router.post('/completeNotice/:id', completeNotice);
 */

router.get('/getUsers', getUsers)
router.post('/updateUsers', updateUsers)

router.get('/getNotices', getNotices)
router.get('/notices/:location', getNoticesByCategory);
router.get('/noticesDetail/:id_notice', noticesDetail)

router.get('/putNoticeUser', putNoticeUser)



router.get('/notices', notices)
router.post('/createNotice', createNotice)
router.post('/acceptNotice/:id_notice', acceptNotice)
router.post('/closeNotice/:id_notice', closeNotice)
router.post('/updateNotice/:id_notice', updateNotice)
router.post('/addUserNotice/:id_notice', addUserNotice)
router.post('/exitUserNotice', exitUserNotice) //parametos recibidos como req.query
router.get('/noticesHistory', noticesHistory)
router.get('/noticesUser_User/:id_notice', noticesUser_User)


router.get('/acceptedNotices', getAcceptedNotices)
router.get('/unAcceptedNotices', getUnAcceptedNotices)

router.post('/updatePriority/:id', updatePriority)

router.post('/upload', upload.single('image'), uploadImages)
router.get('/getImages/:id_notice', getImages)



//enviar al archivo.js y luego enviar por axios



export default router