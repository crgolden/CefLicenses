namespace CefLicenses.FunctionalTests
{
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class HomeFunctionalTests : BaseFunctionalTest
    {
        [ClassInitialize]
        public static void Initialize(TestContext testContext)
        {
            TestContext = testContext;
        }

        [TestMethod]
        public void HomeTitle()
        {
            const string pageTitle = "CEF Licenses";
            Driver.Navigate().GoToUrl(RootUrl);
            Assert.AreEqual(pageTitle, Driver.Title, $"Expected title to be '{pageTitle}'");
        }
    }
}
