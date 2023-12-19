using System.Security.Claims;
using ContectCreators.Models.DTO;

namespace ContectCreators.Repositories.Abstract {
    public interface ITokenService {

        public TokenResponse GetToken(IEnumerable<Claim> claim);

        string GetRefreshToken();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
