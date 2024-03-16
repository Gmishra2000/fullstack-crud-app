const RoleMiddleware = (role) => {
  return (req, res, next) => {
    const user = req.user;
    if (user.role !== role) {
      return res.status(401).json({
        status: 401,
        message:"Only Admin is allowed to do this"
      })
    }
    next();
  }
}

export default RoleMiddleware;
