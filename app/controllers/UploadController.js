var fs = require('fs');
var im = require('imagemagick');

UploadController = function() {};

UploadController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var file = req.files.file;

    var fileExtension;
    var renamedFile;

    // get the temporary location of the file
    var tmp_path = file.path;

    // if file is for pages or extra files or players, so req.params.slug according to it
    if (req.params.slug == 'pages') { // so if extra other files
        fileExtension = '.' + file.name.split('.').pop();
        renamedFile =  Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

        // set where the file should actually exist
        var target_path = './media/pages/' + renamedFile;

        // move the file from the temporary location to the intended location
        //fs.rename(tmp_path, target_path, function (err) {
        //    if (err) throw err;
        //    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        //    fs.unlink(tmp_path, function () {
        //        if (err) throw err;
        //        res.send(renamedFile);
        //    });
        //});
        // resize (width max 800px) and move the file from the temporary location to the intended location
        im.resize({
            srcPath: tmp_path,
            dstPath: target_path,
            width:   800
        }, function (err, stdout, stderr) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send(renamedFile);
            });
        });
    } else if (req.params.slug == 'extra') { // so if extra other files
        fileExtension = '.' + file.name.split('.').pop();
        renamedFile =  Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

        // set where the file should actually exist
        var target_path = './media/extra/' + renamedFile;

        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send(renamedFile);
            });
        });
    } else if (req.params.slug == 'players') {
        //fileExtension = '.' + file.name.split('.').pop();
        //renamedFile =  Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

        // rename the file with original name
        renamedFile = file.originalFilename;

        // set where the file should actually exist
        var target_path = './media/players/' + renamedFile;

        // move the file from the temporary location to the intended location
        //fs.rename(tmp_path, target_path, function (err) {
        //    if (err) throw err;
        //    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        //    fs.unlink(tmp_path, function () {
        //        if (err) throw err;
        //        res.send(renamedFile);
        //    });
        //});

        // resize (width max 200px) and move the file from the temporary location to the intended location
        im.resize({
            srcPath: tmp_path,
            dstPath: target_path,
            width: 150
        }, function (err, stdout, stderr) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send(renamedFile);
            });
        });
    } else { // so else if data image files for match, uses matchID as req.params.slug
        // rename the file with original name (slug must be matchID)
        renamedFile = req.params.slug + '_' + file.originalFilename;

		// set where the file should actually exist
		var target_path = './media/data/' + renamedFile;
		
        // move the file from the temporary location to the intended location
        //fs.rename(tmp_path, target_path, function (err) {
        //    if (err) throw err;
        //    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        //    fs.unlink(tmp_path, function () {
        //        if (err) throw err;
        //        res.send(renamedFile);
        //    });
        //});

        // resize (width max 600px) and move the file from the temporary location to the intended location
        im.resize({
            srcPath: tmp_path,
            dstPath: target_path,
            width:   600
        }, function (err, stdout, stderr) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send(renamedFile);
            });
        });
    }

    console.log('file ' + file.name + ' uploaded. (' + file.type + ')');
};

module.exports = new UploadController();