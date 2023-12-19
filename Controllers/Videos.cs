﻿using ContectCreators.data_access;
using ContectCreators.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContectCreators.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class Videos : ControllerBase {
        private readonly ContentCreatorDbContext _context;

        public Videos(ContentCreatorDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Video>>> GetCreators() {
            return await _context.Videos.ToListAsync();
        }
        //GET api/Video/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Video>> GetVideo(int id) {
            var creator = await _context.Videos.FindAsync(id);

            if (creator == null) {
                return NotFound();
            }

            return creator;
        }

        //POST: api/Video
        [HttpPost]
        public async Task<ActionResult<Video>> PostVideo(Video video) {
            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVideo", new { id = video.Id }, video);
        }

        // PUT: api/Video/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideo(int id, Video video) {
            if (id != video.Id) {
                return BadRequest();
            }

            _context.Entry(video).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!VideoExists(id)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }

            return NoContent(); //204 No Content
        }


        // DELETE: api/Video/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id) {
            var video = await _context.Videos.FindAsync(id);
            if (video == null) {
                return NotFound();
            }

            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VideoExists(int id) {
            return _context.Videos.Any(e => e.Id == id);
        }
    }
}
