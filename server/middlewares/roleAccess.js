(function () {
  'use strict';

  var config = require('./../../config/adminConfig'),
    Role = require('./../models/role');

    exports.roleAccess = function (req, res, next) {
      if(req.body.title === config.role){
        res.status(403).json({
          success:false,
          message: 'Access Denied'
        });
      } else {
        next();
      }
    };

    exports.roleAuth = function (req, res, next) {
      Role.findOne(req.params.id, function (err, role) {
        if (err) {
          res.send(err);
        } else if (!role) {
          res.status(404).json({
            success: false,
            message: 'Role not found'
          });
        } else {
          if (role.title !== config.role) {
            res.status(403).json({
              success: false,
              message:'Access denied'
            });
          } else {
            next();
          }
        }
      });

    };
})();