using System.Text.Json;

namespace MirasMentalNotes
{
    public static class NoteHelper
    {
        /// <summary>
        /// Exports all notes in the database to the export folder specified in the config.json file.
        /// A subfolder with the current date and time will be created for the export.
        /// </summary>
        public static void ExportNotes(MirasDbContext context)
        {
            var notes = context.Notes.ToList();
            var exportDirectory = GetExportSubdirectoryPath();

            if (!Directory.Exists(exportDirectory))
                Directory.CreateDirectory(exportDirectory);

            foreach (var note in notes)
            {
                WriteNoteToFile(exportDirectory, note);            
            }
        }

        private static void WriteNoteToFile(string exportDirectory, Note note)
        {
            var options = new JsonSerializerOptions{ WriteIndented = true };
            var jsonText = JsonSerializer.Serialize(note, options);

            var fileName = GetNoteFileName(note);
            var notePath = Path.Combine(exportDirectory, fileName);
            File.WriteAllText(notePath, jsonText);
        }

        private static string GetExportSubdirectoryPath()
        {
            var now = DateTime.Now;
            var config = MirasConfig.Load();

            if (config is null)
                throw new NullReferenceException("Config is null!");

            var exportPath = 
                $"{config.ExportDirectory}/{now.Year:D4}{now.Month:D2}{now.Day:D2}-{now.Hour:D2}{now.Minute:D2}{now.Second:D2}{now.Millisecond:D4}";

            return exportPath;
        }

        private static string GetNoteFileName(Note note)
        {
            if (note.Name is null)
                throw new NullReferenceException("note.Name was null!");

            return $"{note.Name}{"{" + note.Id + "}"}.json";
        }
    }
}
