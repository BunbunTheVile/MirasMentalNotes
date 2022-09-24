using System.Text.Json;

namespace MirasMentalNotes
{
    public class MirasConfig
    {
        public string ConnectionString { get; set; } = "";
        public string ImportDirectory { get; set; } = "import";
        public string ExportDirectory { get; set; } = "export";

        public static MirasConfig? Load()
        {
            if (!File.Exists("config.json")) return null;

            var jsonText = File.ReadAllText("config.json");
            var config = JsonSerializer.Deserialize<MirasConfig>(jsonText);
            return config;
        }
    }
}
