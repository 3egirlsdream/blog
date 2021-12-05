var api_url = '';
var app_url = '';
var cdn_url = '';
if (window.location.hostname == 'localhost') {
  api_url = 'https://localhost:44389';
  app_url = 'http://blog.luoxun.com/';
  cdn_url = 'http://blog.luoxun.com/';
}
else{
    api_url = 'http://42.194.131.197:4396';
    app_url = 'https://blog.locyin.com/';
    cdn_url = 'https://locyin.oss-cn-beijing.aliyuncs.com/';
}

export const APP_CONFIG = {
  API_URL: api_url,
  APP_URL: app_url,
  CDN_URL: cdn_url,
};
