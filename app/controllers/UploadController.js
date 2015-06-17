var fs = require('fs');
var im = require('imagemagick');

UploadController = function() {};

UploadController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to
    // the multiparty middleware
    var file = req.files.file;

    var fileExtension = '.' + file.name.split('.').pop();
    var renamedFile =  Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;

    // get the temporary location of the file
    var tmp_path = file.path;

    // if file is from frontloader or header, so req.params.slug = header
    if (req.params.slug == 'players') {
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
    } else if (req.params.slug == 'extra') { // so if extra other files
        // set where the file should actually exist
        var target_path = './media/' + req.params.slug + renamedFile;

        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send(renamedFile);
            });
        });
    } else  { // so if data image files
		// set where the file should actually exist
		var target_path = './media/data/' + req.params.slug + renamedFile;
		
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