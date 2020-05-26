import XLSX from 'XLSX';
//重组数据
const processingData = (title, data) => {
    let newSheet = [];

    data.forEach((record, index) => {
        let obj = {};

        record.forEach((item, idx) => {
            obj[title[idx]] = item;
        });
        newSheet.push(obj);
    });
    return newSheet;
};
// 导出
const downloadExcel = (data) => {
    let workbook = {
        SheetNames: [],
        Sheets: {}
    };

    data.sheet.forEach(item => {
        workbook.SheetNames.push(item.sheet_name);
        let title = item.title;
        const ws = XLSX.utils.json_to_sheet(processingData(title, item.data), {title});

        workbook.Sheets[item.sheet_name] = Object.assign({}, ws);
    });

    let file_name = data.file_name;

    if (file_name.indexOf('.') == -1) {
        file_name += '.xlsx';
    }

    XLSX.writeFile(workbook, file_name);
};

export default {
    downloadExcel
};