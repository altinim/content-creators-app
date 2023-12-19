using System.ComponentModel.DataAnnotations;

namespace ContectCreators.Models {
    public class ContentCreator {
        public int Id { get; set; }

        [Required(ErrorMessage = "Age for Content Creator is required")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Subscriber count for Content Creator is required")]
        public int SubscribersCount { get; set; }

        public DateTime JoinedDate { get; }

        public List<Video> Videos { get; set; }
    }
}
