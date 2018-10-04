namespace CefClientFeatures.Extensions
{
    using System;
    using System.Text;
    using Controllers;
    using Filters;
    using Models;
    using Options;
    using Relationships;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Swashbuckle.AspNetCore.Swagger;

    public static class ServiceCollectionExtensions
    {
        public static void AddAuthentication(this IServiceCollection services, IConfigurationSection jwtOptions)
        {
            var secretKey = jwtOptions[nameof(JwtOptions.SecretKey)];
            var issuer = jwtOptions[nameof(JwtOptions.Issuer)];
            var audience = jwtOptions[nameof(JwtOptions.Audience)];

            services
                .Configure<JwtOptions>(options =>
                {
                    options.Issuer = issuer;
                    options.Audience = audience;
                    options.SecretKey = secretKey;
                })
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Audience = audience;
                    options.ClaimsIssuer = issuer;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                        ValidateAudience = true,
                        ValidAudience = audience,
                        ValidateIssuer = true,
                        ValidIssuer = issuer,
                        RequireExpirationTime = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                    options.SaveToken = true;
                });
        }

        public static void AddPolicies(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ClientIndex", policy =>
                {
                    policy.RequireClaim(nameof(ClientsController.Index), nameof(Client));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("FeatureIndex", policy =>
                {
                    policy.RequireClaim(nameof(FeaturesController.Index), nameof(Feature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientFeatureIndex", policy =>
                {
                    policy.RequireClaim(nameof(ClientFeaturesController.Index), nameof(ClientFeature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientDetails", policy =>
                {
                    policy.RequireClaim(nameof(ClientsController.Details), nameof(Client));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("FeatureDetails", policy =>
                {
                    policy.RequireClaim(nameof(FeaturesController.Details), nameof(Feature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientFeatureDetails", policy =>
                {
                    policy.RequireClaim(nameof(ClientFeaturesController.Details), nameof(ClientFeature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientEdit", policy =>
                {
                    policy.RequireClaim(nameof(ClientsController.Edit), nameof(Client));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("FeatureEdit", policy =>
                {
                    policy.RequireClaim(nameof(FeaturesController.Edit), nameof(Feature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientFeatureEdit", policy =>
                {
                    policy.RequireClaim(nameof(ClientFeaturesController.Edit), nameof(ClientFeature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientCreate", policy =>
                {
                    policy.RequireClaim(nameof(ClientsController.Create), nameof(Client));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("FeatureCreate", policy =>
                {
                    policy.RequireClaim(nameof(FeaturesController.Create), nameof(Feature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientFeatureCreate", policy =>
                {
                    policy.RequireClaim(nameof(ClientFeaturesController.Create), nameof(ClientFeature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientDelete", policy =>
                {
                    policy.RequireClaim(nameof(ClientsController.Delete), nameof(Client));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("FeatureDelete", policy =>
                {
                    policy.RequireClaim(nameof(FeaturesController.Delete), nameof(Feature));
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("ClientFeatureDelete", policy =>
                {
                    policy.RequireClaim(nameof(ClientFeaturesController.Delete), nameof(ClientFeature));
                    policy.RequireRole("Admin");
                });
            });
        }

        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(setup =>
            {
                setup.SwaggerDoc("v1", new Info { Title = "CefClientFeatures", Version = "v1" });
                setup.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Type = "apiKey",
                    In = "Header",
                    Name = "Authorization",
                    Description = "Input \"Bearer {token}\" (without quotes)"
                });
                setup.OperationFilter<SecurityRequirementsOperationFilter>();
            });
        }
    }
}
