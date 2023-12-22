using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_ADMIN_POINS.Models;

namespace WEB_ADMIN_POINS.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            Session["Web_Link"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Link"].ToString();
            return View();
        }

        public JsonResult MakeSession(ClsUser param)
        {
            Session["Web_Link"] = System.Configuration.ConfigurationManager.AppSettings["WebApp_Link"].ToString();
            Session["Report_URL"] = System.Configuration.ConfigurationManager.AppSettings["Report_Link"].ToString();
            Session["nrp"] = param.NRP;
            Session["name"] = param.NAMA;
            Session["distrik"] = param.DISTRICT;

            return Json(JsonRequestBehavior.AllowGet);
        }

        public ActionResult LogOut()
        {
            Session.RemoveAll();
            return RedirectToAction("Index", "Login");
        }
    }
}