"use strict";

/**
 * sample file for caps parser
 */

var uaparser = require('ua-parser2')();
var capsparser = require('../index')();

var userAgent = "Mozilla/5.0 (Linux; Android 4.3.1; LG-E980 Build/JLS36I) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36";
userAgent = "LG-D722/Mozilla/5.0 (Linux; U; Android 4.4.2; de-de; LG-D722 Build/KOT49I.A1403194189) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.1599.103 Mobile Safari/537.36"

if (require.main === module) {

  userAgent = (process.argv && process.argv[2] ? process.argv[2] : userAgent);

  var uaparsed = uaparser.parse(userAgent);
  console.log(uaparsed);

  var capabilities = capsparser.parse(uaparsed);
  console.log(capabilities);

}
