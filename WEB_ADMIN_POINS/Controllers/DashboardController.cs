using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_ADMIN_POINS.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            if (Session["nrp"] == null)
            {
                return RedirectToAction("Index", "Login");

            }
            else
            {
                return View();

            }
        }

        public ActionResult Dashboard()
        {
            if(Session["nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                return View();
            }
        }

        public ActionResult DashboardOperator()
        {
            if(Session["nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                return View();
            }
        }
    }
}