var async = require('async');
var GoogleSpreadsheet = require('google-spreadsheet');
var _ = require('underscore');

function getSheet(workSheetIndex, callback) {
  var doc = new GoogleSpreadsheet('1B5Lqj6pMXrEE6NWY8fkILi3KtN7vE3xIXqVYSaE2uSk');
  var sheet;

  async.series([
    function setAuth(step) {
      var creds_json = {
        "client_email": process.env.CLIENT_EMAIL,
        "private_key": process.env.PRIVATE_KEY
      };
      doc.useServiceAccountAuth(creds_json, step);
    },
    function getWorkSheet(step) {
      doc.getInfo(function(err, info) {
        sheet = info.worksheets[workSheetIndex];
        return callback(sheet);
      });
    }
  ]);
}

exports.getPhotos = function(req, res) {
  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      var photos = [];

      _.each(rows, function(row) {
        findCategoryResult = _.findWhere(photos, {
          category: row.category
        });
        if (findCategoryResult === undefined) {
          photos.push({
            category: row.category,
            items: [{
              title: row.title,
              description: row.description,
              url: row.url
            }]
          });
        } else {
          findCategoryResult.items.push({
            title: row.title,
            description: row.description,
            url: row.url
          });
        }
      });
      return res.json({
        success: true,
        data: photos
      });
    });
  });
};

exports.getPhotoCategories = function(req, res) {
  getSheet(0, function(sheet) {
    sheet.getRows(function(err, rows) {
      var categories = [];

      for (var i = 0; i < rows.length; i++) {
        if (categories.indexOf(rows[i].category) === -1) {
          categories.push(rows[i].category);
        }
      }

      return res.json({
        success: true,
        data: categories
      });
    });
  });
};