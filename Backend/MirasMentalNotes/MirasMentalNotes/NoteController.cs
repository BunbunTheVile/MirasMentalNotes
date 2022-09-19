using Microsoft.AspNetCore.Mvc;

namespace MirasMentalNotes
{
    [ApiController]
    [Route("note")]
    public class NoteController : ControllerBase
    {
        private MirasDbContext context;

        public NoteController(MirasDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public ActionResult<Note> Create(Note note)
        {
            context.Add(note);
            context.SaveChanges();

            var newNote = context.Notes.ToList().Last();

            return Created($"note/{newNote.Id}", newNote);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Note> Get(int id)
        {
            var entity = context.Notes.Find(id);

            return entity is null
                ? NotFound()
                : entity;
        }

        [HttpGet]
        public ActionResult<List<Note>> GetAll()
        {
            return context.Notes.ToList();
        }

        [HttpGet]
        [Route("empty")]
        public ActionResult<List<Note>> GetAllWithoutContent()
        {
            return context.Notes.Select(note => new Note { Id = note.Id, Name = note.Name, Tags = note.Tags }).ToList();
        }

        [HttpPut]
        public ActionResult<Note> Update(Note note)
        {
            context.Update(note);
            context.SaveChanges();

            return Get(note.Id);
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(int id)
        {
            var note = context.Notes.Find(id);

            if (note is null) return NotFound();

            context.Remove(note);
            context.SaveChanges();

            return Ok();
        }
    }
}
