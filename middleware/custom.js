const Company 			    = require('./../models').Company;
const { to, ReE, ReS } = require('../services/util.service');

let company = async function (req, res, next) {
    let company_id, err, company;
    company_id = req.params.company_id;

    [err, company] = await to(Company.findOne({where:{id:company_id}}));
    if(err) return ReE(res, "err finding company");

    if(!company) return ReE(res, "Company not found with id: "+company_id);
    let user, users_array, users;
    user = req.user;
    [err, users] = await to(company.getUsers());

    users_array = users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.company = company;
    next();
}
module.exports.company = company;