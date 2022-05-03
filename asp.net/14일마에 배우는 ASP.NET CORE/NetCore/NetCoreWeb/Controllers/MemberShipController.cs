using Microsoft.AspNetCore.Mvc;
using NetCoreWeb.Models;

namespace NetCoreWeb.Controllers
{
    public class MemberShipController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public IActionResult Login(LoginInfo login)
        {
            string message = string.Empty;
            if (ModelState.IsValid)
            {
                string userId = "aaaaaa";
                string password = "123456";
                if(login.UserId.Equals(userId) && login.Password.Equals(password)){
                    TempData["Message"] = "로그인이 성공적으로 이루어졌습니다.";
                    return RedirectToAction("Index", "Membership");
                }
                else
                {
                    message = "로그인되지 않았습니다.";
                }
            }
            else
            {
                message = "로그인정보를 올바르게 입력하세요";
            }
            ModelState.AddModelError(string.Empty, message);
            return View(login);
        }
    }
}
