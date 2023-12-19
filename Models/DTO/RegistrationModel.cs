using System.ComponentModel.DataAnnotations;

namespace ContectCreators.Models.DTO {
    public class RegistrationModel {

        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
