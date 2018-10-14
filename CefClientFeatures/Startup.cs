namespace CefClientFeatures
{
    using System.Threading.Tasks;
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
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                options.UseSqlServer(connectionString);
            });
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
            services.AddSwagger();
            services.AddKendo();
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
            app.UseSwagger();
            app.UseSwaggerUI(setup =>
            {
                setup.SwaggerEndpoint("/swagger/v1/swagger.json", "CefClientFeatures");
                setup.DocumentTitle = "API Documentation";
                setup.DocExpansion(DocExpansion.None);
            });
            loggerFactory.AddAzureWebAppDiagnostics();
            context.Database.Migrate();
            var seed = new Seed(context, userManager, roleManager);
            var adminEmail = _configuration.GetSection("AdminEmail").Value;
            var adminPassword = _configuration.GetSection("AdminPassword").Value;
            Task.Run(() => seed.SeedData(adminEmail, adminPassword)).Wait();
        }
    }
}
