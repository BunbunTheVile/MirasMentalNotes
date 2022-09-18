namespace MirasMentalNotes
{
    public class EmptyNote
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<string> Tags { get; set; } = new();
    }
}
