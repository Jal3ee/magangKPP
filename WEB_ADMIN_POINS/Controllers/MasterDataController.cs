using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEB_ADMIN_POINS.Controllers
{
    public class MasterDataController : Controller
    {
        // GET: MasterData
        public ActionResult Barge()
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
        public ActionResult TugBoat()
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