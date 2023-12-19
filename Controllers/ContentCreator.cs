using ContectCreators.data_access;
using ContectCreators.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContectCreators.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class ContectCreators : ControllerBase {
        private readonly ContentCreatorDbContext _context;

        public ContectCreators(ContentCreatorDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentCreator>>> GetCreators() {
            return await _context.ContentCreators.ToListAsync();
        }

        // GET: api/ContentCreator/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ContentCreator>> GetContentCreator(int id) {
            var creator = await _context.ContentCreators.FindAsync(id);

            if (creator == null) {
                return NotFound();
            }

            return creator;
        }
        // POST: api/ContentCreator
        [HttpPost]
        public async Task<ActionResult<ContentCreator>> PostContentCreator(ContentCreator contentCreator) {
            _context.ContentCreators.Add(contentCreator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContentCreator", new { id = contentCreator.Id }, contentCreator);
        }

        // PUT: api/ContentCreator/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContentCreator(int id, ContentCreator contentCreator) {
            if (id != contentCreator.Id) {
                return BadRequest();
            }

            _context.Entry(contentCreator).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ContentCreatorExists(id)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent(); //204 No Content
        }

        // DELETE: api/ContentCreator/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContentCreator(int id) {
            var contentCreator = await _context.ContentCreators.FindAsync(id);
            if (contentCreator == null) {
                return NotFound();
            }

            _context.ContentCreators.Remove(contentCreator);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost]
        private bool ContentCreatorExists(int id) {
            return _context.ContentCreators.Any(e => e.Id == id);
        }
    }
}
