using APC.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace APC.Data
{
    public class APCContext : IdentityDbContext<User>
    {
        public APCContext(DbContextOptions<APCContext> options)
        : base(options)
        {
        }
    }
}
