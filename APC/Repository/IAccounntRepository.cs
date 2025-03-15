using APC.Models;
using Microsoft.AspNetCore.Identity;

namespace APC.Repository
{
    public interface IAccounntRepository
    {
        Task<IdentityResult> SignUpAsync(SignUpModel signUpModel);
        Task<string> LoginAsync(SignInModel signInModel);
    }
}
