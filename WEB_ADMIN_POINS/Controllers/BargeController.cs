using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_ADMIN_POINS.Controllers
{
    public class BargeController : Controller
    {
        // GET: Barge
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
    }
}