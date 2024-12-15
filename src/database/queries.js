import { getImages, uploadImages } from "../controllers/notices.controllers.js";

export const queries =  {
    getAllEquipments: 'SELECT * from tempTurb',
    addEquipment: 'INSERT INTO tempTurb (temp) VALUES (@temp)',
    getEquipmentById: 'SELECT * FROM tempTurb WHERE Id = @Id ',
    deletEquipmentById: 'DELETE FROM tempTurb WHERE Id = @Id',
    getTotalEquipment: 'SELECT COUNT(*) FROM tempTurb',
    updateEquipmentById: 'UPDATE tempTurb SET temp = @temp WHERE Id = @Id',
    //
    getTemperature: 'SELECT * from tempTurb',
    getTempTurbine: 'SELECT * from tempTurbine',
    insertTemperature: 'INSERT INTO tempTurb (temp, startTime, endTime) VALUES (@temp, @startTime, @endTime)',
    insertTempTurbine: 'INSERT INTO tempTurbine (temp, time) VALUES (@temp, @time)',
    insertAccTurbine: 'INSERT INTO accTurbine (acc_x, acc_y, acc_z, gyr_x, gyr_y, gyr_z, time) VALUES (@acc_x, @acc_y, @acc_z, @gyr_x, @gyr_y, @gyr_z, @time)',
    insertAccHead: 'INSERT INTO accHead (acc_x, acc_y, acc_z, gyr_x, gyr_y, gyr_z, time) VALUES (@acc_x, @acc_y, @acc_z, @gyr_x, @gyr_y, @gyr_z, @time)',
    insertAccHeadHX3: 'INSERT INTO accHeadHX3 (acc_x, acc_y, acc_z, time) VALUES (@acc_x, @acc_y, @acc_z, @time)',
    getAccTurbine: 'SELECT * FROM accTurbine',
    getAccHead: 'SELECT * FROM accHead',
    getAccHeadHX3: 'SELECT * FROM accHeadHX3',

    //
    //USER
    getUsers: 'SELECT * FROM users_',
    updateUsers: 'UPDATE users_ SET status = @status WHERE id = @id',
    updateUsersAll: `UPDATE users_ SET status = 'inactive' WHERE id = @id`,


    getEquipment:'SELECT * FROM equipment',
    getNotices: 'SELECT * FROM notices',
    //getNoticesHistory: 'SELECT * FROM notices WHERE status = 3',
    getNoticesHistory: `SELECT id, machine, message, regtime, starttime, endtime, technician FROM notices WHERE status = 3`,
    getNoticeById: 'SELECT * FROM notices WHERE id = @id',
    createNotice: 'INSERT INTO notices(status, machine, message, detail, regtime, requester) VALUES (@status, @machine, @message, @detail, @regtime, @requester)',
    updateNotice: 'UPDATE notices SET status = @status, starttime = @starttime, technician = @technician WHERE id = @id',
    updateNoticeDescription: 'UPDATE notices SET description = @description WHERE id = @id',
    updateNoticeClosed: 'UPDATE notices SET status = @status, endtime = @endtime WHERE id = @id',

    //NoticeUser
    insertNoticeUser: 'INSERT INTO notices_user(id_user, id_notice, starttime) VALUES (@id_user, @id_notice, @starttime)',
    getNoticeUserFilter: `SELECT notices_user.id AS 'id_notices_user', notices.id, users_.name, users_.id AS 'user_id', notices_user.starttime, notices_user.endtime, notices_user.comment, users_.status FROM users_ JOIN notices_user ON notices_user.id_user = users_.id JOIN notices ON notices.id = notices_user.id_notice WHERE notices.id <> 0`,
    getNoticeUserFilterById: `SELECT notices_user.id AS 'id_notices_user', notices.id, users_.name, users_.id AS 'user_id', notices_user.starttime, notices_user.endtime, notices_user.comment, users_.status FROM users_ JOIN notices_user ON notices_user.id_user = users_.id JOIN notices ON notices.id = notices_user.id_notice WHERE notices.id <> 0 AND notices.id = @id AND users_.status = 'active' AND notices_user.endtime IS NULL`,
    updateNoticesUser: 'UPDATE notices_user SET endtime = @endtime WHERE id_user = @id_user AND id_notice = @id_notice',
    exitUserNotice : 'UPDATE notices_user SET endtime = @endtime, comment = @comment WHERE id = @id AND id_user = @id_user AND id_notice = @id_notice',
    getNoticesUser_UserId: 'SELECT * FROM notices_user JOIN users_ on notices_user.id_user = users_.id WHERE id_notice = @id_notice',

    //upload images
    //uploadImages: 'INSERT INTO images (id_notice, equipment, imagename, comment) VALUES (@id_notice, @equipment, @imagename, @comment)'
    uploadImages: 'INSERT INTO images (id_notice, imagename) VALUES (@id_notice, @imagename)',
    getImages: 'SELECT * FROM images WHERE id_notice = @id_notice',

    //Performance
    getPerformanceData: `
        SELECT 
            technician, 
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime
        FROM 
            notices
        WHERE 
            status = 3
        GROUP BY 
            technician
    `,
    getEquipmentData: `
        SELECT 
            machine AS equipment, 
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime
        FROM 
            notices
        WHERE 
            status = 3
        GROUP BY 
            machine
    `,
    getFilteredPerformanceData: `
        SELECT 
            technician, 
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime
        FROM 
            notices
        WHERE 
            status = 3 AND starttime >= @startDate AND endtime <= @endDate
        GROUP BY 
            technician
    `,
    getFilteredEquipmentData: `
        SELECT 
            machine AS equipment, 
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime
        FROM 
            notices
        WHERE 
            status = 3 AND starttime >= @startDate AND endtime <= @endDate
        GROUP BY 
            machine
    `

}

//Verify the content of queries.getUsers to ensure it's a valid SQL query for your use case. Consider using parameterized queries to prevent SQL injection vulnerabilities.
