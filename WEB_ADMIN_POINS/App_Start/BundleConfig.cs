using System.Web;
using System.Web.Optimization;

namespace WEB_ADMIN_POINS
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //Added new file
            bundles.Add(new ScriptBundle("~/bundles/Kendo").Include(
                      "~/Scripts/Kendo/kendo.all.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/js/adminlte").Include(
                      "~/Content/plugins/bootstrap/js/bootstrap.bundle.min.js",
                      "~/Content/plugins/bs-custom-file-input/bs-custom-file-input.min.js",
                      "~/Content/dist/js/adminlte.min.js"));

            bundles.Add(new StyleBundle("~/Content/css/adminlte").Include(
                      //"~/Content/plugins/fontawesome-free/css/all.min.css",
                      "~/Content/fontawesome/css/all.css",
                      "~/Content/dist/css/adminlte.css",
                      "~/Content/style.css"));

            bundles.Add(new StyleBundle("~/Content/Kendo/css").Include(
                "~/Content/Kendo/kendo.common.min.css",
                "~/Content/Kendo/kendo.dataviz.min.css",
                "~/Content/Kendo/kendo.default.min.css",
                "~/Content/Kendo/kendo.dataviz.default.min.css"
                ));
        }
    }
}
