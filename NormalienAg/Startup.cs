using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NormalienAg.Startup))]
namespace NormalienAg
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
