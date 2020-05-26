module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    const ReportData = require('../../config/report');
    
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body);

        res.send(model);
    }); 
    router.post('/reports', async (req, res) => {
        res.json(
            ReportData
        );
    });
    app.use('/admin/api', router);
};