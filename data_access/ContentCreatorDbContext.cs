using ContectCreators.Models;
using ContectCreators.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ContectCreators.data_access {
    public class ContentCreatorDbContext : IdentityDbContext<ApplicationUser> {

        public ContentCreatorDbContext(DbContextOptions<ContentCreatorDbContext> options) : base(options) { }

        public DbSet<ContentCreator> ContentCreators { get; set; }

        public DbSet<Video> Videos { get; set; }

        public DbSet<User> User { get; set; }
        public DbSet<TokenInfo> TokenInfo { get; set; }

    }
}
