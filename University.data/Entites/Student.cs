namespace University.data.Entites
{
    public class Student
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public DateTime CreatedTime { get; internal set; }
        public DateTime LastUpdatedTime { get; internal set; }

    }
}
