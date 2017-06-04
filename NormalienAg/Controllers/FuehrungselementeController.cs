using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NormalienAg.Controllers
{
    public class FuehrungselementeController : Controller
    {
        // GET: Fuehrungselemente
        public ActionResult Index()
        {
            return View("Fuehrungselemente");
        }

        public ActionResult Fuehrungselemente()
        {
            return View();
        }

        public ActionResult Spezialanfertigungen()
        {
            return View();
        }

        public ActionResult Preislisten()
        {
            return View();
        }
    }
}