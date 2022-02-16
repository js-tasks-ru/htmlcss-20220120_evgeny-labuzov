module.exports = async function(app, {url, path}){
  app.get(url, (req, res, next) => res.sendFile(path));
};
