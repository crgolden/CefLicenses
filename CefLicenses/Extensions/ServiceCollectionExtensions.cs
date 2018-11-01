namespace CefLicenses.Extensions
{
    using System;
    using System.Runtime.InteropServices;
    using System.Text;
    using Controllers;
    using Data;
    using Models;
    using Options;
    using Relationships;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using System.Data.SqlClient;

    public static class ServiceCollectionExtensions
    {
        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows) || RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                var sqlServerOptionsSection = configuration.GetSection(nameof(SqlServerOptions));
                if (!sqlServerOptionsSection.Exists())
                {
                    return;
                }

                services.AddDbContext<ApplicationDbContext>(options =>
                {
                    var sqlServerOptions = sqlServerOptionsSection.Get<SqlServerOptions>();
                    var builder = new SqlConnectionStringBuilder
                    {
                        ConnectTimeout = sqlServerOptions.ConnectTimeout,
                        DataSource = sqlServerOptions.DataSource,
                        Encrypt = sqlServerOptions.Encrypt,
                        InitialCatalog = sqlServerOptions.InitialCatalog,
                        IntegratedSecurity = sqlServerOptions.IntegratedSecurity,
                        MultipleActiveResultSets = sqlServerOptions.MultipleActiveResultSets,
                        PersistSecurityInfo = sqlServerOptions.PersistSecurityInfo,
                        TrustServerCertificate = sqlServerOptions.TrustServerCertificate,
                    };
                    if (!builder.IntegratedSecurity)
                    {
                        builder.Password = sqlServerOptions.Password;
                        builder.UserID = sqlServerOptions.UserId;
                    }

                    options.UseSqlServer(builder.ConnectionString);
                });
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                var sqLiteOptionsSection = configuration.GetSection(nameof(SqLiteOptions));
                if (!sqLiteOptionsSection.Exists())
                {
                    return;
                }

                services.AddDbContext<ApplicationDbContext>(options =>
                {
                    var sqLiteOptions = sqLiteOptionsSection.Get<SqLiteOptions>();
                    var connectionString = $"Data Source={sqLiteOptions.Path}/{sqLiteOptions.Name}.db";
                    options.UseSqlite(connectionString);
                });
            }
        }

        public static void AddUsersOptions(this IServiceCollection services, IConfiguration configuration)
        {
            var usersOptionsSection = configuration.GetSection(nameof(UsersOptions));
            if (!usersOptionsSection.Exists())
            {
                return;
            }

            services.Configure<UsersOptions>(options =>
            {
                var usersOptions = usersOptionsSection.Get<UsersOptions>();
                options.Users = usersOptions.Users;
            });
        }

        public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptionsSection = configuration.GetSection(nameof(JwtOptions));
            if (!jwtOptionsSection.Exists())
            {
                return;
            }

            var jwtOptions = jwtOptionsSection.Get<JwtOptions>();
            services
                .Configure<JwtOptions>(options =>
                {
                    options.Issuer = jwtOptions.Issuer;
                    options.Audience = jwtOptions.Audience;
                    options.SecretKey = jwtOptions.SecretKey;
                })
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Audience = jwtOptions.Audience;
                    options.ClaimsIssuer = jwtOptions.Issuer;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),
                        ValidateAudience = true,
                        ValidAudience = jwtOptions.Audience,
                        ValidateIssuer = true,
                        ValidIssuer = jwtOptions.Issuer,
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
    }
}
