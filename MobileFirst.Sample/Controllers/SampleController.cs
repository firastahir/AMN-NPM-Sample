using Glass.Mapper.Sc.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MobileFirst.Sample.Controllers
{
    public class SampleController : GlassController
    {
        public ActionResult Sample() => View();
    }
}
