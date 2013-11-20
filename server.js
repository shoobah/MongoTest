/*global console*/
'use strict';
/**
 * Created by Anders on 2013-11-19.
 */
var handleData = require('./handleData.js'),
    fs = require('fs');

fs.readFile('./Data/flatlist.json', {encoding: 'utf8'}, function (err, data) {
    if (err) {
        throw err;
    }

    var obj = JSON.parse(data);

    var pageDatas = [];
    var propertyDatas = [];

    console.log('Done parsing');
    console.log(obj.length);

    handleData.deleteAll();

    for (var i = 0; i < obj.length; i++) {
        pageDatas.push({
            id: obj[i].Id,
            parentId: obj[i].ParentId,
            pageName: obj[i].PageName,
            linkUrl: obj[i].LinkUrl,
            pageType: obj[i].PageType
        });
        var ps = obj[i].Properties;
        for (var j = 0; j < ps.length; j++) {
            propertyDatas.push({
                pageId: obj[i].Id,
                name: ps[j].Name,
                value: ps[j].Value
            });
        }
    }

    console.log('Saving to db');

    handleData.deleteAll();

    handleData.savePageData(pageDatas, 'pages');
    handleData.savePageData(propertyDatas, 'props');
});

//insertdata.save([obj, obj2]);