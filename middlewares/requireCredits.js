module.exports = (req, res, next) => {
  //Each survey costs one credit,
  //so the user needs to have at least one credit available
  if(req.user.credits < 1) {
    return res.status(401).send({ error: 'Not enough available credits' });
  }

  next();
}
