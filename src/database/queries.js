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


    getEquipment:'SELECT area, id, name FROM equipment ORDER BY area, name',
    getNotices: 'SELECT * FROM notices',
    getUnAcceptedNotices: 'SELECT id, machine, message, regtime, location, priority FROM notices WHERE status = 1 ORDER BY priority desc',
    getAcceptedNotices:'SELECT * FROM notices WHERE status = 2',
    //getNoticesHistory: 'SELECT * FROM notices WHERE status = 3',
    getNoticesHistory: `SELECT id, machine, message, regtime, starttime, endtime, technician FROM notices WHERE status = 4`,
    getNoticeById: 'SELECT * FROM notices WHERE id = @id',
    createNotice: 'INSERT INTO notices(status, machine, message, detail, regtime, requester, location) VALUES (@status, @machine, @message, @detail, @regtime, @requester, @location)',
    updateNotice: 'UPDATE notices SET status = @status, starttime = @starttime, technician = @technician WHERE id = @id',
    updateNoticeDescription: 'UPDATE notices SET description = @description WHERE id = @id',
    updateNoticeClosed: 'UPDATE notices SET status = @status, endtime = @endtime, class = @class, stopped = @stopped WHERE id = @id',
    getNoticesByCategory: 'SELECT id, machine, message, regtime, location, status FROM notices WHERE location = @location ORDER BY priority desc',

    //NoticeUser
    insertNoticeUser: 'INSERT INTO notices_user(id_user, id_notice, starttime) VALUES (@id_user, @id_notice, @starttime)',
    getNoticeUserFilter: `SELECT notices_user.id AS 'id_notices_user', notices.id, users_.name, users_.id AS 'user_id', notices_user.starttime, notices_user.endtime, notices_user.comment, users_.status FROM users_ JOIN notices_user ON notices_user.id_user = users_.id JOIN notices ON notices.id = notices_user.id_notice WHERE notices.id <> 0`,
    getNoticeUserFilterById: `SELECT notices_user.id AS 'id_notices_user', notices.id, users_.name, users_.id AS 'user_id', notices_user.starttime, notices_user.endtime, notices_user.comment, users_.status FROM users_ JOIN notices_user ON notices_user.id_user = users_.id JOIN notices ON notices.id = notices_user.id_notice WHERE notices.id <> 0 AND notices.id = @id AND users_.status = 'active' AND notices_user.endtime IS NULL`,
    updateNoticesUser: 'UPDATE notices_user SET endtime = @endtime WHERE id_user = @id_user AND id = @id',
    exitUserNotice : 'UPDATE notices_user SET endtime = @endtime, comment = @comment WHERE id = @id AND id_user = @id_user AND id_notice = @id_notice',
    getNoticesUser_UserId: 'SELECT * FROM notices_user JOIN users_ on notices_user.id_user = users_.id WHERE id_notice = @id_notice',

    //upload images
    //uploadImages: 'INSERT INTO images (id_notice, equipment, imagename, comment) VALUES (@id_notice, @equipment, @imagename, @comment)'
    uploadImages: 'INSERT INTO images (id_notice, imagename) VALUES (@id_notice, @imagename)',
    getImages: 'SELECT * FROM images WHERE id_notice = @id_notice',

    //Performance
    getPerformanceData: `
        SELECT 
            u.name AS technician, 
            COUNT(DISTINCT nu.id_notice) AS numNotices, 
            SUM(DATEDIFF(minute, nu.starttime, nu.endtime)) AS totalTime 
        FROM notices_user nu
        JOIN users_ u ON nu.id_user = u.id
        GROUP BY u.name
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
            u.name AS technician, 
            COUNT(DISTINCT nu.id_notice) AS numNotices, 
            SUM(DATEDIFF(minute, nu.starttime, nu.endtime)) AS totalTime 
        FROM notices_user nu
        JOIN users_ u ON nu.id_user = u.id
        WHERE nu.starttime >= @startDate
          AND nu.endtime <= @endDate
        GROUP BY u.name
    `,
    getFilteredEquipmentData: `
        SELECT 
            machine AS equipment, class,
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime
        FROM 
            notices
        WHERE 
            status = 3 AND starttime >= @startDate AND endtime <= @endDate
        GROUP BY 
            machine, class
    `,
    getEquipmentDataByClass: `
        SELECT 
            machine AS equipment, 
            class,
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime 
        FROM notices 
        WHERE status = 3 
        GROUP BY machine, class
    `,
    getFilteredEquipmentDataByClass: `
        SELECT 
            machine AS equipment, 
            class,
            COUNT(id) AS numNotices, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalTime 
        FROM notices 
        WHERE status = 3 
          AND starttime >= @startDate 
          AND endtime <= @endDate 
        GROUP BY machine, class
    `,
    getMTBFData: `
        SELECT 
            machine AS equipment, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalRepairTime,
            COUNT(id) AS numFailures 
        FROM notices 
        WHERE class = 'PM01'
            AND starttime >= @startDate 
            AND endtime <= @endDate
        GROUP BY machine
    `,
    getMTTRData: `
        SELECT 
            machine AS equipment, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalRepairTime,
            COUNT(id) AS numFailures 
        FROM notices 
        WHERE class = 'PM01'
            AND starttime >= @startDate 
            AND endtime <= @endDate
        GROUP BY machine
    `,
    getAvailabilityData: `
        SELECT 
            machine AS equipment, 
            SUM(DATEDIFF(minute, starttime, endtime)) AS totalRepairTime,
            COUNT(id) AS numFailures 
        FROM notices 
        WHERE class = 'PM01'
            AND starttime >= @startDate 
            AND endtime <= @endDate
        GROUP BY machine
    `,

    //Alerts
    createAlert: `INSERT INTO alerts (name, startDate, startTime, period, hours, message) VALUES (@name, @startDate, @startTime, @period, @hours, @message)`,
    getAlerts: 'SELECT * FROM alerts',
    
}

//Verify the content of queries.getUsers to ensure it's a valid SQL query for your use case. Consider using parameterized queries to prevent SQL injection vulnerabilities.
