exports.UserRegister=function(req,res)
{
res.send("Registration page");
};

exports.UserLogin=function(req,res)
{
res.send("Log-in page");
};

exports.UserUpdate=function(req,res)
{
  res.send("User Update page" + JSON.stringify(req.params)  );
};

exports.UserProfile=function(req,res)
{
 res.send("User profile page" + JSON.stringify(req.params)  );
 
};

exports.UserChPassward=function(req,res)
{
  res.send("User change-Password page" + JSON.stringify(req.params)  );
};

exports.UserHistory=function(req,res)
{
  res.send("User Book Borrowed history page" + JSON.stringify(req.params)  );
};

exports.UserRenew=function(req,res)
{
  res.send("User renew book page" + JSON.stringify(req.params)  );
};

exports.UserOverdue=function(req,res)
{
  res.send("Over-due books  page" + JSON.stringify(req.params)  );
};

exports.UserPayFine=function(req,res)
{
  res.send("User Fine payment page" + JSON.stringify(req.params)  );
};

exports.UserViewFine=function(req,res)
{
  res.send("User View Fine page" + JSON.stringify(req.params)  );
};