using APC.Models;
using APC.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccounntRepository _accounntRepository;

        public AccountController(IAccounntRepository accounntRepository) 
        {
            _accounntRepository = accounntRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody]SignUpModel signUpModel)
        {

            var result = await _accounntRepository.SignUpAsync(signUpModel);

            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }

            return Unauthorized();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInModel signInModel)
        {

            var result = await _accounntRepository.LoginAsync(signInModel);

            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }

            var ObjectList = new Dictionary<string, string>();
            ObjectList.Add("token", result);
            return Ok(ObjectList);
        }
    }
}
