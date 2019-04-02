using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MobileFirst.Sample.Helpers
{
  public class LoadScripts
  {
    public static string LoadAllScriptsInFolder(string folder)
    {
      var path = HttpContext.Current.Server.MapPath(folder);
      //use single instead of first. This will throw an exception if there are multiple files that match. This will help find issues related to wrong file being included
      var files = Directory.GetFiles(path, "*.js");

      string ret = string.Empty;

      foreach(var file in files.OrderByDescending(f=>f))
      {
        ret += $"<script type='text/javascript' src='{file.Replace(HttpContext.Current.Request.PhysicalApplicationPath, String.Empty).Replace("\\", "/")}'></script>";
      }

      return ret;
    }

  }
}
