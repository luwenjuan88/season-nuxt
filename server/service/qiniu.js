import qiniu from 'qiniu';

async function getSign(req) {
    var accessKey = 'vrpYf0iM2ZCTvn-Yi4b-84J38N_KiHRXiXrOvO12';
    var secretKey = '3k26yNVHOfdlYQQnRRACTvaPV_LsH4ESq3Gpzltm';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: 'daydaymoment',
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken = putPolicy.uploadToken(mac);
      return {
        token: uploadToken
      };
}


export {getSign}
