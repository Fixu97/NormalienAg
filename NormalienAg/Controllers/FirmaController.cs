using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NormalienAg.Controllers
{
    public class FirmaController : Controller
    {
        // GET: Firma
        public ActionResult Index()
        {
            return View("Kontakt");
        }
        public ActionResult Geschichte()
        {
            return View();
        }
        public ActionResult Kontakt()
        {
            return View();
        }
        public ActionResult Team()
        {
            return View();
        }
    }
}