using System.ComponentModel.DataAnnotations;

namespace ContectCreators.Models {
    public class Video {

        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(15, ErrorMessage = "Please do not enter values over 15 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(50, ErrorMessage = "Please do not enter values over 50 characters")]
        public string Description { get; set; }

        public int ContentCreatorId { get; set; }

    }
}
