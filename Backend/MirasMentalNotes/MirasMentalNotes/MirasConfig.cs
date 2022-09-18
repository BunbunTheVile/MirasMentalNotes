using System.Text.Json;

namespace MirasMentalNotes
{
    public class MirasConfig
    {
        public string ConnectionString { get; set; } = "";

        public static MirasConfig? Load()
        {
            if (!File.Exists("config.json")) return null;

            var jsonText = File.ReadAllText("config.json");
            var config = JsonSerializer.Deserialize<MirasConfig>(jsonText);
            return config;
        }
    }
}
