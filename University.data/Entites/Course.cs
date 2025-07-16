using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace University.data.Entites
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Credit { get; set; }

        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdatedTime { get; set; }
    }
}
