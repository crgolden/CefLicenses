namespace CefLicenses.FunctionalTests
{
    using System;
    using System.IO;
    using System.Reflection;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using OpenQA.Selenium.Chrome;
    using OpenQA.Selenium.Remote;

    public class BaseFunctionalTest
    {
        protected static TestContext TestContext;
        protected RemoteWebDriver Driver;
        protected string RootUrl;

        [TestInitialize]
        public void Setup()
        {
            RootUrl = $"{TestContext.Properties["webAppUrl"]}";
            Driver = GetChromeDriver();
        }

        [TestCleanup]
        public void TearDown()
        {
            Driver.Quit();
        }

        private static ChromeDriver GetChromeDriver()
        {
            // https://docs.microsoft.com/en-us/azure/devops/pipelines/test/continuous-test-selenium

            var remotePath = Environment.GetEnvironmentVariable("ChromeWebDriver");
            var localPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var options = new ChromeOptions();
            options.AddArguments("--no-sandbox");
            return !string.IsNullOrWhiteSpace(remotePath)
                ? new ChromeDriver(remotePath, options, TimeSpan.FromSeconds(300))
                : new ChromeDriver(localPath, options);
        }
    }
}
