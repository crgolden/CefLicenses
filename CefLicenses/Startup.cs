namespace CefLicenses
{
    using Data;
    using Extensions;
    using Filters;
    using Interfaces;
    using Models;
    using Options;
    using Relationships;
    using Services;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SpaServices.AngularCli;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDatabase(_configuration);
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddScoped<DbContext, ApplicationDbContext>();
            services.AddScoped<IModelService<Client>, ClientService>();
            services.AddScoped<IModelService<Feature>, FeatureService>();
            services.AddScoped<IRelationshipService<ClientFeature, Client, Feature>, ClientFeatureService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddAuthentication(_configuration.GetSection(nameof(JwtOptions)));
            services.AddPolicies();
            services.AddMvc(setup => setup.Filters.Add(typeof(ModelStateFilter)))
                .AddJsonOptions(setup =>
                {
                    setup.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
                    setup.SerializerSettings.ContractResolver = new DefaultContractResolver();
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = "ClientApp/dist");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
            ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseMvcWithDefaultRoute();
            app.UseSpa(configuration =>
            {
                configuration.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    configuration.UseAngularCliServer(npmScript: "start");
                }
            });
            app.SetupDatabase(_configuration, context, userManager, roleManager);
            loggerFactory.AddAzureWebAppDiagnostics();
        }
    }
}
