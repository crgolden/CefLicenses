[![Build status](https://crgolden.visualstudio.com/CefLicensing/_apis/build/status/CefLicensing%20-%20CI)](https://crgolden.visualstudio.com/CefLicensing/_build/latest?definitionId=3)

**Notes:**
* All `dotnet` commands are run from the applicable project (`*.csproj`) directory
* All `npm` and `ng` commands are run from the `CefLicenses/ClientApp` directory

# Setup

### Prerequisites
1. Install [.NET Core 2.1 SDK](https://www.microsoft.com/net/download/dotnet-core/2.1)
2. Install [Node.js](https://nodejs.org/)
3. Install [Docker](https://www.docker.com/get-started) (Optional)
4. (Mac OS) Install [SQLite](https://www.sqlite.org/) and [SQLite Studio](https://sqlitestudio.pl/) (Optional)
5. (Linux) Install [SQL Server 2017](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup)
6. (Windows) Install [SQL Server 2016 Express LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-2016-express-localdb) and [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) (Optional)
7. Create a new database
8. Clone this repository

### Environment
9. Setup your local [Configuration](https://crgolden.visualstudio.com/CefLicensing/_git/Configuration?_a=readme)
10. (Mac OS, Linux) Add the following lines to your `~/.bash_profile`:
    * `export ASPNETCORE_ENVIRONMENT=Development`
    * `export FONT_AWESOME_TOKEN=`{Clarity's Font Awesome token}
11. (Windows) Add the following environment variables:
    * `ASPNETCORE_ENVIRONMENT` with value `Development`
    * `FONT_AWESOME_TOKEN` with value {Clarity's Font Awesome token}
12. (Mac OS, Linux) `source ~/.bash_profile`
13. (Windows) Restart the computer
14. (Windows) Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe) and `cd` to its download location
15. `nuget sources add -name "telerik.com" -source "https://nuget.telerik.com/nuget" -username `{Clarity's Telerik username}` -password `{Clarity's Telerik password}
16. `dotnet dev-certs https --trust`
17. `dotnet restore`
18. `dotnet ef database update`
19. `npm install`

# Run

20. `ng serve` (Angular Live Development Server)
21. `dotnet run` (Kestrel Web Server)

#  Test

22. `ng test`
23. `ng e2e`

### Within the "CefLicenses.UnitTests" directory
24. `dotnet test`

### Within the "CefLicenses.FunctionalTests" directory
25. `dotnet test --settings functionalTests.runsettings`

# Lint

26. `ng lint`
